import Link from 'next/link';
import { Metadata } from 'next';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-zinc-600 mb-8 text-center">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <div className="space-x-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition-colors"
        >
          Return Home
        </Link>
        <Link
          href="/solutions"
          className="inline-flex items-center justify-center rounded-full border border-zinc-900 px-5 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 transition-colors"
        >
          Browse Solutions
        </Link>
      </div>
    </div>
  )
}