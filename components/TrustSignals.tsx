// components/TrustSignals.tsx
import { ShieldCheck, Clock, Headset, Wrench } from "lucide-react";

export default function TrustSignals() {
  const items = [
    { title: "Secure & Private",  body: "Local-first where possible, with privacy-respecting defaults.", icon: ShieldCheck },
    { title: "Fast Turnaround",   body: "Typical installs completed within days.",                        icon: Clock },
    { title: "Priority Support",  body: "Care plans with proactive check-ups.",                           icon: Headset },
    { title: "Warranty",          body: "Hassle-free replacements on covered hardware.",                  icon: Wrench },
  ];

  return (
    <section className="pt-16">
      {/* Mobile: horizontal scroll, Desktop: 4-col grid */}
      <div className="
        md:hidden -mx-4 px-4 flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar
      ">
        {items.map(({ title, body, icon: Icon }) => (
          <article
            key={title}
            className="min-w-[260px] snap-start p-5  flex flex-col items-start"
          >
            <div className="w-12 h-12 rounded-2xl  inline-grid place-items-center mb-2">
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold">{title}</h3>
            <p className="text-zinc-600 mt-1">{body}</p>
          </article>
        ))}
      </div>

      <div className="hidden md:grid mx-auto max-w-6xl px-4 grid-cols-4 gap-6 items-stretch">
        {items.map(({ title, body, icon: Icon }) => (
          <article
            key={title}
            className="h-full p-6 text-center flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-2xl  flex items-center justify-center mb-3">
              <Icon className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-zinc-600 mt-1 max-w-[32ch]">{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
