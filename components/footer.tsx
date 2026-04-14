import Link from "next/link"
import NewsletterSignup from "./newsletter-signup"
import Logo from "@/components/logo"

export default function Footer() {
  return (
    <footer className="bg-[#023436] text-white">
      <div className="max-w-[1440px] mx-auto">
        {/* Rock texture divider */}
        <div className="w-full h-12 bg-[url('/images/rock-texture.jpg')] bg-cover"></div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 p-12">
          <div>
            <NewsletterSignup />

            <div className="mt-16">
              <p className="mb-4">
                Want to join us in building the future of energy storage that the world needs? Let's get in touch and
                shape tomorrow's sustainable energy solutions together.
              </p>

              <div className="grid grid-cols-2 gap-8 mt-8">
                <div>
                  <div className="text-sm font-medium mb-2">JOBS</div>
                  <Link href="mailto:jobs@carbo.energy" className="text-white hover:underline">
                    jobs@carbo.energy
                  </Link>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">PRESS</div>
                  <Link href="mailto:info@carbo.energy" className="text-white hover:underline">
                    info@carbo.energy
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="border-b border-quaise-teal-dark py-6">
              <Link href="/carbo-os" className="text-white text-2xl hover:underline">
                Carbo OS
              </Link>
            </div>
            <div className="mt-auto pt-12">
              <div className="invert brightness-200">
                <Logo color="dark" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="px-12 py-6 flex flex-col md:flex-row justify-between items-start md:items-center border-t border-quaise-teal-dark">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-4 md:mb-0">
            <span>© Carbo Energy Storage 2025</span>
          </div>
          <div className="flex gap-4">
            <Link href="https://www.linkedin.com/company/carbo-energy/" className="text-white hover:underline">
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
