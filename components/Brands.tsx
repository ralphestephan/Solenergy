import Image from "next/image";
import DynamicUnderline from "@/components/ui/DynamicUnderline";

export default function Brands() {
  const items = [
    { name: "Deye", src: "/logos/brands/Deye.png" },
    { name: "Grid", src: "/logos/brands/GRID.jpg" },
    { name: "Huawei", src: "/logos/brands/Huawei.png" },
    { name: "Khonaysse Group", src: "/logos/brands/khonayssegroup.jpg" },
  ];

  return (
    <section id="brands" className="py-16 relative">
      {/* soft background wash with faded edges */}
      <div
        className="absolute inset-0 -z-10 gradient-multi opacity-5"
        style={{
          WebkitMaskImage:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.9) 10%, rgba(0,0,0,.9) 90%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.9) 10%, rgba(0,0,0,.9) 90%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4">
        {/* Enhanced title */}
        <div className="relative mb-10">
          <div className="pointer-events-none absolute -top-10 -left-10 w-40 h-40 rounded-full bg-brand-yellow/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-brand-orange/10 blur-3xl" />

          <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium relative">
            Technology Partners
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight relative">
            <span className="bg-gradient-to-r from-brand-yellow to-brand-orange bg-clip-text text-transparent">
              Brands we partner with
            </span>
          </h2>
          <div className="mt-3">
            <DynamicUnderline watch="#brands" align="left" widthClass="w-20" height={4} />
          </div>
          <p className="mt-2 text-zinc-600 relative">
            Premium solar panels, inverters, batteries, and energy management systems from industry-leading manufacturers. 
            We partner with Deye, Huawei, Grid, and trusted Lebanese suppliers for quality installations.
          </p>
        </div>

        {/* Logos */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center">
          {items.map((i) => (
            <div
              key={i.name}
              className="group p-4 rounded-card bg-white border border-zinc-200 flex items-center justify-center shadow-soft hover:shadow-lg transition"
            >
              <div className="relative w-full h-12 md:h-14 grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition">
                <Image
                  src={i.src}
                  alt={i.name}
                  fill
                  sizes="(min-width:1024px) 180px, (min-width:768px) 33vw, 50vw"
                  className="object-contain"
                  priority={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
