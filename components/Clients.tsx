"use client";

import Image from "next/image";

const clients = [
  { name: "Aya Hotel", logo: "/logos/clients/ayaHotel.png" },
  { name: "Beba Bel", logo: "/logos/clients/bebabel.png" },
  { name: "Café Younes", logo: "/logos/clients/cafeYounes.png" },
  { name: "Canaille", logo: "/logos/clients/canaille.jpg" },
  { name: "Cappitano", logo: "/logos/clients/cappitano.jpg" },
  { name: "Cezanne", logo: "/logos/clients/cezanne.jpg" },
  { name: "Chop Suey", logo: "/logos/clients/chopSouey.jpg" },
  { name: "Cinemoz", logo: "/logos/clients/cinemoz.jpg" },
  { name: "Coin Market", logo: "/logos/clients/coinMarket.jpg" },
  { name: "Couqley", logo: "/logos/clients/couqley.jpg" },
  { name: "Cremonado", logo: "/logos/clients/cremonado.jpg" },
  { name: "Dominos", logo: "/logos/clients/dominos.png" },
  { name: "Douaihy", logo: "/logos/clients/douaihy.png" },
  { name: "Galaxy", logo: "/logos/clients/galaxy.png" },
  { name: "Gelato Show", logo: "/logos/clients/GelatoShow.jpg" },
  { name: "Ground 7", logo: "/logos/clients/ground7.png" },
  { name: "GS", logo: "/logos/clients/gs.png" },
  { name: "Ice Cream Factory", logo: "/logos/clients/IceCreamFactory.png" },
  { name: "Latte Art", logo: "/logos/clients/latteArt.jpg" },
  { name: "Le Noir", logo: "/logos/clients/leNoir.jpg" },
  { name: "Nawal", logo: "/logos/clients/nawal.jpg" },
  { name: "Outpost", logo: "/logos/clients/outpost.png" },
  { name: "Qatch", logo: "/logos/clients/qatch.png" },
  { name: "Radio Lebanon", logo: "/logos/clients/radioLebanon.png" },
  { name: "Société Jabra", logo: "/logos/clients/societejabra.jpg" },
  { name: "Starbucks", logo: "/logos/clients/starbucks.png" },
  { name: "Sud", logo: "/logos/clients/sud.jpg" },
  { name: "Surgel", logo: "/logos/clients/Surgel.png" },
];

export default function Clients() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-zinc-50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand-yellow/10 text-xs font-medium text-brand-yellow">
            Trusted Partners
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-brand-yellow to-brand-orange bg-clip-text text-transparent">
              Our Clients
            </span>
          </h2>
          <p className="mt-4 text-zinc-600 max-w-2xl mx-auto">
            Trusted by leading organizations across industries for reliable energy solutions
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden group">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* CSS Animated Scrolling Track - Smooth infinite loop with 3 sets for seamless animation */}
          <div className="flex clients-scroll group-hover:[animation-play-state:paused]">
            {/* First set of logos */}
            <div className="flex gap-12 shrink-0 py-8 clients-set">
              {clients.map((client) => (
                <div
                  key={client.name}
                  className="flex-shrink-0 w-40 h-24 flex items-center justify-center transition-all duration-300 opacity-100 hover:scale-110"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* Second set for seamless loop */}
            <div className="flex gap-12 shrink-0 py-8 clients-set">
              {clients.map((client) => (
                <div
                  key={`dup-${client.name}`}
                  className="flex-shrink-0 w-40 h-24 flex items-center justify-center transition-all duration-300 opacity-100 hover:scale-110"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* Third set for truly seamless loop */}
            <div className="flex gap-12 shrink-0 py-8 clients-set">
              {clients.map((client) => (
                <div
                  key={`dup2-${client.name}`}
                  className="flex-shrink-0 w-40 h-24 flex items-center justify-center transition-all duration-300 opacity-100 hover:scale-110"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
