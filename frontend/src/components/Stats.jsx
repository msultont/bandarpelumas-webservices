const stats = [
  {
    id: 1,
    number: "5000+",
    label: "Customers Every Year",
  },
  {
    id: 2,
    number: "20+",
    label: "Years of Experience",
  },
  {
    id: 3,
    number: "99%",
    label: "Customer Satisfaction",
  },
];

export default function Stats() {
  return (
    <section className="stats section-pad-md">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.id} className="stat-card">
              <h3>{stat.number}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
