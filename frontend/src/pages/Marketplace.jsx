import { useState, useEffect } from "react";
import FAQ from "../components/FAQ";
import { useCart } from "../context/CartContext";
import api from "../lib/api";

/* ─── Static data ───────────────────────────────────────── */

const features = [
  {
    icon: "🚚",
    title: "Pengiriman Gratis",
    desc: "Untuk pembelian di atas Rp 300.000",
  },
  { icon: "🕐", title: "Support 24/7", desc: "Hubungi kami kapan saja" },
  { icon: "✅", title: "Suku Cadang Asli", desc: "100% original & bergaransi" },
  { icon: "🏷️", title: "Harga Terbaik", desc: "Diskon hingga 40%" },
];

const productTabs = [
  { key: "all", label: "Semua" },
  { key: "pelumas", label: "Pelumas" },
  { key: "filter", label: "Filter" },
  { key: "sparepart", label: "Sparepart" },
  { key: "aki", label: "Aki" },
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

/* ─── Helpers ────────────────────────────────────────────── */

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

/* ─── Sub-components ─────────────────────────────────────── */

function StarRating({ rating, reviews }) {
  return (
    <div className="sp-stars">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < rating ? "sp-star filled" : "sp-star"}>
          ★
        </span>
      ))}
      <span className="sp-reviews">({reviews})</span>
    </div>
  );
}

function ProductCard({ product }) {
  const { addItem, items, loading } = useCart();
  const inCart = items.find((i) => i.productId === product._id);

  return (
    <div className="sp-product-card">
      {product.badge && (
        <span className={`sp-badge sp-badge--${product.badge.toLowerCase()}`}>
          {product.badge}
        </span>
      )}
      <div className="sp-product-img">
        <span className="sp-product-emoji">
          {categoryEmoji(product.category)}
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
      <button
        className={`sp-add-cart ${inCart ? "sp-add-cart--in-cart" : ""}`}
        onClick={() => addItem(product._id)}
        disabled={loading}
      >
        {inCart
          ? `✓ Di Keranjang (${inCart.quantity})`
          : "+ Tambah ke Keranjang"}
      </button>
    </div>
  );
}

function NewArrivalRow({ product }) {
  const { addItem, loading } = useCart();

  return (
    <div className="sp-arrival-row">
      <div className="sp-arrival-img">
        <span>{categoryEmoji(product.category)}</span>
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
      <button
        className="sp-arrival-cart-btn"
        onClick={() => addItem(product._id)}
        disabled={loading}
        aria-label="Tambah ke keranjang"
      >
        🛒
      </button>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────── */

export default function Marketplace() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    api
      .get("/products")
      .then(({ data }) => setProducts(data.products))
      .catch(() => setFetchError(true));
  }, []);

  const filtered = products.filter(
    (p) =>
      (activeTab === "all" || p.category === activeTab) &&
      (search === "" || p.name.toLowerCase().includes(search.toLowerCase())),
  );

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
      featured: products.filter((p) => p.category === "pelumas").slice(0, 3),
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
      featured: products.filter((p) => p.category === "filter").slice(0, 3),
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
      featured: products.filter((p) => p.category === "sparepart").slice(0, 3),
    },
  ];

  const newArrivals = [...products].slice(-6).reverse();

  return (
    <div className="spareparts-page">
      {/* ── Breadcrumb ── */}
      <div className="breadcrumb">
        <div className="container">
          <span>Beranda</span>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">Marketplace</span>
        </div>
      </div>

      {/* ── Hero Search ── */}
      <section className="sp-hero">
        <div className="container">
          <h1>Temukan Suku Cadang Kendaraan Anda</h1>
          <p>Ratusan merek dan puluhan ribu suku cadang tersedia</p>
          <form className="sp-search-form" onSubmit={(e) => e.preventDefault()}>
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

      {/* ── Features Strip ── */}
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

          {fetchError && (
            <p className="sp-fetch-error">
              Gagal memuat produk. Pastikan server backend berjalan.
            </p>
          )}

          <div className="sp-products-grid">
            {filtered.slice(0, 8).map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
          <div className="sp-show-all">
            <button className="sp-btn-outline">Lihat Semua Produk →</button>
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
              <button className="sp-promo-btn">Belanja Sekarang</button>
            </div>
            <div className="sp-promo-card sp-promo-card--dark">
              <p className="sp-promo-tag">HEMAT HINGGA Rp 200.000</p>
              <h3>Part Interior Premium</h3>
              <p className="sp-promo-sub">Kulit, kain, dan aksesoris pilihan</p>
              <button className="sp-promo-btn">Belanja Sekarang</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Category Blocks ── */}
      {categoryBlocks.map((cat) => (
        <section key={cat.id} className="sp-section sp-category-block">
          <div className="container">
            <div className="sp-cat-layout">
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
                <a href="#" className="sp-btn-outline sp-shop-all">
                  Lihat Semua →
                </a>
              </div>
              <div className="sp-cat-products">
                {cat.featured.map((p) => (
                  <ProductCard key={p._id} product={p} />
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
              {["Terbaru", "Terlaris", "Rating Tertinggi"].map((t) => (
                <button
                  key={t}
                  className={`sp-tab ${t === "Terbaru" ? "active" : ""}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="sp-arrivals-grid">
            {newArrivals.map((p) => (
              <NewArrivalRow key={p._id} product={p} />
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

      {/* ── FAQ ── */}
      <FAQ />
    </div>
  );
}
