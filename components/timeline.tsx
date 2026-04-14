"use client"

import { useState, useEffect, useRef } from "react"
import { Progress } from "@/components/ui/progress"

export default function Timeline() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeYear, setActiveYear] = useState("2026")
  const timelineRef = useRef<HTMLDivElement>(null)

  const timelineData = {
    "2026": {
      title: "First commercial-scale project launched reusing existing infrastructure.",
      subtitle: "Grid-scale installations reach 1 MW+ with modular architecture.",
    },
    "2028": {
      title: "10,000+ homes and buildings powered by long-duration Carbo batteries.",
      subtitle: "Electrolyte refill logistics system operational across 3 continents.",
    },
    "2030": {
      title: "Carbo technology becomes a standard for long-term residential and industrial energy storage.",
      subtitle: "Over 1 TWh of cumulative clean storage deployed globally.",
    },
  }

  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const elementTop = rect.top
        const elementHeight = rect.height

        // Calculate progress based on element visibility
        const progress = Math.max(
          0,
          Math.min(100, ((windowHeight - elementTop) / (windowHeight + elementHeight)) * 100),
        )
        setScrollProgress(progress)

        // Update active year based on progress
        const years = Object.keys(timelineData)
        if (progress < 33) {
          setActiveYear(years[0])
        } else if (progress < 66) {
          setActiveYear(years[1])
        } else {
          setActiveYear(years[2])
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial call

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="w-full" ref={timelineRef}>
      <div className="text-quaise-teal-darkest font-medium mb-8">Timeline</div>
      <div className="relative">
        <div className="relative mb-16">
          {/* Progress bar */}
          <Progress value={scrollProgress} className="w-full h-2 bg-quaise-teal-light/30" />

          {/* Year markers without circles */}
          <div className="flex justify-between mt-8">
            {Object.keys(timelineData).map((year) => (
              <div key={year} className="flex flex-col items-center">
                <div className="mt-8">
                  <h3
                    className={`text-4xl font-normal mb-4 transition-colors duration-300 ${
                      activeYear === year ? "text-quaise-teal" : "text-quaise-teal-darkest"
                    }`}
                  >
                    {year}
                  </h3>
                  <p
                    className={`max-w-xs mb-2 transition-opacity duration-300 ${
                      activeYear === year
                        ? "text-quaise-teal-darkest opacity-100"
                        : "text-quaise-teal-darkest opacity-70"
                    }`}
                  >
                    {timelineData[year].title}
                  </p>
                  <p
                    className={`max-w-xs text-sm transition-opacity duration-300 ${
                      activeYear === year
                        ? "text-quaise-teal-darkest opacity-80"
                        : "text-quaise-teal-darkest opacity-50"
                    }`}
                  >
                    {timelineData[year].subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
