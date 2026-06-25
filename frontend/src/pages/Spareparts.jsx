import { useState } from "react";
import Blog from "../components/Blog";

/* ─── Data ─────────────────────────────────────────────── */

const features = [
	{
		icon: "🚚",
		title: "Pengiriman Gratis",
		desc: "Untuk pembelian di atas Rp 300.000",
	},
	{ icon: "🕐", title: "Support 24/7", desc: "Hubungi kami kapan saja" },
	{
		icon: "✅",
		title: "Suku Cadang Asli",
		desc: "100% original & bergaransi",
	},
	{ icon: "🏷️", title: "Harga Terbaik", desc: "Diskon hingga 40%" },
];

const products = [
	{
		id: 1,
		sku: "OLI-SW30-001",
		name: "Shell Helix Ultra 5W-30 1L",
		category: "pelumas",
		rating: 5,
		reviews: 24,
		price: 185000,
		originalPrice: 210000,
		badge: "Sale",
	},
	{
		id: 2,
		sku: "FLT-OLI-002",
		name: "Bosch Filter Oli Premium",
		category: "filter",
		rating: 4,
		reviews: 18,
		price: 65000,
		originalPrice: null,
		badge: "New",
	},
	{
		id: 3,
		sku: "SPK-IRD-003",
		name: "NGK Busi Iridium IX",
		category: "sparepart",
		rating: 5,
		reviews: 31,
		price: 125000,
		originalPrice: null,
		badge: null,
	},
	{
		id: 4,
		sku: "AKI-GSA-004",
		name: "GS Astra MF 55B24L",
		category: "aki",
		rating: 4,
		reviews: 9,
		price: 750000,
		originalPrice: 820000,
		badge: "Sale",
	},
	{
		id: 5,
		sku: "OLI-CTR-005",
		name: "Castrol GTX 20W-50 4L",
		category: "pelumas",
		rating: 4,
		reviews: 16,
		price: 195000,
		originalPrice: null,
		badge: null,
	},
	{
		id: 6,
		sku: "FLT-AIR-006",
		name: "Mann Filter Udara C 2999",
		category: "filter",
		rating: 5,
		reviews: 12,
		price: 85000,
		originalPrice: 95000,
		badge: "Sale",
	},
	{
		id: 7,
		sku: "SPR-TBK-007",
		name: "Gates Timing Belt Kit",
		category: "sparepart",
		rating: 5,
		reviews: 7,
		price: 285000,
		originalPrice: null,
		badge: "New",
	},
	{
		id: 8,
		sku: "AKI-YTZ-008",
		name: "Yuasa YTZ14-S Motorbike",
		category: "aki",
		rating: 4,
		reviews: 5,
		price: 480000,
		originalPrice: null,
		badge: null,
	},
	{
		id: 9,
		sku: "OLI-PRT-009",
		name: "Pertamina Fastron 10W-40",
		category: "pelumas",
		rating: 4,
		reviews: 41,
		price: 120000,
		originalPrice: null,
		badge: "Hot",
	},
	{
		id: 10,
		sku: "SPR-BPD-010",
		name: "Bendix Brake Pad DB1369",
		category: "sparepart",
		rating: 5,
		reviews: 19,
		price: 235000,
		originalPrice: 275000,
		badge: "Sale",
	},
	{
		id: 11,
		sku: "FLT-RAD-011",
		name: "Toyota Coolant Super Long Life",
		category: "filter",
		rating: 4,
		reviews: 8,
		price: 55000,
		originalPrice: null,
		badge: null,
	},
	{
		id: 12,
		sku: "AKI-GS-012",
		name: "GS Astra NS60LS",
		category: "aki",
		rating: 3,
		reviews: 6,
		price: 650000,
		originalPrice: null,
		badge: "New",
	},
];

const productTabs = [
	{ key: "all", label: "Semua" },
	{ key: "pelumas", label: "Pelumas" },
	{ key: "filter", label: "Filter" },
	{ key: "sparepart", label: "Sparepart" },
	{ key: "aki", label: "Aki" },
];

