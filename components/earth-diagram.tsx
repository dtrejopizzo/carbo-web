"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function EarthDiagram() {
  const [stage, setStage] = useState(0)
  const maxStages = 5

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((current) => (current + 1) % maxStages)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full max-w-[500px] h-[500px]">
      {/* Base diagram */}
      <Image
        src="/images/drilling-diagram-base.png"
        alt="Drilling diagram"
        width={500}
        height={500}
        className="w-full"
      />

      {/* Gyrotron */}
      {stage >= 1 && (
        <div className="absolute top-[100px] right-[100px]">
          <div className="text-xs text-quaise-teal-darkest mb-2">GYROTRON</div>
          <Image src="/images/gyrotron.png" alt="Gyrotron" width={150} height={200} className="w-full" />
        </div>
      )}

      {/* Drilling details */}
      {stage >= 2 && (
        <div className="absolute top-[160px] right-[50px] w-[200px]">
          <div className="text-xs text-quaise-teal-darkest mb-2">PURGE GAS</div>
          <div className="text-xs text-quaise-teal-darkest mt-8 mb-2">WAVEGUIDE</div>
          <div className="text-xs text-quaise-teal-darkest mt-8 mb-2">MILLIMETER WAVES</div>
          <div className="text-xs text-quaise-teal-darkest mt-8 mb-2">VITRIFIED BOREHOLE</div>
        </div>
      )}

      {/* Battery cross-section with labels */}
      {stage >= 3 && (
        <div className="absolute bottom-0 left-0 w-full">
          <Image
            src="/images/battery-cross-section.png"
            alt="Battery system cross-section"
            width={500}
            height={300}
            className="w-full"
          />
        </div>
      )}

      {/* Temperature indicators */}
      {stage >= 4 && (
        <>
          <div className="absolute top-[180px] left-[100px] bg-quaise-teal-dark text-white text-xs px-2 py-1 rounded">
            Crust <span className="ml-2">65 km</span> <span className="ml-2">0-1000°C</span>
          </div>
          <div className="absolute top-[250px] left-[120px] bg-quaise-teal-dark text-white text-xs px-2 py-1 rounded">
            Mantle <span className="ml-2">2885 km</span> <span className="ml-2">2000°C</span>
          </div>
          <div className="absolute top-[320px] left-[140px] bg-quaise-teal-dark text-white text-xs px-2 py-1 rounded">
            Core <span className="ml-2">3480 km</span> <span className="ml-2">7000°C</span>
          </div>
        </>
      )}
    </div>
  )
}
