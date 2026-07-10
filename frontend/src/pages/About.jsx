export default function About() {
  const outlets = [
    {
      id: 1,
      namaOutlet: "Bandar Pelumas Cipondoh",
      alamat:
        "RM2H+XHH, No.238, 15146, Gg. Sadar II, RT.001/RW.002, Cipondoh, Kec. Cipondoh, Kota Tangerang, Banten 15148",
      outletUrl: "https://maps.app.goo.gl/V5qWU9rgyfY4Xbq4A",
      outletImage: `${import.meta.env.BASE_URL}outlet-cipondoh.jpg`,
    },
    {
      id: 2,
      namaOutlet: "Bandar Pelumas Bintaro",
      alamat:
        "Jl. Jombang Raya No.1, RT.004/RW.005, Parigi, Kec. Pd. Aren, Kota Tangerang Selatan, Banten 15229",
      outletUrl: "https://maps.app.goo.gl/QBcpLDUDecAwQwFfA",
      outletImage: `${import.meta.env.BASE_URL}outlet-bintaro.png`,
    },
    {
      id: 3,
      namaOutlet: "Bandar Pelumas Lembang",
      alamat:
        "Jl. Raden Patah No.18A, RT.001/RW.006, Parung Serab, Kec. Ciledug, Kota Tangerang, Banten 15153",
      outletUrl: "https://maps.app.goo.gl/9nx7xn2TkojSnM5u5",
      outletImage: `${import.meta.env.BASE_URL}outlet-lembang.svg`,
    },
    {
      id: 4,
      namaOutlet: "Bandar Pelumas Pedurenan",
      alamat:
        "Jl. KH. Hasyim Ashari No.09, RT.007/RW.002, Pedurenan, Kec. Ciledug, Kota Tangerang, Banten 15158",
      outletUrl: "https://maps.app.goo.gl/ATEFiNESRmDQ4Zxv7",
      outletImage: `${import.meta.env.BASE_URL}outlet-pedurenan.jpg`,
    },
    {
      id: 5,
      namaOutlet: "Bandar Pelumas Pasar Baru",
      alamat:
        "Jl. Moh. Toha No.18, RT.003/RW.002, Pabuaran Tumpeng, Kec. Karawaci, Kota Tangerang, Banten 15114",
      outletUrl: "https://maps.app.goo.gl/w6E8DZRJDyDA6xdg8",
      outletImage: `${import.meta.env.BASE_URL}outlet-pasarbaru.webp`,
    },
    {
      id: 6,
      namaOutlet: "Bandar Pelumas Karawaci",
      alamat:
        "Jl. Imam Bonjol No.237, RT.002/RW.001, Bojong Jaya, Kec. Karawaci, Kota Tangerang, Banten 15115",
      outletUrl: "https://maps.app.goo.gl/Cg4XhNkcCbde6FKa6",
      outletImage: `${import.meta.env.BASE_URL}outlet-karawaci.jpg`,
    },
    {
      id: 7,
      namaOutlet: "Bandar Pelumas Cikokol",
      alamat:
        "Jl. Jenderal Sudirman No.13, RT.003/RW.013, Sukasari, Kec. Tangerang, Kota Tangerang, Banten 15118",
      outletUrl: "https://maps.app.goo.gl/3AFVP5X1Z7TQ7LFv6",
      outletImage: `${import.meta.env.BASE_URL}outlet-cikokol.jpg`,
    },
    {
      id: 8,
      namaOutlet: "Bandar Pelumas Soekarno-Hatta",
      alamat:
        "Jl. Marsekal Suryadarma No.3, RT.003/RW.004, Selapajang Jaya, Kec. Neglasari, Kota Tangerang, Banten 15127",
      outletUrl: "https://maps.app.goo.gl/sduyuQMwxmoMNTEf8",
      outletImage: `${import.meta.env.BASE_URL}outlet-soetta.png`,
    },
    {
      id: 9,
      namaOutlet: "Maestro by Bandar Pelumas",
      alamat:
        "Jl. Perintis Kemerdekaan No.265, RT.001/RW.011, Sukasari, Kec. Tangerang, Kota Tangerang, Banten 15118",
      outletUrl: "https://maps.app.goo.gl/drFtgRDoHiL6pLkC8",
      outletImage: `${import.meta.env.BASE_URL}outlet-maestro.jpg`,
    },
  ];

  // const highlights = [
  //     {
  //         id: 1,
  //         icon: "🤝",
  //         title: "Partnership with Major Insurance Companies",
  //         description:
  //             "Trusted by 54 general insurance companies and provides one-stop service for government institutions and large corporations",
  //     },
  //     {
  //         id: 2,
  //         icon: "👨‍💼",
  //         title: "Professional Sales Advisors",
  //         description:
  //             "Friendly and professional sales advisors provide optimal service with clear repair estimates and information",
  //     },
  //     {
  //         id: 3,
  //         icon: "✅",
  //         title: "Quality Control Screening",
  //         description:
  //             "Detailed and layered inspections by quality control team to ensure quality standards",
  //     },
  //     {
  //         id: 4,
  //         icon: "☕",
  //         title: "Comfortable Waiting Area",
  //         description:
  //             "Equipped with AC, refreshments, and free WiFi for a pleasant waiting experience",
  //     },
  //     {
  //         id: 5,
  //         icon: "🔒",
  //         title: "Vehicle Security 24/7",
  //         description:
  //             "24-hour security and CCTV monitoring at every corner to ensure vehicle safety",
  //     },
  //     {
  //         id: 6,
  //         icon: "📱",
  //         title: "Modern Service Technology",
  //         description:
  //             "Tablet-based service system to accelerate and simplify customer service",
  //     },
  // ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1>Tentang Bandar Pelumas</h1>
          <p>
            Mitra terpercaya Anda untuk perawatan otomotif komprehensif sejak
            1999
          </p>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="about-intro section-pad">
        <div className="container">
          <div className="intro-content">
            <img
              className="hero-slide-media"
              src={`${import.meta.env.BASE_URL}makna-logo.jpg`}
              alt="Makna Logo"
            />
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      {/* <section className="vision-mission">
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
			</section>*/}

      {/* Highlights Section */}
      {/* <section className="highlights">
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
			</section> */}

      {/* Cabang Kami Section */}
      <section className="faq outlet-section section-pad" id="faq">
        <div className="container">
          <h2 className="section-title">Cabang Kami</h2>
          <div className="faq-grid outlet-grid">
            {outlets.map((outlet, index) => (
              <a
                key={outlet.id}
                className="faq-card outlet-card"
                href={outlet.outletUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={
                  outlet.outletImage
                    ? {
                        backgroundImage: `linear-gradient(180deg, rgba(17, 24, 39, 0.1) 0%, rgba(17, 24, 39, 0.84) 100%), url(${outlet.outletImage})`,
                      }
                    : undefined
                }
              >
                <div className="faq-number outlet-number">{index + 1}</div>
                <div className="outlet-card-content">
                  <h4>{outlet.namaOutlet}</h4>
                  <p>{outlet.alamat}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta section-pad-md">
        <div className="container">
          <h2>Ready to Experience Our Service?</h2>
          <p>
            Contact us today for consultation or to schedule your service
            appointment
          </p>
          <button className="cta-button">Get in Touch</button>
        </div>
      </section>
    </div>
  );
}
