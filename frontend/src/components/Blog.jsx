import "./Blog.css";

const blogPosts = [
  {
    id: 1,
    title: "AC Mobil Bau Tidak Sedap? Ini Penyebabnya",
    category: "Edukasi",
    date: "2024-01-15",
    excerpt:
      "AC mobil yang mengeluarkan bau tidak sedap tentu sangat mengganggu kenyamanan saat berkendara. Mari kita pelajari penyebabnya.",
  },
  {
    id: 2,
    title: "Mesin Mobil Cepat Panas? Ini Penyebab & Solusinya",
    category: "Edukasi",
    date: "2024-01-10",
    excerpt:
      "Mesin mobil cepat panas atau overheat adalah masalah yang sering terjadi. Pelajari cara mengatasinya.",
  },
  {
    id: 3,
    title: "Tanda Oli Mobil Harus Diganti (Jangan Tunggu Rusak!)",
    category: "Edukasi",
    date: "2024-01-05",
    excerpt:
      "Oli mobil adalah komponen penting yang berfungsi melumasi mesin. Ketahui kapan waktunya untuk mengganti oli.",
  },
];

export default function Blog() {
  return (
    <section className="blog" id="blog">
      <div className="container">
        <h2 className="section-title">Latest Articles & Tips</h2>
        <p className="section-subtitle">
          Stay informed with our car maintenance tips and guides
        </p>

        <div className="blog-grid">
          {blogPosts.map((post) => (
            <article key={post.id} className="blog-card">
              <div className="blog-header">
                <span className="category">{post.category}</span>
                <span className="date">
                  {new Date(post.date).toLocaleDateString()}
                </span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <a href="#" className="read-more">
                Read More →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
