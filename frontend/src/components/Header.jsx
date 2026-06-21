import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const services = [
	{ label: "Penjualan Pelumas", href: "/spareparts" },
	{ label: "Sparepart", href: "/spareparts" },
	{ label: "Coating & Detailing", href: "/spareparts" },
	{ label: "Servis Berkala", href: "/spareparts" },
	{ label: "Body Repair", href: "/spareparts" },
	{ label: "Paket Servis", href: "/spareparts" },
];

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const [servicesOpen, setServicesOpen] = useState(false);
	const servicesRef = useRef(null);

	const handleNavClick = () => {
		setIsOpen(false);
		setServicesOpen(false);
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (
				servicesRef.current &&
				!servicesRef.current.contains(e.target)
			) {
				setServicesOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<header className="header">
			<div className="container">
				<div className="header-content">
					<nav className={`nav nav-left ${isOpen ? "open" : ""}`}>
						<Link to="/" onClick={handleNavClick}>
							Beranda
						</Link>
						<Link to="/about" onClick={handleNavClick}>
							Tentang Kami
						</Link>
						<div
							className={`services-dropdown ${servicesOpen ? "open" : ""}`}
							ref={servicesRef}
						>
							<button
								className="services-trigger"
								onClick={() => setServicesOpen((prev) => !prev)}
								aria-expanded={servicesOpen}
							>
								Jasa Servis
								<span className="chevron">▾</span>
							</button>
							<div className="services-drawer">
								{services.map((s) => (
									<a
										key={s.label}
										href={s.href}
										className="drawer-item"
										onClick={handleNavClick}
									>
										{s.label}
									</a>
								))}
							</div>
						</div>
					</nav>

					<div className="logo">
						<Link to="/">
							<img
								src="/logo.png"
								alt="Bandar Pelumas Logo"
								className="logo-img"
							/>
							<span className="logo-text">Bandar Pelumas</span>
						</Link>
					</div>

					<nav className={`nav nav-right ${isOpen ? "open" : ""}`}>
						<a href="/#testimonials" onClick={handleNavClick}>
							Testimonials
						</a>
						<a href="/#blog" onClick={handleNavClick}>
							Jurnal Bengkel
						</a>
						<a href="/#contact" onClick={handleNavClick}>
							Kontak Kami
						</a>
					</nav>

					<button
						className="menu-toggle"
						onClick={() => setIsOpen(!isOpen)}
					>
						{isOpen ? "✕" : "☰"}
					</button>
				</div>

				{/* Unified Mobile Drawer */}
				<div className={`mobile-nav ${isOpen ? "open" : ""}`}>
					<Link to="/" onClick={handleNavClick}>
						Beranda
					</Link>
					<Link to="/about" onClick={handleNavClick}>
						Tentang Kami
					</Link>
					<div
						className={`services-dropdown mobile ${servicesOpen ? "open" : ""}`}
					>
						<button
							className="services-trigger"
							onClick={() => setServicesOpen((prev) => !prev)}
							aria-expanded={servicesOpen}
						>
							Jasa Servis
							<span className="chevron">▾</span>
						</button>
						<div className="services-drawer">
							{services.map((s) => (
								<a
									key={s.label}
									href={s.href}
									className="drawer-item"
									onClick={handleNavClick}
								>
									{s.label}
								</a>
							))}
						</div>
					</div>
					<a href="/#testimonials" onClick={handleNavClick}>
						Testimonials
					</a>
					<a href="/#blog" onClick={handleNavClick}>
						Jurnal Bengkel
					</a>
					<a href="/#contact" onClick={handleNavClick}>
						Kontak Kami
					</a>
				</div>
			</div>
		</header>
	);
}
