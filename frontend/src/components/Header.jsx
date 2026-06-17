import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <nav className={`nav nav-left ${isOpen ? "open" : ""}`}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <a href="/#services">Services</a>
          </nav>

          <div className="logo">
            <Link to="/">
              <h2>Car Service</h2>
            </Link>
          </div>

          <nav className={`nav nav-right ${isOpen ? "open" : ""}`}>
            <a href="/#testimonials">Testimonials</a>
            <a href="/#blog">Blog</a>
            <a href="/#contact">Contact</a>
          </nav>

          <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
