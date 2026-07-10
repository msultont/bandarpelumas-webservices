import { useCart } from "../context/CartContext";

const fmt = (n) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(n);

const categoryEmoji = (cat) =>
  cat === "pelumas"
    ? "🛢️"
    : cat === "filter"
      ? "🔩"
      : cat === "aki"
        ? "🔋"
        : "⚙️";

export default function CartSidebar() {
  const {
    items,
    totalCount,
    totalPrice,
    isOpen,
    setIsOpen,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="cart-backdrop"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        className={`cart-sidebar ${isOpen ? "open" : ""}`}
        aria-label="Keranjang Belanja"
      >
        <div className="cart-header">
          <h2 className="cart-title">Keranjang ({totalCount})</h2>
          <button
            className="cart-close"
            onClick={() => setIsOpen(false)}
            aria-label="Tutup keranjang"
          >
            ✕
          </button>
        </div>

        <div className="cart-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <span className="cart-empty-icon">🛒</span>
              <p>Keranjang kamu kosong</p>
              <button
                className="sp-btn-outline"
                onClick={() => setIsOpen(false)}
              >
                Mulai Belanja
              </button>
            </div>
          ) : (
            <ul className="cart-items">
              {items.map((item) => (
                <li key={item.productId} className="cart-item">
                  <div className="cart-item-img">
                    <span>{categoryEmoji(item.category)}</span>
                  </div>
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-price">{fmt(item.price)}</p>
                    <div className="cart-qty-row">
                      <button
                        className="cart-qty-btn"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        aria-label="Kurangi"
                      >
                        −
                      </button>
                      <span className="cart-qty">{item.quantity}</span>
                      <button
                        className="cart-qty-btn"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        aria-label="Tambah"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="cart-item-remove"
                    onClick={() => removeItem(item.productId)}
                    aria-label="Hapus item"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <span>Total</span>
              <span className="cart-total-price">{fmt(totalPrice)}</span>
            </div>
            <button className="cart-checkout-btn">Checkout</button>
            <button className="cart-clear-btn" onClick={clearCart}>
              Kosongkan Keranjang
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
