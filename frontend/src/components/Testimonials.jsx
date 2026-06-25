const testimonials = [
	{
		id: 1,
		name: "Nanda Prasetyo",
		title: "Customer PAG",
		rating: 5,
		comment:
			"Body repair hasil halus dan sambungan panelnya presisi. Tidak kelihatan bekas tabrakan sama sekali.",
	},
	{
		id: 2,
		name: "Agus Dharma",
		title: "Customer PAG",
		rating: 5,
		comment:
			"Saya suka karena mekaniknya komunikatif. Semua pengerjaan dijelaskan detail jadi lebih tenang.",
	},
	{
		id: 3,
		name: "Komang Yudi",
		title: "Customer PAG",
		rating: 5,
		comment:
			"Sudah beberapa kali service rutin. Mekaniknya detail, tidak asal ganti part dan selalu dijelaskan kerusakannya.",
	},
	{
		id: 4,
		name: "Dewa Mahendra",
		title: "Customer PAG",
		rating: 5,
		comment:
			"Kena serempet motor, masuk PAG cuma beberapa hari hasilnya rapi dan ada garansi. Recommended banget!",
	},
	{
		id: 5,
		name: "Andre",
		title: "Customer PAG",
		rating: 5,
		comment:
			"Mobil habis lecet di pintu kiri, setelah masuk PAG hasil catnya rapi banget dan warnanya nyatu.",
	},
];

function StarRating({ rating }) {
	return (
		<div className="stars">
			{[...Array(5)].map((_, i) => (
				<span key={i} className={i < rating ? "star filled" : "star"}>
					★
				</span>
			))}
		</div>
	);
}

export default function Testimonials() {
	return (
		<section className="testimonials" id="testimonials">
			<div className="container">
				<h2 className="section-title">What Our Customers Say</h2>
				<p className="section-subtitle">
					Real feedback from satisfied clients
				</p>

				<div className="testimonials-grid">
					{testimonials.map((testimonial) => (
						<div key={testimonial.id} className="testimonial-card">
							<StarRating rating={testimonial.rating} />
							<p className="comment">"{testimonial.comment}"</p>
							<div className="testimonial-author">
								<h4>{testimonial.name}</h4>
								<p>{testimonial.title}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