const categoryBlocks = [
	{
		id: 1,
		title: "Pelumas & Cairan",
		icon: "🛢️",
		subcategories: [
			"Oli Mesin",
			"Oli Transmisi",
			"Oli Rem",
			"Coolant",
			"Power Steering Fluid",
			"Oli Gardan",
		],
		featured: [products[0], products[4], products[8]],
	},
	{
		id: 2,
		title: "Filter & Tune-Up",
		icon: "🔩",
		subcategories: [
			"Filter Oli",
			"Filter Udara",
			"Filter Bensin",
			"Busi",
			"Timing Belt",
			"Kopling",
		],
		featured: [products[1], products[5], products[10]],
	},
	{
		id: 3,
		title: "Sparepart & Aksesoris",
		icon: "⚙️",
		subcategories: [
			"Kampas Rem",
			"Timing Belt",
			"Alternator",
			"Wiper Blade",
			"Lampu",
			"Sensor",
		],
		featured: [products[2], products[6], products[9]],
	},
];

const newArrivals = [
	products[1],
	products[6],
	products[8],
	products[3],
	products[10],
	products[11],
];

const brands = [
	"Shell",
	"Castrol",
	"Mobil 1",
	"Pertamina",
	"Bosch",
	"NGK",
	"Denso",
	"GS Astra",
	"Gates",
	"Bendix",
	"SKF",
	"Mann Filter",
];

/* ─── Sub-components ────────────────────────────────────── */

function StarRating({ rating, reviews }) {
	return (
		<div className="sp-stars">
			{[...Array(5)].map((_, i) => (
				<span
					key={i}
					className={i < rating ? "sp-star filled" : "sp-star"}
				>
					★
				</span>
			))}
			<span className="sp-reviews">({reviews})</span>
		</div>
	);
}

function ProductCard({ product }) {
	const fmt = (n) =>
		new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
			minimumFractionDigits: 0,
		}).format(n);
	return (
		<div className="sp-product-card">
			{product.badge && (
				<span
					className={`sp-badge sp-badge--${product.badge.toLowerCase()}`}
				>
					{product.badge}
				</span>
			)}
			<div className="sp-product-img">
				<span className="sp-product-emoji">
					{product.category === "pelumas"
						? "🛢️"
						: product.category === "filter"
							? "🔩"
							: product.category === "aki"
								? "🔋"
								: "⚙️"}
				</span>
			</div>
			<div className="sp-product-info">
				<p className="sp-sku">SKU: {product.sku}</p>
				<h4 className="sp-product-name">{product.name}</h4>
				<StarRating rating={product.rating} reviews={product.reviews} />
				<div className="sp-price-row">
					<span className="sp-price">{fmt(product.price)}</span>
					{product.originalPrice && (
						<span className="sp-original-price">
							{fmt(product.originalPrice)}
						</span>
					)}
				</div>
			</div>
			<button className="sp-add-cart">+ Tambah ke Keranjang</button>
		</div>
	);
}

function NewArrivalRow({ product }) {
	const fmt = (n) =>
		new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
			minimumFractionDigits: 0,
		}).format(n);
	return (
		<div className="sp-arrival-row">
			<div className="sp-arrival-img">
				<span>
					{product.category === "pelumas"
						? "🛢️"
						: product.category === "filter"
							? "🔩"
							: product.category === "aki"
								? "🔋"
								: "⚙️"}
				</span>
			</div>
			<div className="sp-arrival-info">
				<h5>{product.name}</h5>
				<StarRating rating={product.rating} reviews={product.reviews} />
				<div className="sp-price-row">
					<span className="sp-price">{fmt(product.price)}</span>
					{product.originalPrice && (
						<span className="sp-original-price">
							{fmt(product.originalPrice)}
						</span>
					)}
				</div>
			</div>
		</div>
	);
}

/* ─── Page ──────────────────────────────────────────────── */

