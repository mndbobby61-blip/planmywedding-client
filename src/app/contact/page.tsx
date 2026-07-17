export default function ContactPage() {
  return (
    <section className="container-page py-16 max-w-md mx-auto">
      <h1 className="font-display text-2xl text-plum-700 mb-6 text-center">Contact us</h1>
      <form className="space-y-4">
        <input
          required
          placeholder="Your name"
          className="w-full border border-gold-200/60 rounded-md px-4 py-2.5 text-sm font-body"
        />
        <input
          required
          type="email"
          placeholder="you@example.com"
          className="w-full border border-gold-200/60 rounded-md px-4 py-2.5 text-sm font-body"
        />
        <textarea
          required
          rows={4}
          placeholder="How can we help?"
          className="w-full border border-gold-200/60 rounded-md px-4 py-2.5 text-sm font-body"
        />
        <button type="submit" className="btn-primary w-full">
          Send message
        </button>
      </form>
    </section>
  );
}
