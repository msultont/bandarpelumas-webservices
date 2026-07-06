import { useState, useEffect, useCallback, useRef } from "react";

// Static slides — replace `src: null` with actual paths once media files are
// placed in /public, e.g. `${import.meta.env.BASE_URL}hero-1.jpg`
const slides = [
    {
        id: 1,
        type: "image",
        src: null, // replace: `${import.meta.env.BASE_URL}hero-1.jpg`
        alt: "Bengkel Bandar Pelumas – One Stop Service",
        gradient: "linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%)",
        title: "ONE STOP SERVICE",
        subtitle:
            "Complete car maintenance and repair services with professional technicians",
    },
    {
        id: 2,
        type: "image",
        src: null, // replace: `${import.meta.env.BASE_URL}hero-2.jpg`
        alt: "Teknisi Profesional Bandar Pelumas",
        gradient: "linear-gradient(135deg, #b91c1c 0%, #450a0a 100%)",
        title: "TEKNISI PROFESIONAL",
        subtitle:
            "Teknisi berpengalaman siap melayani kebutuhan kendaraan Anda",
    },
    {
        id: 3,
        type: "video",
        src: `${import.meta.env.BASE_URL}hero-video.mp4.MOV`, // replace: `${import.meta.env.BASE_URL}hero-video.mp4` (1080p HD)
        poster: null, // replace: `${import.meta.env.BASE_URL}hero-video-poster.jpg`
        gradient: "linear-gradient(135deg, #1c1917 0%, #0c0a09 100%)",
        title: "SPAREPARTS TERLENGKAP",
        subtitle:
            "Ribuan pilihan sparepart berkualitas untuk semua jenis kendaraan",
    },
];

export default function Hero() {
    const [current, setCurrent] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const timerRef = useRef(null);

    const next = useCallback(
        () => setCurrent((prev) => (prev + 1) % slides.length),
        [],
    );

    const prev = useCallback(
        () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length),
        [],
    );

    const goTo = useCallback((index) => setCurrent(index), []);

    useEffect(() => {
        if (isHovered) {
            clearInterval(timerRef.current);
            return;
        }
        timerRef.current = setInterval(next, 5000);
        return () => clearInterval(timerRef.current);
    }, [isHovered, next]);

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
                                className="hero-slide-media"
                                autoPlay
                                muted
                                loop
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
