import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  return (
    <div className="w-full min-h-screen bg-[#eeeeee] flex">
      {/* Login form */}
      <div className="flex items-center justify-center py-12 w-full lg:w-1/2">
        <div className="mx-auto grid w-[380px] gap-8 px-6">
          <div className="grid gap-4">
            <Link href="/" className="font-mono text-lg tracking-wider text-[#037971] hover:opacity-80 transition-opacity mb-2">
              CARBO<span className="text-[#444]">.</span>ENERGY
            </Link>
            <h1 className="text-3xl font-bold text-[#222]">Log in</h1>
            <p className="text-sm text-[#888]">Access your Carbo OS dashboard</p>
          </div>
          <div className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-[#444] font-mono text-xs tracking-wider">
                EMAIL
              </Label>
              <Input
                id="email"
                type="email"
                required
                className="border-[#d0d0d0] bg-[#e8e8e8] text-[#444] focus:border-[#037971] focus:ring-[#037971] placeholder:text-[#bbb]"
                placeholder="you@company.com"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-[#444] font-mono text-xs tracking-wider">
                  PASSWORD
                </Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-xs text-[#037971] hover:text-[#023436] font-mono"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                className="border-[#d0d0d0] bg-[#e8e8e8] text-[#444] focus:border-[#037971] focus:ring-[#037971]"
              />
            </div>
            <Button type="submit" className="w-full bg-[#037971] hover:bg-[#023436] text-white font-mono text-sm tracking-wider py-5">
              LOG IN
            </Button>
          </div>
          <div className="text-center">
            <Link href="/" className="text-xs text-[#aaa] hover:text-[#037971] font-mono transition-colors">
              ← Back to site
            </Link>
          </div>
        </div>
      </div>

      {/* Right panel — branded */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#023436] items-center justify-center p-16">
        <div className="max-w-md text-center">
          <div className="font-mono text-2xl tracking-wider text-[#00FFB2] mb-6">
            CARBO<span className="text-white">.</span>OS
          </div>
          <p className="text-[#88b8b5] text-lg font-light leading-relaxed mb-8">
            AI-driven battery management for grid-scale energy storage.
            Monitor, optimize, and maximize your return on every kilowatt-hour.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { val: "6 MW", label: "CAPACITY" },
              { val: "99.7%", label: "UPTIME" },
              { val: "24/7", label: "MONITORING" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-mono text-xl text-[#00FFB2]">{s.val}</div>
                <div className="font-mono text-[9px] text-[#88b8b5] tracking-wider mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
