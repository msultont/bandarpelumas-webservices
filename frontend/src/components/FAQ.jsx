const faqs = [
  {
    id: 1,
    question: "Can I consult without booking a service?",
    answer:
      "Yes, absolutely. Our team is ready to help provide explanations and best recommendations for your vehicle's condition.",
  },
  {
    id: 2,
    question: "Is Car Service open every day?",
    answer:
      "We are open Monday to Saturday. Please check our contact page for specific hours.",
  },
  {
    id: 3,
    question: "What services does Car Service offer?",
    answer:
      "We offer body repair, engine service, AC service, detailing, 24-hour towing, and other related services.",
  },
  {
    id: 4,
    question: "Do you accept cashless payment?",
    answer:
      "Yes, we accept various payment methods including bank transfers and digital payments.",
  },
  {
    id: 5,
    question: "Is there a warranty after repair?",
    answer:
      "Yes, we provide warranty for certain services according to the type of work performed.",
  },
];

export default function FAQ() {
  return (
    <section className="faq section-pad" id="faq">
      <div className="container">
        <h2 className="section-title">Frequently Asked Questions</h2>
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
  );
}
