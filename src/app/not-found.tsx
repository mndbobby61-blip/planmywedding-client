import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page py-24 text-center">
      <p className="font-display text-3xl text-plum-700 mb-3">Page not found</p>
      <p className="font-body text-sm text-charcoal/60 mb-6">
        The page you are looking for does not exist or has moved.
      </p>
      <Link href="/" className="btn-primary">
        Back to home
      </Link>
    </section>
  );
}
