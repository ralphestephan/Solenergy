import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service — Solenergy" };

export default function TermsPage() {
  const effective = "January 15, 2025";

  const toc = [
    ["Overview", "overview"],
    ["Services Offered", "services"],
    ["Quotes & Pricing", "pricing"],
    ["Installation Process", "installation"],
    ["Customer Responsibilities", "customer"],
    ["Warranties", "warranties"],
    ["Maintenance & Support", "maintenance"],
    ["Payment Terms", "payment"],
    ["Limitation of Liability", "liability"],
    ["Force Majeure", "force-majeure"],
    ["Termination", "termination"],
    ["Governing Law", "law"],
    ["Changes to Terms", "changes"],
    ["Contact", "contact"],
  ] as const;

  return (
    <main className="w-full overflow-x-clip">
      {/* HERO */}
      <section className="mt-10 mb-12 relative">
        <div className="absolute inset-0 -z-10 gradient-multi opacity-5" />
        <div className="mx-auto max-w-6xl px-4 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
            Legal
          </span>
          <h1 className="mt-2 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-brand-yellow to-brand-orange bg-clip-text text-transparent">
              Terms of Service
            </span>
          </h1>
          <p className="mt-3 text-zinc-700 max-w-2xl mx-auto">
            The terms governing Solenergy&apos;s solar energy and generator installation services.
          </p>
          <span className="mt-2 block text-xs text-zinc-500">Effective: {effective}</span>
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
                    <a href={`#${id}`} className="text-zinc-700 hover:text-brand-yellow">
                      {label}
                    </a>
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
                These Terms of Service form a binding agreement between you (the "Customer") and Solenergy SARL ("we", "us", "our", "Solenergy").
                By engaging our services, you agree to these terms. Written project agreements or quotations may contain additional specific terms.
              </p>
            </section>

            <section id="services" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-2">Services Offered</h2>
              <p className="text-zinc-700 mb-3">Solenergy provides:</p>
              <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                <li>Solar photovoltaic (PV) system design, supply, and installation</li>
                <li>Backup generator sales, installation, and integration</li>
                <li>Energy storage solutions (battery systems)</li>
                <li>Hybrid renewable energy systems</li>
                <li>Energy consultations and site assessments</li>
                <li>System monitoring and maintenance services</li>
                <li>Grid connection and net metering assistance</li>
              </ul>
            </section>

            <section id="pricing" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-2">Quotes & Pricing</h2>
              <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                <li>All quotes are valid for 30 days from the date of issue unless otherwise stated.</li>
                <li>Prices are subject to change based on equipment availability, currency fluctuations, and scope changes.</li>
                <li>Final pricing will be confirmed in a written agreement before project commencement.</li>
                <li>Quotes include equipment, installation labor, and standard materials unless specified otherwise.</li>
                <li>Permits, utility connection fees, and structural modifications may incur additional costs.</li>
              </ul>
            </section>

            <section id="installation" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-2">Installation Process</h2>
              <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                <li>Installation timelines are estimates and may vary due to weather, permits, or equipment availability.</li>
                <li>Site preparation (roof repairs, electrical upgrades) must be completed before installation begins.</li>
                <li>We will coordinate with utility companies for necessary approvals and grid connections.</li>
                <li>Installation includes equipment mounting, electrical wiring, system testing, and commissioning.</li>
                <li>A final inspection and handover will be conducted upon completion.</li>
              </ul>
            </section>

            <section id="customer" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-2">Customer Responsibilities</h2>
              <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                <li>Provide safe and clear access to the installation site during working hours.</li>
                <li>Ensure the property structure can safely support the solar panels (provide structural reports if requested).</li>
                <li>Obtain necessary building permits and approvals where customer responsibility is indicated.</li>
                <li>Provide accurate information about energy consumption and electrical systems.</li>
                <li>Maintain adequate insurance coverage for the property.</li>
                <li>Inform Solenergy of any changes to property ownership or electrical systems.</li>
              </ul>
            </section>

            <section id="warranties" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">Warranties</h2>
              <div className="space-y-3 text-zinc-700">
                <div>
                  <p className="font-semibold">Workmanship Warranty</p>
                  <p>Solenergy provides a 2-year warranty on installation workmanship covering labor and installation defects.</p>
                </div>
                <div>
                  <p className="font-semibold">Equipment Warranties</p>
                  <p>Solar panels, inverters, and batteries come with manufacturer warranties (typically 10-25 years for panels, 5-10 years for inverters).
                  Warranty terms vary by manufacturer and will be specified in your agreement.</p>
                </div>
                <div>
                  <p className="font-semibold">Generator Warranties</p>
                  <p>Generators are covered by manufacturer warranties ranging from 1-5 years depending on the model.</p>
                </div>
                <div>
                  <p className="font-semibold">Exclusions</p>
                  <p>Warranties do not cover damage from misuse, unauthorized modifications, natural disasters, theft, or vandalism.</p>
                </div>
              </div>
            </section>

            <section id="maintenance" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-2">Maintenance & Support</h2>
              <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                <li>Regular maintenance is recommended to ensure optimal system performance.</li>
                <li>Annual maintenance packages are available for solar systems and generators.</li>
                <li>Emergency support is available during business hours: +961 71 654 956</li>
                <li>We provide system monitoring services to track energy production and detect issues.</li>
                <li>Cleaning, inspections, and component replacements are offered as needed.</li>
              </ul>
            </section>

            <section id="payment" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-2">Payment Terms</h2>
              <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                <li>Standard payment schedule: 40% deposit, 50% upon installation completion, 10% after final inspection.</li>
                <li>Deposits are non-refundable after equipment has been ordered.</li>
                <li>Payments accepted via bank transfer, cash, or approved financing partners.</li>
                <li>Late payments may incur interest charges of 1.5% per month.</li>
                <li>Financing options may be available through our partner institutions.</li>
              </ul>
            </section>

            <section id="liability" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-2">Limitation of Liability</h2>
              <p className="text-zinc-700">
                Solenergy&apos;s liability is limited to the total amount paid for the specific service or installation.
                We are not liable for indirect, consequential, or incidental damages including lost profits, energy savings
                estimates not met, or utility rate changes. Energy production estimates are based on average conditions and
                may vary due to weather, shading, system orientation, and maintenance.
              </p>
            </section>

            <section id="force-majeure" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-2">Force Majeure</h2>
              <p className="text-zinc-700">
                Neither party shall be liable for delays or failures in performance resulting from circumstances beyond
                reasonable control, including but not limited to: natural disasters, war, civil unrest, strikes, pandemics,
                government actions, supply chain disruptions, or utility company delays.
              </p>
            </section>

            <section id="termination" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-2">Termination</h2>
              <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                <li>Either party may terminate the agreement in writing if the other party breaches material terms.</li>
                <li>Customers cancelling after deposit may forfeit the deposit if equipment has been ordered.</li>
                <li>Work completed up to termination date will be billed at standard rates.</li>
                <li>Warranty obligations continue for completed work even after termination.</li>
              </ul>
            </section>

            <section id="law" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-2">Governing Law</h2>
              <p className="text-zinc-700">
                These Terms are governed by the laws of Lebanon. Any disputes shall be resolved in the courts of Lebanon
                or through mediation as mutually agreed. Both parties agree to good-faith negotiation before pursuing litigation.
              </p>
            </section>

            <section id="changes" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-2">Changes to Terms</h2>
              <p className="text-zinc-700">
                Solenergy reserves the right to update these Terms. Updated terms will be posted on our website with a new
                effective date. Existing project agreements will be governed by the terms in effect at the time of signing.
              </p>
            </section>

            <section id="contact" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-2">Contact</h2>
              <p className="text-zinc-700 mb-3">
                For questions about these Terms or our services:
              </p>
              <div className="text-zinc-700 space-y-1">
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
                <p>
                  WhatsApp:{" "}
                  <a className="text-brand-yellow font-semibold" href="https://wa.me/96171654956" target="_blank" rel="noreferrer">
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
