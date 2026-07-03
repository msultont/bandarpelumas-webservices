import { Link } from "react-router-dom";

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="footer" id="contact">
			<div className="container">
				<div className="footer-content">
					<div className="footer-section">
						<h3>Car Service</h3>
						<p>
							Your one-stop destination for complete car
							maintenance and repair services.
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
								<Link to={`${import.meta.env.BASE_URL}`}>
									Home
								</Link>
							</li>
							<li>
								<Link to={`${import.meta.env.BASE_URL}about`}>
									About
								</Link>
							</li>
							<li>
								<a
									href={`${import.meta.env.BASE_URL}#services`}
								>
									Services
								</a>
							</li>
							<li>
								<a
									href={`${import.meta.env.BASE_URL}#testimonials`}
								>
									Testimonials
								</a>
							</li>
						</ul>
					</div>

					<div className="footer-section">
						<h4>Our Services</h4>
						<ul>
							<li>
								<a
									href={`${import.meta.env.BASE_URL}#services`}
								>
									Body Repair
								</a>
							</li>
							<li>
								<a
									href={`${import.meta.env.BASE_URL}#services`}
								>
									Engine Service
								</a>
							</li>
							<li>
								<a
									href={`${import.meta.env.BASE_URL}#services`}
								>
									AC Service
								</a>
							</li>
							<li>
								<a
									href={`${import.meta.env.BASE_URL}#services`}
								>
									Detailing
								</a>
							</li>
						</ul>
					</div>

					<div className="footer-section">
						<h4>Contact Us</h4>
						<p>
							📞{" "}
							<a
								href="https://wa.me/628111090770"
								target="_blank"
								rel="noopener noreferrer"
							>
								+62 811 1090 770
							</a>
						</p>
						<p>📧 bpsejahteraabadi@gmail.com</p>
						<p>🕒 Mon - Sun: 8:00 AM - 5:00 PM</p>
					</div>
				</div>

				<div className="footer-bottom">
					<p>&copy; {currentYear} BPSA. All Rights Reserved.</p>
					<div className="footer-links">
						<a href={`${import.meta.env.BASE_URL}#terms`}>
							Terms of Service
						</a>
						<a href={`${import.meta.env.BASE_URL}#privacy`}>
							Privacy Policy
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
