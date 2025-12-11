import Image from "next/image";
import Link from "next/link";

type Props = {
  slug: string;
  title: string;
  description: string;
  image?: string;
  badgeText?: string;
};

// …imports…

export default function SolutionCard({ slug, title, description, image, badgeText }: Props) {
  const chip = badgeText || title;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl
                        bg-white border border-zinc-100 shadow-[0_10px_30px_rgba(0,0,0,0.06)]
                        transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.10)]
                        hover:-translate-y-0.5 min-h-[420px]">
      <div className="pointer-events-none absolute -inset-px rounded-2xl
                      bg-[linear-gradient(145deg,rgba(40,140,255,.18),rgba(0,200,150,.18))]
                      opacity-0 group-hover:opacity-100 transition-opacity z-0" />

      <div className="relative h-48 md:h-56 overflow-hidden z-0">
        <Image
          src={image || "/images/placeholders/solution-default.jpg"}
          alt={`${title} - Smart home automation solution visualization showcasing ${description.split('.')[0].toLowerCase()}`}
          fill
          sizes="(min-width:1024px) 380px, (min-width:640px) 340px, 280px"
          className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/15 to-transparent" />
      </div>

      <div className="absolute left-3 top-3 z-10 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
        <span className="backdrop-blur-md bg-white/60 border border-white/40 text-[11px] px-2.5 py-1 rounded-full font-semibold text-zinc-700">
          {chip}
        </span>
      </div>

      {/* Body */}
      <div className="relative z-10 p-5 sm:p-6 flex flex-col h-full">
        {/* Title gets a min height (~2 lines) so CTAs line up */}
        <Link href={`/solutions/${slug}`} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 rounded">
          <h3 className="text-lg md:text-xl font-extrabold leading-snug tracking-tight
                         min-h-[2.8rem] md:min-h-[3.2rem] flex items-start">
            <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
              {title}
            </span>
          </h3>
        </Link>

        {/* Description clamped to 3 lines with fixed min height */}
        <p className="mt-2 text-sm text-zinc-600 line-clamp-3 min-h-[3.8rem]">
          {description}
        </p>

        {/* CTA pinned bottom-left */}
        <div className="mt-auto pt-3 flex justify-start">
          <Link
            href={`/solutions/${slug}`}
            aria-label={`Open ${title}`}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-4 h-10 text-sm font-semibold hover:border-brand-blue transition-colors"
          >
            Explore
            <span aria-hidden className="translate-x-0 group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
