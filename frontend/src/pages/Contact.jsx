import { useState } from "react";

/* ─── Data ────────────────────────────────────────────── */
const contactCards = [
	{
		icon: "📞",
		title: "Nomor Telepon",
		lines: ["+62 895 9595 9595", "+62 821 2345 6789"],
	},
	{
		icon: "📧",
		title: "Alamat Email",
		lines: ["info@bandarpelumas.com", "support@bandarpelumas.com"],
	},
	{
		icon: "📍",
		title: "Lokasi Kami",
		lines: ["Jl. Raya Bengkel No. 45", "Jakarta Selatan, 12345"],
	},
	{
		icon: "🕐",
		title: "Jam Operasional",
		lines: ["Senin – Sabtu: 08.00 – 18.00", "Minggu: 09.00 – 15.00"],
	},
];

/* ─── Page ────────────────────────────────────────────── */
export default function Contact() {
	const [form, setForm] = useState({
		name: "",
		email: "",
		phone: "",
		subject: "",
		message: "",
	});
	const [submitted, setSubmitted] = useState(false);

	const handleChange = (e) =>
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmitted(true);
		setForm({ name: "", email: "", phone: "", subject: "", message: "" });
		setTimeout(() => setSubmitted(false), 4000);
	};

	return (
		<div className="contact-page">
			{/* ── Breadcrumb ── */}
			<div className="contact-breadcrumb">
				<div className="container">
					<span>Beranda</span>
					<span className="breadcrumb-sep">›</span>
					<span className="breadcrumb-current">Kontak Kami</span>
				</div>
			</div>

			{/* ── Page Title ── */}
			<section className="contact-hero">
				<div className="container">
					<h1 className="section-title">Kontak Kami</h1>
					<p className="section-subtitle">
						Ada pertanyaan atau ingin buat janji servis? Kami siap
						membantu Anda
					</p>
				</div>
			</section>

			{/* ── Map ── */}
			<div className="contact-map">
				<iframe
					title="Lokasi Bandar Pelumas"
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.194741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sJakarta!5e0!3m2!1sen!2sid!4v1680000000000!5m2!1sen!2sid"
					allowFullScreen=""
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
				/>
			</div>

			{/* ── Contact Info Cards — reuses .stats-grid / .stat-card layout ── */}
			<section className="stats contact-info-strip">
				<div className="container">
					<div className="stats-grid">
						{contactCards.map((card) => (
							<div
								key={card.title}
								className="stat-card contact-info-card"
							>
								<div className="contact-card-icon">
									{card.icon}
								</div>
								<h3 className="contact-card-title">
									{card.title}
								</h3>
								{card.lines.map((line) => (
									<p key={line} className="contact-card-line">
										{line}
									</p>
								))}
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── Form + Extra Info ── */}
			<section className="contact-main">
				<div className="container">
					<div className="contact-layout">
						{/* Form */}
						<div className="contact-form-wrap">
							<h2 className="contact-section-heading">
								Kirim Pesan
							</h2>
							<p className="contact-section-sub">
								Isi formulir di bawah ini dan kami akan
								merespons dalam 1×24 jam
							</p>

							{submitted && (
								<div className="contact-success">
									✅ Pesan berhasil dikirim! Kami akan segera
									menghubungi Anda.
								</div>
							)}

							<form
								className="contact-form"
								onSubmit={handleSubmit}
							>
								<div className="contact-form-row">
									<div className="contact-field">
										<label htmlFor="name">
											Nama Lengkap *
										</label>
										<input
											id="name"
											name="name"
											type="text"
											placeholder="Masukkan nama Anda"
											value={form.name}
											onChange={handleChange}
											required
										/>
									</div>
									<div className="contact-field">
										<label htmlFor="email">
											Alamat Email *
										</label>
										<input
											id="email"
											name="email"
											type="email"
											placeholder="contoh@email.com"
											value={form.email}
											onChange={handleChange}
											required
										/>
									</div>
								</div>

								<div className="contact-form-row">
									<div className="contact-field">
										<label htmlFor="phone">
											Nomor Telepon
										</label>
										<input
											id="phone"
											name="phone"
											type="tel"
											placeholder="+62 8xx xxxx xxxx"
											value={form.phone}
											onChange={handleChange}
										/>
									</div>
									<div className="contact-field">
										<label htmlFor="subject">
											Subjek *
										</label>
										<select
											id="subject"
											name="subject"
											value={form.subject}
											onChange={handleChange}
											required
										>
											<option value="">
												-- Pilih Subjek --
											</option>
											<option>Konsultasi Servis</option>
											<option>Pemesanan Sparepart</option>
											<option>Informasi Harga</option>
											<option>Keluhan</option>
											<option>Lainnya</option>
										</select>
									</div>
								</div>

								<div className="contact-field">
									<label htmlFor="message">Pesan *</label>
									<textarea
										id="message"
										name="message"
										rows={6}
										placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
										value={form.message}
										onChange={handleChange}
										required
									/>
								</div>

								<button
									type="submit"
									className="contact-submit"
								>
									Kirim Pesan →
								</button>
							</form>
						</div>

						{/* Side info */}
						<aside className="contact-aside">
							<div className="contact-aside-block">
								<h3>Butuh Bantuan Segera?</h3>
								<p>
									Hubungi langsung tim kami melalui WhatsApp
									untuk respons lebih cepat dan konsultasi
									gratis.
								</p>
								<a
									href="https://wa.me/6289595959595"
									className="contact-wa-btn"
									target="_blank"
									rel="noopener noreferrer"
								>
									💬 Chat via WhatsApp
								</a>
							</div>

							<div className="contact-aside-block">
								<h3>Lokasi Workshop</h3>
								<p>Jl. Raya Bengkel No. 45, Jakarta Selatan</p>
								<p>
									Tersedia parkir luas &amp; ruang tunggu
									nyaman
								</p>
							</div>

							<div className="contact-aside-block">
								<h3>Ikuti Kami</h3>
								<div className="contact-socials">
									<a href="#" className="contact-social-link">
										📘 Facebook
									</a>
									<a href="#" className="contact-social-link">
										📸 Instagram
									</a>
									<a href="#" className="contact-social-link">
										🎵 TikTok
									</a>
								</div>
							</div>
						</aside>
					</div>
				</div>
			</section>
		</div>
	);
}
