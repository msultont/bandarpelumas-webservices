import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { v4 as uuidv4 } from "uuid";
import api from "../lib/api";

const SESSION_KEY = "bp_session_id";

function getSessionId() {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = uuidv4();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [sessionId] = useState(getSessionId);
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    try {
      const { data } = await api.get(`/cart/${sessionId}`);
      setItems(data.cart?.items ?? []);
    } catch {
      // silently fail — cart works offline
    }
  }, [sessionId]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addItem = useCallback(
    async (productId, quantity = 1) => {
      setLoading(true);
      try {
        const { data } = await api.post(`/cart/${sessionId}/items`, {
          productId,
          quantity,
        });
        setItems(data.cart.items);
        setIsOpen(true);
      } finally {
        setLoading(false);
      }
    },
    [sessionId],
  );

  const updateQuantity = useCallback(
    async (productId, quantity) => {
      if (quantity < 1) return removeItem(productId);
      try {
        const { data } = await api.put(
          `/cart/${sessionId}/items/${productId}`,
          { quantity },
        );
        setItems(data.cart.items);
      } catch {
        await fetchCart();
      }
    },
    [sessionId, fetchCart],
  );

  const removeItem = useCallback(
    async (productId) => {
      try {
        const { data } = await api.delete(
          `/cart/${sessionId}/items/${productId}`,
        );
        setItems(data.cart.items);
      } catch {
        await fetchCart();
      }
    },
    [sessionId, fetchCart],
  );

  const clearCart = useCallback(async () => {
    try {
      await api.delete(`/cart/${sessionId}`);
      setItems([]);
    } catch {
      await fetchCart();
    }
  }, [sessionId, fetchCart]);

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        totalPrice,
        isOpen,
        loading,
        setIsOpen,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
