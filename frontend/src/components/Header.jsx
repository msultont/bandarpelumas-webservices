import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const services = [
	{ label: "Penjualan Pelumas", href: "pelumas" },
	{ label: "Penjualan Sparepart", href: "spareparts" },
	{ label: "Coating & Detailing", href: "coatingdetailing" },
	{ label: "Servis Berkala", href: "servis-berkala" },
	{ label: "Body Repair", href: "body-repair" },
	{ label: "Paket Servis", href: "paket-servis" },
];

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const [servicesOpen, setServicesOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
	const servicesRef = useRef(null);

	const handleNavClick = () => {
		setIsOpen(false);
		setServicesOpen(false);
	};

	// Track mobile viewport
	useEffect(() => {
		const handler = () => setIsMobile(window.innerWidth <= 768);
		window.addEventListener("resize", handler);
		return () => window.removeEventListener("resize", handler);
	}, []);

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
						<Link
							to={`${import.meta.env.BASE_URL}`}
							onClick={handleNavClick}
						>
							Beranda
						</Link>
						<Link
							to={`${import.meta.env.BASE_URL}about`}
							onClick={handleNavClick}
						>
							Tentang Kami
						</Link>
						<div
							className={`services-dropdown ${servicesOpen ? "open" : ""}`}
							ref={!isMobile ? servicesRef : null}
						>
							<button
								className="services-trigger"
								onClick={() => setServicesOpen((prev) => !prev)}
								aria-expanded={servicesOpen}
							>
								Servis
								<span className="chevron">▾</span>
							</button>
							<div className="services-drawer">
								{services.map((s) => (
									<Link
										key={s.label}
										to={`${import.meta.env.BASE_URL}${s.href}`}
										className="drawer-item"
										onClick={handleNavClick}
									>
										{s.label}
									</Link>
								))}
							</div>
						</div>
					</nav>

					<div className="logo">
						<Link to={`${import.meta.env.BASE_URL}`}>
							<img
								src={`${import.meta.env.BASE_URL}logo.png`}
								alt="Bandar Pelumas Logo"
								className="logo-img"
							/>
							{console.log(import.meta.env.BASE_URL)}
							<span className="logo-text">Bandar Pelumas</span>
						</Link>
					</div>

					<nav className={`nav nav-right ${isOpen ? "open" : ""}`}>
						<a
							href={`${import.meta.env.BASE_URL}#testimonials`}
							onClick={handleNavClick}
						>
							Testimonials
						</a>
						<a
							href={`${import.meta.env.BASE_URL}#blog`}
							onClick={handleNavClick}
						>
							Jurnal Bengkel
						</a>
						<Link
							to={`${import.meta.env.BASE_URL}contact`}
							onClick={handleNavClick}
						>
							Kontak
						</Link>
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
					<Link
						to={`${import.meta.env.BASE_URL}`}
						onClick={handleNavClick}
					>
						Beranda
					</Link>
					<Link
						to={`${import.meta.env.BASE_URL}about`}
						onClick={handleNavClick}
					>
						Tentang Kami
					</Link>
					<div
						className={`services-dropdown mobile ${servicesOpen ? "open" : ""}`}
						ref={isMobile ? servicesRef : null}
					>
						<button
							className="services-trigger"
							onClick={() => setServicesOpen((prev) => !prev)}
							aria-expanded={servicesOpen}
						>
							Servis
							<span className="chevron">▾</span>
						</button>
						<div className="services-drawer">
							{services.map((s) => (
								<Link
									key={s.label}
									to={`${import.meta.env.BASE_URL}${s.href}`}
									className="drawer-item"
									onClick={handleNavClick}
								>
									{s.label}
								</Link>
							))}
						</div>
					</div>
					<a
						href={`${import.meta.env.BASE_URL}#testimonials`}
						onClick={handleNavClick}
					>
						Testimonials
					</a>
					<a
						href={`${import.meta.env.BASE_URL}#blog`}
						onClick={handleNavClick}
					>
						Jurnal Bengkel
					</a>
					<Link
						to={`${import.meta.env.BASE_URL}contact`}
						onClick={handleNavClick}
					>
						Kontak
					</Link>
				</div>
			</div>
		</header>
	);
}
