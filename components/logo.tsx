import Link from "next/link"

export default function Logo({ color = "dark" }: { color?: "dark" | "light" }) {
  return (
    <Link href="/" className="relative">
      <div className="h-16 w-auto relative">{/* Logo removed */}</div>
    </Link>
  )
}
