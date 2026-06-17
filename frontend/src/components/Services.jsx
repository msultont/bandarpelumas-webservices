import "./Services.css";

const services = [
  {
    id: 1,
    icon: "🔧",
    title: "Body Repair",
    description:
      "Professional body repair from minor scratches to severe damage with precision results.",
  },
  {
    id: 2,
    icon: "⚙️",
    title: "Engine Service",
    description:
      "Complete engine maintenance and repair to keep your vehicle running smoothly and safely.",
  },
  {
    id: 3,
    icon: "✨",
    title: "Detailing",
    description:
      "Interior and exterior detailing service to restore your car to pristine condition.",
  },
  {
    id: 4,
    icon: "🚘",
    title: "Ford Specialist",
    description:
      "Expert Ford service with experienced technicians and genuine spare parts.",
  },
  {
    id: 5,
    icon: "❄️",
    title: "AC Service",
    description:
      "Air conditioning maintenance and repair for optimal cooling performance.",
  },
  {
    id: 6,
    icon: "🔌",
    title: "Electrical Service",
    description:
      "Electrical system diagnosis and repair for all vehicle types and models.",
  },
];

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">
          Complete car maintenance solutions available at one location
        </p>

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
