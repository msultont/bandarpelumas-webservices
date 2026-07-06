import { useState, useEffect } from "react";
import api from "../lib/api";

const fallbackTestimonials = [
	{
		id: 1,
		author_name: "Nanda Prasetyo",
		rating: 5,
		text: "Body repair hasil halus dan sambungan panelnya presisi. Tidak kelihatan bekas tabrakan sama sekali.",
		relative_time_description: "",
		profile_photo_url: null,
	},
	{
		id: 2,
		author_name: "Agus Dharma",
		rating: 5,
		text: "Saya suka karena mekaniknya komunikatif. Semua pengerjaan dijelaskan detail jadi lebih tenang.",
		relative_time_description: "",
		profile_photo_url: null,
	},
	{
		id: 3,
		author_name: "Komang Yudi",
		rating: 5,
		text: "Sudah beberapa kali service rutin. Mekaniknya detail, tidak asal ganti part dan selalu dijelaskan kerusakannya.",
		relative_time_description: "",
		profile_photo_url: null,
	},
	{
		id: 4,
		author_name: "Dewa Mahendra",
		rating: 5,
		text: "Kena serempet motor, masuk PAG cuma beberapa hari hasilnya rapi dan ada garansi. Recommended banget!",
		relative_time_description: "",
		profile_photo_url: null,
	},
	{
		id: 5,
		author_name: "Andre",
		rating: 5,
		text: "Mobil habis lecet di pintu kiri, setelah masuk PAG hasil catnya rapi banget dan warnanya nyatu.",
		relative_time_description: "",
		profile_photo_url: null,
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
	const [reviews, setReviews] = useState(fallbackTestimonials);

	useEffect(() => {
		api.get("/reviews")
			.then((res) => {
				const data = res.data;
				console.log("[Testimonials] Fetched reviews:", data);
				if (Array.isArray(data.reviews) && data.reviews.length > 0) {
					setReviews(
						data.reviews.map((r, i) => ({ ...r, id: i + 1 }))
					);
				}
			})
			.catch((error) => {
				console.error("[Testimonials] Failed to fetch reviews:", error);
				// keep fallback
			});
	}, []);

	return (
		<section className="testimonials" id="testimonials">
			<div className="container">
				<h2 className="section-title">Apa Kata Mereka?</h2>

				<div className="testimonials-grid">
					{reviews.map((review) => (
						<div key={review.id} className="testimonial-card">
							<StarRating rating={review.rating} />
							<p className="comment">"{review.text}"</p>
							<div className="testimonial-author">
								{review.profile_photo_url && (
									<img
										src={review.profile_photo_url}
										alt={review.author_name}
										className="testimonial-avatar"
										referrerPolicy="no-referrer"
									/>
								)}
								<div>
									<h4>{review.author_name}</h4>
									{review.relative_time_description && (
										<p>
											{review.relative_time_description}
										</p>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
