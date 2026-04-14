import Image from "next/image"
import Link from "next/link"

export default function CarboOS() {
  return (
    <main className="min-h-screen bg-[#eeeeee] text-[#444]">
      {/* Header */}
      <nav className="border-b border-[#d0d0d0] bg-[#eeeeee]/90 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex justify-between items-center">
          <Link href="/" className="font-mono text-lg tracking-wider text-[#037971] hover:opacity-80 transition-opacity">
            CARBO<span className="text-[#444]">.</span>ENERGY
          </Link>
          <div className="flex items-center gap-8 font-mono text-xs tracking-widest uppercase">
            <Link href="/carbo-os" className="text-[#037971]">Carbo OS</Link>
            <Link href="/login" className="text-[#888] hover:text-[#037971] transition-colors">Log In</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-[1400px] mx-auto px-6 pt-20 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-[#037971] mb-6">Software Platform</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mb-8 text-[#222]">
              Carbo OS
            </h1>
            <p className="text-lg text-[#888] mb-8 leading-relaxed max-w-lg">
              An AI-driven battery management system that co-optimizes storage performance,
              energy arbitrage, and grid services for maximum return on every kilowatt-hour.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="mailto:dt@carbo.energy"
                className="inline-flex items-center gap-2 bg-[#037971] text-white px-6 py-3 font-mono text-sm tracking-wider hover:bg-[#023436] transition-colors"
              >
                REQUEST DEMO
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" strokeWidth="1.5"/></svg>
              </Link>
            </div>
          </div>
          <div className="relative h-[400px] w-full">
            <Image
              src="/images/carbo-os-dashboard.png"
              alt="Carbo OS Dashboard showing energy management interface"
              fill
              className="object-cover object-left border border-[#d0d0d0]"
            />
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-[#e8e8e8] py-24 border-t border-[#d0d0d0]">
        <div className="max-w-[1400px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#222] mb-16 text-center">
            Intelligent Energy Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#d0d0d0]">
            {[
              {
                icon: (<svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="#037971" strokeWidth="1.5"><path d="M20 4v32M28 10H14a6 6 0 000 12h12a6 6 0 010 12H10" /></svg>),
                title: "Energy Arbitrage",
                desc: "Automatically buy and store energy when prices are low, discharge when prices are high. Maximizes return on every storage cycle."
              },
              {
                icon: (<svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="#037971" strokeWidth="1.5"><circle cx="20" cy="20" r="14" /><path d="M20 10v10l7 7" /></svg>),
                title: "Grid Services",
                desc: "Participate in demand response programs and ancillary services to generate additional revenue while supporting grid stability."
              },
              {
                icon: (<svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="#037971" strokeWidth="1.5"><path d="M4 30l8-12 6 6 8-16 10 14" /><line x1="4" y1="36" x2="36" y2="36" /></svg>),
                title: "Predictive Analytics",
                desc: "AI-powered forecasting predicts energy demand, renewable generation, and market prices to optimize your storage strategy."
              }
            ].map((item) => (
              <div key={item.title} className="bg-[#eeeeee] p-10 group hover:bg-[#e6e6e6] transition-colors">
                <div className="opacity-40 group-hover:opacity-80 transition-opacity mb-6">{item.icon}</div>
                <h3 className="font-mono text-lg mb-4 text-[#333]">{item.title}</h3>
                <p className="text-sm text-[#888] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-[1400px] mx-auto px-6 py-28">
        <h2 className="text-3xl md:text-4xl font-bold text-[#222] mb-16">
          How Carbo OS Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            {[
              { title: "Intelligent Monitoring", desc: "Continuously monitors battery health, performance, and efficiency with real-time insights and alerts to maximize system longevity." },
              { title: "Adaptive Control", desc: "Optimizes charging and discharging cycles based on usage patterns, energy prices, and grid conditions using reinforcement learning." },
              { title: "Seamless Integration", desc: "Integrates with existing energy management systems, renewable generation, and grid infrastructure through standard APIs and protocols." }
            ].map((item) => (
              <div key={item.title} className="border-l-2 border-[#037971]/30 pl-6 mb-10 last:mb-0">
                <h3 className="font-mono text-base mb-3 text-[#333]">{item.title}</h3>
                <p className="text-sm text-[#888] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="relative h-[400px]">
            <Image
              src="/images/carbo-os-performance.png"
              alt="Carbo OS Performance dashboard"
              fill
              className="object-cover object-left border border-[#d0d0d0]"
            />
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="bg-[#e8e8e8] py-24 border-t border-[#d0d0d0]">
        <div className="max-w-[1400px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#222] mb-16">
            Technical Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[#d0d0d0]">
            <div className="bg-[#eeeeee] p-10">
              <h3 className="font-mono text-base mb-6 text-[#333] border-b-2 border-[#037971] pb-4">
                Software Features
              </h3>
              <ul className="space-y-3">
                {[
                  "Real-time monitoring and control",
                  "Machine learning optimization algorithms",
                  "Predictive maintenance and diagnostics",
                  "Energy market integration and trading",
                  "Customizable reporting and analytics"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#888]">
                    <span className="text-[#037971] mt-0.5">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#eeeeee] p-10">
              <h3 className="font-mono text-base mb-6 text-[#333] border-b-2 border-[#037971] pb-4">
                Integration Capabilities
              </h3>
              <ul className="space-y-3">
                {[
                  "RESTful API for third-party integration",
                  "SCADA and BMS compatibility",
                  "Grid operator communication protocols",
                  "Weather data and forecasting services",
                  "Energy market data feeds"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#888]">
                    <span className="text-[#037971] mt-0.5">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#023436] py-24">
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to optimize your energy storage?
          </h2>
          <p className="text-lg text-[#88b8b5] max-w-2xl mx-auto mb-10 font-light">
            Join the growing network of energy providers and businesses using Carbo OS
            to maximize the value of their storage assets.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="mailto:sales@carbo.energy"
              className="inline-flex items-center gap-2 bg-[#00FFB2] text-[#023436] px-8 py-4 font-mono text-sm tracking-wider hover:bg-[#00e6a0] transition-colors"
            >
              CONTACT SALES
            </Link>
            <Link
              href="mailto:dt@carbo.energy"
              className="inline-flex items-center gap-2 border border-[#00FFB2]/40 text-white px-8 py-4 font-mono text-sm tracking-wider hover:border-[#00FFB2] transition-colors"
            >
              SCHEDULE DEMO
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#d0d0d0] bg-[#e4e4e4]">
        <div className="max-w-[1400px] mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link href="/" className="font-mono text-sm tracking-wider text-[#037971] hover:opacity-80 transition-opacity">
              CARBO<span className="text-[#444]">.</span>ENERGY
            </Link>
            <div className="font-mono text-xs text-[#bbb]">
              © {new Date().getFullYear()} Carbo Energy Storage. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
