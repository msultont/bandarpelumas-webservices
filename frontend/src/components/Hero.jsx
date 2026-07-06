import { useState, useEffect, useCallback, useRef } from "react";

// Static slides — replace `src: null` with actual paths once media files are
// placed in /public, e.g. `${import.meta.env.BASE_URL}hero-1.jpg`
const slides = [
	{
		id: 1,
		type: "image",
		src: `${import.meta.env.BASE_URL}hero-1.png`,
		alt: "Bengkel Bandar Pelumas – One Stop Service",
		gradient: "linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%)",
		title: "ONE STOP SERVICE",
		subtitle:
			"Bandar Pelumas menyediakan layanan lengkap untuk semua jenis kendaraan, mulai dari perawatan rutin hingga perbaikan kompleks",
	},
	{
		id: 2,
		type: "image",
		src: `${import.meta.env.BASE_URL}hero-2.png`,
		alt: "Teknisi Berpengalaman Bandar Pelumas",
		gradient: "linear-gradient(135deg, #b91c1c 0%, #450a0a 100%)",
		title: "TEKNISI BERPENGALAMAN",
		subtitle:
			"Lebih dari 20 tahun, Bandar Pelumas telah melayani ribuan pelanggan dengan layanan terbaik",
	},
	{
		id: 3,
		type: "image",
		src: `${import.meta.env.BASE_URL}hero-3.png`,
		alt: "Areal Service Luas Bandar Pelumas",
		gradient: "linear-gradient(135deg, #b91c1c 0%, #450a0a 100%)",
		title: "AREAL SERVICE LUAS",
		subtitle:
			"Bandar Pelumas memiliki area service yang luas untuk kenyamanan pelanggan, serta fasilitas lengkap untuk semua jenis kendaraan",
	},
	{
		id: 4,
		type: "video",
		src: `${import.meta.env.BASE_URL}hero-video1.mov`,
		poster: null, // replace: `${import.meta.env.BASE_URL}hero-video-poster.jpg`
		gradient: "linear-gradient(135deg, #1c1917 0%, #0c0a09 100%)",
		title: "Bandar Pelumas Cipondoh - ONE STOP SERVICE",
		subtitle:
			"Outlet dengan fasilitas lengkap, dan teknisi berpengalaman untuk memastikan kendaraan Anda selalu dalam kondisi prima",
	},
	{
		id: 5,
		type: "video",
		src: `${import.meta.env.BASE_URL}hero-video2.mov`,
		poster: null, // replace: `${import.meta.env.BASE_URL}hero-video-poster.jpg`
		gradient: "linear-gradient(135deg, #1c1917 0%, #0c0a09 100%)",
		title: "Bandar Pelumas Showcase",
		subtitle: "",
	},
];

export default function Hero() {
	const [current, setCurrent] = useState(0);
	const [isHovered, setIsHovered] = useState(false);
	const timerRef = useRef(null);
	const videoRef = useRef(null);

	const next = useCallback(
		() => setCurrent((prev) => (prev + 1) % slides.length),
		[]
	);

	const prev = useCallback(
		() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length),
		[]
	);

	const goTo = useCallback((index) => setCurrent(index), []);

	useEffect(() => {
		if (isHovered) return;

		const slide = slides[current];

		if (slide.type === "video") {
			const video = videoRef.current;
			if (!video) {
				timerRef.current = setTimeout(next, 5000);
				return () => clearTimeout(timerRef.current);
			}

			const schedule = () => {
				const ms = Number.isFinite(video.duration)
					? video.duration * 1000
					: 5000;
				timerRef.current = setTimeout(next, ms);
			};

			if (video.readyState >= 1) {
				schedule();
			} else {
				video.addEventListener("loadedmetadata", schedule, {
					once: true,
				});
				return () => {
					clearTimeout(timerRef.current);
					video.removeEventListener("loadedmetadata", schedule);
				};
			}

			return () => clearTimeout(timerRef.current);
		}

		timerRef.current = setTimeout(next, 5000);
		return () => clearTimeout(timerRef.current);
	}, [isHovered, current, next]);

	const { title, subtitle } = slides[current];

	return (
		<section
			className="hero"
			id="home"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Carousel slides */}
			<div className="hero-carousel">
				{slides.map((slide, i) => (
					<div
						key={slide.id}
						className={`hero-slide${i === current ? " active" : ""}`}
						style={{ background: slide.gradient }}
					>
						{slide.type === "video" ? (
							<video
								ref={i === current ? videoRef : null}
								className="hero-slide-media"
								autoPlay
								loop
								muted
								playsInline
								poster={slide.poster || undefined}
								width="1920"
								height="1080"
							>
								{slide.src && (
									<source src={slide.src} type="video/mp4" />
								)}
							</video>
						) : (
							slide.src && (
								<img
									className="hero-slide-media"
									src={slide.src}
									alt={slide.alt}
									loading={i === 0 ? "eager" : "lazy"}
								/>
							)
						)}
						<div className="hero-slide-overlay" />
					</div>
				))}
			</div>

			{/* Text content — key re-triggers the fade-in animation on slide change */}
			<div className="hero-content">
				<div className="container">
					<div className="hero-text" key={current}>
						<h1>{title}</h1>
						<p>{subtitle}</p>
						<button className="cta-button">
							Konsultasi Sekarang
						</button>
					</div>
				</div>
			</div>

			{/* Navigation arrows */}
			<button
				className="hero-nav hero-nav--prev"
				onClick={prev}
				aria-label="Previous slide"
			>
				&#8249;
			</button>
			<button
				className="hero-nav hero-nav--next"
				onClick={next}
				aria-label="Next slide"
			>
				&#8250;
			</button>

			{/* Dot indicators */}
			<div
				className="hero-dots"
				role="tablist"
				aria-label="Slide indicators"
			>
				{slides.map((slide, i) => (
					<button
						key={slide.id}
						role="tab"
						className={`hero-dot${i === current ? " active" : ""}`}
						onClick={() => goTo(i)}
						aria-label={`Go to slide ${i + 1}`}
						aria-selected={i === current}
					/>
				))}
			</div>
		</section>
	);
}
