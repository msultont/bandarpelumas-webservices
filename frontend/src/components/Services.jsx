const services = [
	{
		id: 1,
		icon: "🔧",
		title: "Body Repair",
		description:
			"Profesional perbaikan bodi mobil dari goresan ringan hingga kerusakan parah dengan hasil presisi.",
	},
	{
		id: 2,
		icon: "⚙️",
		title: "Marketplace",
		description:
			"Jelajahi berbagai produk dan layanan otomotif kami di marketplace online.",
	},
	{
		id: 3,
		icon: "✨",
		title: "Coating & Detailing",
		description:
			"Layanan detailing interior dan eksterior untuk mengembalikan mobil Anda ke kondisi prima.",
	},
	{
		id: 4,
		icon: "❄️",
		title: "Spesialis AC",
		description:
			"Layanan perawatan dan perbaikan AC dengan teknisi berpengalaman dan suku cadang asli.",
	},
	{
		id: 5,
		icon: "🛞",
		title: "Spooring & Balancing",
		description:
			"Layanan spooring dan balancing untuk memastikan keselarasan ban yang optimal dan stabilitas kendaraan.",
	},
	{
		id: 6,
		icon: "⚙️",
		title: "Paket Servis",
		description:
			"Paket layanan komprehensif untuk perawatan dan pemeliharaan rutin kendaraan Anda.",
	},
];

export default function Services() {
	return (
		<section className="services" id="services">
			<div className="container">
				<h2 className="section-title">Layanan Kami</h2>

				<div className="services-grid">
					{services.map((service) => (
						<div key={service.id} className="service-card">
							<div className="service-icon">{service.icon}</div>
							<h3>{service.title}</h3>
							<p>{service.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
