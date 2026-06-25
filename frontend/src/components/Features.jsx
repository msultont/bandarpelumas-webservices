const features = [
	{
		id: 1,
		icon: "👥",
		title: "Professional Technicians",
		description:
			"Our team consists of highly trained and experienced technicians.",
	},
	{
		id: 2,
		icon: "⚡",
		title: "Fast Process",
		description:
			"Scheduled work process ensures efficient and timely service completion.",
	},
	{
		id: 3,
		icon: "💰",
		title: "Transparent Pricing",
		description: "Clear cost estimation upfront with no hidden charges.",
	},
	{
		id: 4,
		icon: "✅",
		title: "Guaranteed Results",
		description: "Quality assurance on all work with warranty on repairs.",
	},
];

export default function Features() {
	return (
		<section className="features">
			<div className="container">
				<h2 className="section-title">Why Choose Us</h2>

				<div className="features-grid">
					{features.map((feature) => (
						<div key={feature.id} className="feature-card">
							<div className="feature-icon">{feature.icon}</div>
							<h3>{feature.title}</h3>
							<p>{feature.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
