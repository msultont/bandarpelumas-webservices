import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import CartSidebar from "./components/CartSidebar";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Marketplace from "./pages/Marketplace";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="app">
          <Header />
          <CartSidebar />
          <Routes>
            <Route path={`${import.meta.env.BASE_URL}`} element={<Home />} />
            <Route
              path={`${import.meta.env.BASE_URL}about`}
              element={<About />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}marketplace`}
              element={<Marketplace />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}contact`}
              element={<Contact />}
            />
          </Routes>
          <Footer />
          <ScrollToTop />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
