"use client"
import Image from "next/image"

export default function HeroSlider() {
  return (
    <div className="w-full h-[500px] relative overflow-hidden">
      <Image
        src="/images/renewable-energy-storage.png"
        alt="Renewable energy storage system with solar panels and wind turbines at sunset"
        fill
        className="object-cover w-full h-full"
        style={{ objectPosition: "center" }}
        priority
      />
    </div>
  )
}
