import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Solenergy collects, uses and protects your information, which cookies and analytics tools run only with your consent, and how to exercise your privacy rights.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const updated = "September 17, 2026";

  const toc = [
    ["Overview", "overview"],
    ["Information We Collect", "info-we-collect"],
    ["How We Use Information", "how-we-use"],
    ["Sharing & Disclosure", "sharing"],
    ["Data Security", "security"],
    ["Your Rights", "rights"],
    ["Cookies & Analytics", "cookies"],
    ["Children's Privacy", "children"],
    ["Changes to Policy", "changes"],
    ["Contact Us", "contact"],
  ] as const;

  return (
    <main className="w-full overflow-x-clip">
      {/* HERO (no image) */}
      <section className="mt-10 mb-12 relative">
        <div className="absolute inset-0 -z-10 gradient-multi opacity-5" />
        <div className="mx-auto max-w-6xl px-4 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
            Legal
          </span>
          <h1 className="mt-2 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-brand-yellow to-brand-orange bg-clip-text text-transparent">
              Privacy Policy
            </span>
          </h1>
          <p className="mt-3 text-zinc-700 max-w-2xl mx-auto">
            How Solenergy ("we", "us", "our") collects, uses, and protects your information across
            solar energy solutions, generator installations, and energy consultations.
          </p>
          <span className="mt-2 block text-xs text-zinc-500">Last updated: {updated}</span>
          <span className="mt-4 mx-auto block h-1 w-20 rounded-full bg-gradient-to-r from-brand-yellow to-brand-orange" />
        </div>
      </section>

      {/* BODY */}
      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* TOC */}
          <aside className="space-y-4 lg:sticky lg:top-20 h-fit">
            <nav className="p-5 rounded-card bg-white border border-zinc-100 shadow-soft">
              <h2 className="text-sm font-semibold mb-3">On this page</h2>
              <ul className="space-y-2 text-sm">
                {toc.map(([label, id]) => (
                  <li key={id}>
                    <a href={`#${id}`} className="text-zinc-700 hover:text-brand-yellow">{label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* CONTENT */}
          <div className="lg:col-span-3 space-y-6">
            <section id="overview" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-2">Overview</h2>
              <p className="text-zinc-700">
                This Privacy Policy applies to <strong>solenergy.com</strong>, our consultation services, and solar/generator
                installation projects. By using our website or services, you agree to this Policy.
              </p>
              <p className="text-zinc-700 mt-2">
                We respect your privacy and do <strong>not sell</strong> your personal information. We collect only what is
                necessary to provide energy solutions and maintain customer relationships.
              </p>
            </section>

            <section id="info-we-collect" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <div className="space-y-3 text-zinc-700">
                <p className="font-semibold">Information you provide</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Contact details: name, email, phone number, address (forms, consultations, quotes).</li>
                  <li>Property information: location, electrical specifications, energy consumption data.</li>
                  <li>Project requirements: solar system sizing, generator specifications, installation preferences.</li>
                  <li>Billing and payment information for services rendered.</li>
                </ul>
                <p className="font-semibold mt-4">Information collected automatically</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Device information, browser type, IP address, pages visited.</li>
                  <li>Usage patterns on our website to improve user experience.</li>
                  <li>Location data (approximate) for service area verification.</li>
                </ul>
                <p className="font-semibold mt-4">Information from partners</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Equipment suppliers and manufacturers for warranty and technical support.</li>
                  <li>Installation partners and electrical contractors working on your project.</li>
                  <li>Utility companies when necessary for grid integration and net metering.</li>
                </ul>
              </div>
            </section>

            <section id="how-we-use" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">How We Use Information</h2>
              <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                <li>Design and deliver solar energy systems and generator installations tailored to your needs.</li>
                <li>Provide quotes, consultations, and energy audits for your property.</li>
                <li>Schedule installations, maintenance, and technical support visits.</li>
                <li>Process payments and manage billing for services and equipment.</li>
                <li>Communicate project updates, warranty information, and energy-saving tips.</li>
                <li>Improve our services, website, and customer experience.</li>
                <li>Comply with legal obligations and industry regulations.</li>
              </ul>
            </section>

            <section id="sharing" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">Sharing & Disclosure</h2>
              <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                <li>Trusted installation partners and electrical contractors for project execution.</li>
                <li>Equipment manufacturers for warranty claims and technical support.</li>
                <li>Payment processors for billing and transactions.</li>
                <li>Legal authorities when required by law or to protect our rights.</li>
                <li>Service providers for website hosting, email communications, and analytics.</li>
              </ul>
              <p className="text-zinc-700 mt-3">
                We ensure all partners maintain appropriate security and confidentiality standards.
              </p>
            </section>

            <section id="security" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <p className="text-zinc-700">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-zinc-700 mt-2">
                <li>Encrypted data transmission (SSL/TLS) for all online communications.</li>
                <li>Secure storage systems with restricted access controls.</li>
                <li>Regular security audits and updates to our systems.</li>
                <li>Staff training on data protection and privacy best practices.</li>
              </ul>
              <p className="text-zinc-700 mt-3">
                While no method is 100% secure, we continuously work to protect your data.
              </p>
            </section>

            <section id="rights" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <p className="text-zinc-700">You have the right to:</p>
              <ul className="list-disc pl-5 space-y-1 text-zinc-700 mt-2">
                <li>Access the personal information we hold about you.</li>
                <li>Request correction of inaccurate or incomplete information.</li>
                <li>Request deletion of your data (subject to legal retention requirements).</li>
                <li>Opt out of marketing communications at any time.</li>
                <li>Object to certain data processing activities.</li>
              </ul>
              <p className="text-zinc-700 mt-3">
                To exercise these rights, contact us at{" "}
                <a className="text-brand-yellow font-semibold" href="mailto:info@solenergypower.com">
                  info@solenergypower.com
                </a>{" "}
                or call{" "}
                <a className="text-brand-yellow font-semibold" href="tel:+96171654956">
                  +961 71 654 956
                </a>.
              </p>
            </section>

            <section id="cookies" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">Cookies & Analytics</h2>
              <p className="text-zinc-700">
                When you first visit, a cookie banner asks for your choice. <strong>Accept all</strong> and{" "}
                <strong>Reject all</strong> are equally easy, and <strong>Manage preferences</strong> lets you switch
                each optional category on or off. Nothing optional runs until you choose, and if you reject, it never
                runs. We use three categories:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-700 mt-3">
                <li>
                  <strong>Necessary</strong> (always on): what the site needs to work and stay secure, such as sending
                  the contact and newsletter forms and remembering your cookie choice, which is stored in your
                  browser&apos;s local storage.
                </li>
                <li>
                  <strong>Analytics</strong> (off until you allow it): Google Analytics 4, to understand which pages
                  are visited and how the site is used. Google&apos;s script is not loaded at all without this
                  consent, and even with it, Google&apos;s advertising features stay switched off.
                </li>
                <li>
                  <strong>Advertising</strong> (off until you allow it): the Meta Pixel, to measure the results of our
                  Facebook and Instagram ads. Meta&apos;s script is not loaded without this consent. If your browser
                  sends a Global Privacy Control signal, Advertising stays off.
                </li>
              </ul>
              <p className="text-zinc-700 mt-3">
                You can change or withdraw your choice at any time with <strong>Cookie preferences</strong> at the
                bottom of every page. You can also clear cookies and site data in your browser settings, which
                brings the banner back on your next visit.
              </p>
            </section>

            <section id="children" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
              <p className="text-zinc-700">
                Our services are not directed to individuals under 18 years of age. We do not knowingly collect
                personal information from children.
              </p>
            </section>

            <section id="changes" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
              <p className="text-zinc-700">
                We may update this Privacy Policy periodically. Material changes will be posted on this page
                with an updated "Last updated" date. Continued use of our services constitutes acceptance
                of the updated policy.
              </p>
            </section>

            <section id="contact" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
              <p className="text-zinc-700">
                For privacy-related questions or concerns, please contact us:
              </p>
              <div className="mt-3 text-zinc-700 space-y-1">
                <p>
                  Email:{" "}
                  <a className="text-brand-yellow font-semibold" href="mailto:info@solenergypower.com">
                    info@solenergypower.com
                  </a>
                </p>
                <p>
                  Phone:{" "}
                  <a className="text-brand-yellow font-semibold" href="tel:+96171654956">
                    +961 71 654 956
                  </a>
                </p>
                <p>WhatsApp: <a className="text-brand-yellow font-semibold" href="https://wa.me/96171654956" target="_blank" rel="noreferrer">
                    +961 71 654 956
                  </a>
                </p>
                <p><strong>LB:</strong> Galaxy Mall, Baabda, Mount Lebanon<br /><strong>QR:</strong> Doha, Qatar</p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
