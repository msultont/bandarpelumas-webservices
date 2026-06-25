export default function About() {
	const faqs = [
		{
			id: 1,
			question: "Can I consult without booking a service?",
			answer: "Yes, absolutely. Our team is ready to help provide explanations and best recommendations for your vehicle's condition.",
		},
		{
			id: 2,
			question: "Is Car Service open every day?",
			answer: "We are open Monday to Saturday. Please check our contact page for specific hours.",
		},
		{
			id: 3,
			question: "What services does Car Service offer?",
			answer: "We offer body repair, engine service, AC service, detailing, 24-hour towing, and other related services.",
		},
		{
			id: 4,
			question: "Do you accept cashless payment?",
			answer: "Yes, we accept various payment methods including bank transfers and digital payments.",
		},
		{
			id: 5,
			question: "Is there a warranty after repair?",
			answer: "Yes, we provide warranty for certain services according to the type of work performed.",
		},
	];

	const highlights = [
		{
			id: 1,
			icon: "🤝",
			title: "Partnership with Major Insurance Companies",
			description:
				"Trusted by 54 general insurance companies and provides one-stop service for government institutions and large corporations",
		},
		{
			id: 2,
			icon: "👨‍💼",
			title: "Professional Sales Advisors",
			description:
				"Friendly and professional sales advisors provide optimal service with clear repair estimates and information",
		},
		{
			id: 3,
			icon: "✅",
			title: "Quality Control Screening",
			description:
				"Detailed and layered inspections by quality control team to ensure quality standards",
		},
		{
			id: 4,
			icon: "☕",
			title: "Comfortable Waiting Area",
			description:
				"Equipped with AC, refreshments, and free WiFi for a pleasant waiting experience",
		},
		{
			id: 5,
			icon: "🔒",
			title: "Vehicle Security 24/7",
			description:
				"24-hour security and CCTV monitoring at every corner to ensure vehicle safety",
		},
		{
			id: 6,
			icon: "📱",
			title: "Modern Service Technology",
			description:
				"Tablet-based service system to accelerate and simplify customer service",
		},
	];

	return (
		<div className="about-page">
			{/* Hero Section */}
			<section className="about-hero">
				<div className="container">
					<h1>About Car Service</h1>
					<p>
						Your trusted partner for comprehensive automotive care
						since 2002
					</p>
				</div>
			</section>

			{/* Company Introduction */}
			<section className="about-intro">
				<div className="container">
					<div className="intro-content">
						<h2>Car Service</h2>
						<p>
							The largest car body repair, paint, and engine
							service center. Established since 2002, we service
							and accept all types of services and all car brands.
						</p>
						<p>
							Prioritizing customer satisfaction, speed, and
							quality. Supported by competent technicians, modern
							equipment, and additional services such as 24-hour
							towing, home service, car detailing, and spare
							parts.
						</p>
						<p>
							Trusted by renowned insurance companies, major
							corporations and government institutions, and now
							serving non-insured vehicles as well.
						</p>
					</div>
				</div>
			</section>

			{/* Vision & Mission */}
			<section className="vision-mission">
				<div className="container">
					<div className="vm-grid">
						<div className="vm-card vision">
							<h3>Vision</h3>
							<p>
								To become a leading automotive company in
								Indonesia, professional and always able to
								provide satisfaction to all stakeholders
								(Customers, Owners, Management, Employees,
								Environment & Government)
							</p>
						</div>
						<div className="vm-card mission">
							<h3>Mission</h3>
							<ul>
								<li>
									Provide quality, innovative products &
									services supported by reliable human
									resources and cutting-edge technology
								</li>
								<li>
									Provide quick, friendly and professional
									service
								</li>
								<li>
									Conduct business according to good corporate
									governance principles
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* Highlights Section */}
			<section className="highlights">
				<div className="container">
					<h2 className="section-title">Why We're Different</h2>
					<div className="highlights-grid">
						{highlights.map((highlight) => (
							<div key={highlight.id} className="highlight-card">
								<div className="highlight-icon">
									{highlight.icon}
								</div>
								<h3>{highlight.title}</h3>
								<p>{highlight.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section className="faq-section">
				<div className="container">
					<h2 className="section-title">
						Frequently Asked Questions
					</h2>
					<div className="faq-grid">
						{faqs.map((faq, index) => (
							<div key={faq.id} className="faq-card">
								<div className="faq-number">{index + 1}</div>
								<h4>{faq.question}</h4>
								<p>{faq.answer}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="about-cta">
				<div className="container">
					<h2>Ready to Experience Our Service?</h2>
					<p>
						Contact us today for consultation or to schedule your
						service appointment
					</p>
					<button className="cta-button">Get in Touch</button>
				</div>
			</section>
		</div>
	);
}
