import Link from 'next/link';
import { SITE } from '@/lib/site';
import SEOJsonLd from './SEOJsonLd';

type BreadcrumbItem = {
  name: string;
  href?: string;
};

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  // Add home as first item
  const breadcrumbs = [{ name: 'Home', href: '/' }, ...items];
  
  // Generate JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': item.href ? `${SITE.baseUrl}${item.href}` : undefined,
        name: item.name,
      },
    })),
  };

  return (
    <>
      <SEOJsonLd data={jsonLd} />
      <nav aria-label="Breadcrumb" className="mb-4 text-sm">
        <ol className="flex items-center space-x-2">
          {breadcrumbs.map((item, i) => (
            <li key={item.name} className="flex items-center">
              {i > 0 && <span className="mx-2 text-zinc-400">/</span>}
              {item.href && i < breadcrumbs.length - 1 ? (
                <Link 
                  href={item.href}
                  className="text-zinc-600 hover:text-zinc-900 transition-colors"
                >
                  {item.name}
                </Link>
              ) : (
                <span className="text-zinc-900 font-medium">{item.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}