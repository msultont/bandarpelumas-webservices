import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Car Service</h3>
            <p>
              Your one-stop destination for complete car maintenance and repair
              services.
            </p>
            <div className="social-links">
              <a href="#" title="Facebook">
                f
              </a>
              <a href="#" title="Instagram">
                📷
              </a>
              <a href="#" title="TikTok">
                🎵
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Useful Links</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <a href="/#services">Services</a>
              </li>
              <li>
                <a href="/#testimonials">Testimonials</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Our Services</h4>
            <ul>
              <li>
                <a href="/#services">Body Repair</a>
              </li>
              <li>
                <a href="/#services">Engine Service</a>
              </li>
              <li>
                <a href="/#services">AC Service</a>
              </li>
              <li>
                <a href="/#services">Detailing</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>📞 +62 895 9595 9595 954</p>
            <p>📧 info@carservice.com</p>
            <p>🕒 Mon - Fri: 8:00 AM - 6:00 PM</p>
            <p>🕐 Sat: 8:00 AM - 4:00 PM</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Car Service. All Rights Reserved.</p>
          <div className="footer-links">
            <a href="#terms">Terms of Service</a>
            <a href="#privacy">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
