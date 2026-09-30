import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-canvas text-text-primary px-4 text-center">
      <h1 className="text-4xl font-extrabold text-accent-sky mb-2">404</h1>
      <h2 className="text-xl font-bold mb-4">Page Not Found</h2>
      <p className="text-text-secondary text-sm max-w-md mb-6">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex h-9 items-center justify-center rounded-lg bg-accent-sky px-4 text-xs font-semibold text-white transition-opacity hover:opacity-90"
      >
        Return Home
      </Link>
    </div>
  );
}