export default function Spareparts() {
	const [activeTab, setActiveTab] = useState("all");
	const [search, setSearch] = useState("");

	const filtered = products.filter(
		(p) => activeTab === "all" || p.category === activeTab
	);

	return (
		<div className="spareparts-page">
			{/* ── Breadcrumb ── */}
			<div className="sp-breadcrumb">
				<div className="container">
					<span>Beranda</span>
					<span className="sp-breadcrumb-sep">›</span>
					<span className="sp-breadcrumb-current">Sparepart</span>
				</div>
			</div>

			{/* ── Hero Search ── */}
			<section className="sp-hero">
				<div className="container">
					<h1>Temukan Suku Cadang Kendaraan Anda</h1>
					<p>Ratusan merek dan puluhan ribu suku cadang tersedia</p>
					<form
						className="sp-search-form"
						onSubmit={(e) => e.preventDefault()}
					>
						<input
							type="text"
							placeholder="Cari nama part, nomor seri, atau merek..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="sp-search-input"
						/>
						<button type="submit" className="sp-search-btn">
							🔍 Cari
						</button>
					</form>
				</div>
			</section>

			{/* ── Features Strip (reuses Stats grid layout) ── */}
			<section className="stats sp-features-strip">
				<div className="container">
					<div className="stats-grid">
						{features.map((f, i) => (
							<div key={i} className="stat-card sp-feature-card">
								<div className="sp-feature-icon">{f.icon}</div>
								<h3 className="sp-feature-title">{f.title}</h3>
								<p>{f.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── Featured Products ── */}
			<section className="sp-section">
				<div className="container">
					<div className="sp-section-header">
						<h2 className="section-title">Produk Unggulan</h2>
						<div className="sp-tabs">
							{productTabs.map((tab) => (
								<button
									key={tab.key}
									className={`sp-tab ${activeTab === tab.key ? "active" : ""}`}
									onClick={() => setActiveTab(tab.key)}
								>
									{tab.label}
								</button>
							))}
						</div>
					</div>
					<div className="sp-products-grid">
						{filtered.slice(0, 8).map((p) => (
							<ProductCard key={p.id} product={p} />
						))}
					</div>
					<div className="sp-show-all">
						<button className="sp-btn-outline">
							Lihat Semua Produk →
						</button>
					</div>
				</div>
			</section>

			{/* ── Promo Banner ── */}
			<section className="sp-promo-banner">
				<div className="container">
					<div className="sp-promo-grid">
						<div className="sp-promo-card sp-promo-card--red">
							<p className="sp-promo-tag">PELUMAS MESIN</p>
							<h3>Oli Sintetik Bebas Gesekan</h3>
							<p className="sp-promo-sub">
								Gratis ongkir untuk pembelian ≥ 4 liter
							</p>
							<button className="sp-promo-btn">
								Belanja Sekarang
							</button>
						</div>
						<div className="sp-promo-card sp-promo-card--dark">
							<p className="sp-promo-tag">
								HEMAT HINGGA Rp 200.000
							</p>
							<h3>Part Interior Premium</h3>
							<p className="sp-promo-sub">
								Kulit, kain, dan aksesoris pilihan
							</p>
							<button className="sp-promo-btn">
								Belanja Sekarang
							</button>
						</div>
					</div>
				</div>
			</section>

			{/* ── Category Blocks ── */}
			{categoryBlocks.map((cat) => (
				<section key={cat.id} className="sp-section sp-category-block">
					<div className="container">
						<div className="sp-cat-layout">
							{/* Left: sub-categories */}
							<div className="sp-cat-sidebar">
								<h3 className="sp-cat-title">
									<span>{cat.icon}</span> {cat.title}
								</h3>
								<ul className="sp-cat-list">
									{cat.subcategories.map((sub) => (
										<li key={sub}>
											<a href="#">{sub}</a>
										</li>
									))}
								</ul>
								<a
									href="#"
									className="sp-btn-outline sp-shop-all"
								>
									Lihat Semua →
								</a>
							</div>
							{/* Right: featured products */}
							<div className="sp-cat-products">
								{cat.featured.map((p) => (
									<ProductCard key={p.id} product={p} />
								))}
							</div>
						</div>
					</div>
				</section>
			))}

			{/* ── New Arrivals ── */}
			<section className="sp-section sp-arrivals-section">
				<div className="container">
					<div className="sp-section-header">
						<h2 className="section-title">Produk Terbaru</h2>
						<div className="sp-tabs">
							{["Terbaru", "Terlaris", "Rating Tertinggi"].map(
								(t) => (
									<button
										key={t}
										className={`sp-tab ${t === "Terbaru" ? "active" : ""}`}
									>
										{t}
									</button>
								)
							)}
						</div>
					</div>
					<div className="sp-arrivals-grid">
						{newArrivals.map((p) => (
							<NewArrivalRow key={p.id} product={p} />
						))}
					</div>
				</div>
			</section>

			{/* ── Brands ── */}
			<section className="sp-brands">
				<div className="container">
					<h2 className="section-title">Merek Kami</h2>
					<div className="sp-brands-grid">
						{brands.map((brand) => (
							<div key={brand} className="sp-brand-card">
								<span>{brand}</span>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── Blog (reuse existing component — exact layout match) ── */}
			<Blog />
		</div>
	);
}
