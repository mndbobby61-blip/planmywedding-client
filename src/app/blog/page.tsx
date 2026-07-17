const POSTS = [
  { title: "How to set a wedding budget that actually works", date: "12 Jul 2026" },
  { title: "5 questions to ask every photographer", date: "2 Jul 2026" },
  { title: "Planning a 200-guest wedding on a mid-size budget", date: "20 Jun 2026" },
];

export default function BlogPage() {
  return (
    <section className="container-page py-16 max-w-2xl mx-auto">
      <h1 className="font-display text-2xl text-plum-700 mb-8 text-center">Wedding planning blog</h1>
      <div className="space-y-4">
        {POSTS.map((post) => (
          <article key={post.title} className="bg-white rounded-xl border border-gold-200/60 p-5">
            <p className="font-body text-xs text-charcoal/50 mb-1">{post.date}</p>
            <h2 className="font-display text-lg text-plum-700">{post.title}</h2>
          </article>
        ))}
      </div>
    </section>
  );
}
