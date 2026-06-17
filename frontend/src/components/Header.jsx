import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">
              <h2>Car Service</h2>
            </Link>
          </div>

          <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>

          <nav className={`nav ${isOpen ? "open" : ""}`}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <a href="/#services">Services</a>
            <a href="/#testimonials">Testimonials</a>
            <a href="/#blog">Blog</a>
            <a href="/#contact">Contact</a>
          </nav>
        </div>
      </div>
    </header>
  );
}
