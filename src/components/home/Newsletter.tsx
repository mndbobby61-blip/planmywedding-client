export default function Newsletter() {
  return (
    <section className="container-page py-14">
      <div className="bg-gold-50 rounded-2xl p-10 text-center">
        <h2 className="font-display text-2xl text-plum-700 mb-2">Get wedding planning tips in your inbox</h2>
        <p className="font-body text-sm text-charcoal/60 mb-6">Budget guides, vendor picks and checklists, once a month.</p>
        <form className="flex justify-center gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="you@example.com"
            className="flex-1 border border-gold-200 rounded-md px-4 py-2.5 text-sm font-body focus:outline-none focus:ring-2 focus:ring-plum-400"
          />
          <button type="submit" className="btn-primary">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
