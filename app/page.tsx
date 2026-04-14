"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"

/* ═══════════════════════════════════════════
   SCROLL REVEAL WRAPPER
   ═══════════════════════════════════════════ */
function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => setVisible(true), delay); observer.unobserve(el) } },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={`reveal ${visible ? "visible" : ""} ${className}`}>
      {children}
    </div>
  )
}

/* ═══════════════════════════════════════════
   ANIMATED COUNTER
   ═══════════════════════════════════════════ */
function Counter({ end, suffix = "", prefix = "", duration = 2000 }: { end: number; suffix?: string; prefix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [started, setStarted] = useState(false)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.unobserve(el) } },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [started, end, duration])

  return <span ref={ref}>{prefix}{value.toLocaleString()}{suffix}</span>
}

/* ═══════════════════════════════════════════
   CONTAINERIZED RFB — 1 MWh / 250 kW Module
   ═══════════════════════════════════════════ */
function ContainerizedRFB() {
  return (
    <svg viewBox="0 0 720 480" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="containerBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d8d8d8" />
          <stop offset="100%" stopColor="#c8c8c8" />
        </linearGradient>
        <linearGradient id="tankFill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(3,121,113,0.03)" />
          <stop offset="100%" stopColor="rgba(3,121,113,0.1)" />
        </linearGradient>
        <linearGradient id="liquidAno" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(3,121,113,0.08)" />
          <stop offset="100%" stopColor="rgba(3,121,113,0.25)" />
        </linearGradient>
        <linearGradient id="liquidCat" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(2,52,54,0.08)" />
          <stop offset="100%" stopColor="rgba(2,52,54,0.25)" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <pattern id="containerRidge" width="24" height="400" patternUnits="userSpaceOnUse">
          <rect width="24" height="400" fill="none" />
          <line x1="12" y1="0" x2="12" y2="400" stroke="rgba(3,121,113,0.06)" strokeWidth="1" />
        </pattern>
      </defs>

      {/* === CONTAINER SHELL === */}
      <polygon points="80,80 640,80 680,50 120,50" fill="#d0d0d0" stroke="#037971" strokeWidth="0.5" opacity="0.6" />
      <rect x="80" y="80" width="560" height="320" fill="url(#containerBody)" stroke="#037971" strokeWidth="0.5" opacity="0.8" />
      <rect x="80" y="80" width="560" height="320" fill="url(#containerRidge)" />
      <polygon points="640,80 680,50 680,370 640,400" fill="#bbb" stroke="#037971" strokeWidth="0.5" opacity="0.5" />

      <line x1="80" y1="80" x2="80" y2="400" stroke="#037971" strokeWidth="1" opacity="0.3" />
      <line x1="640" y1="80" x2="640" y2="400" stroke="#037971" strokeWidth="1" opacity="0.3" />
      <line x1="80" y1="400" x2="640" y2="400" stroke="#037971" strokeWidth="1" opacity="0.3" />

      <rect x="76" y="76" width="12" height="12" fill="#037971" opacity="0.2" />
      <rect x="632" y="76" width="12" height="12" fill="#037971" opacity="0.2" />
      <rect x="76" y="392" width="12" height="12" fill="#037971" opacity="0.2" />
      <rect x="632" y="392" width="12" height="12" fill="#037971" opacity="0.2" />

      {/* === ANOLYTE TANK === */}
      <rect x="110" y="130" width="120" height="230" rx="4" fill="url(#tankFill)" stroke="#037971" strokeWidth="0.8" opacity="0.7" />
      <rect x="114" y="210" width="112" height="146" rx="2" fill="url(#liquidAno)">
        <animate attributeName="height" values="146;140;146" dur="4s" repeatCount="indefinite" />
        <animate attributeName="y" values="210;216;210" dur="4s" repeatCount="indefinite" />
      </rect>
      <text x="170" y="120" textAnchor="middle" fill="#037971" fontFamily="'Space Mono', monospace" fontSize="9" letterSpacing="0.15em" opacity="0.8">ANOLYTE</text>
      <text x="170" y="195" textAnchor="middle" fill="#888" fontFamily="'Space Mono', monospace" fontSize="7">AlCl₃:N-ethylurea</text>

      {/* === CELL STACK === */}
      <rect x="290" y="130" width="140" height="200" rx="2" fill="#e0e0e0" stroke="#aaa" strokeWidth="0.8" />
      <line x1="360" y1="140" x2="360" y2="320" stroke="#037971" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.5" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={`plate-${i}`}>
          <rect x={308 + i * 8} y="145" width="3" height="175" fill="#ccc" stroke="#aaa" strokeWidth="0.3" opacity="0.8" />
          <rect x={388 + i * 8} y="145" width="3" height="175" fill="#ccc" stroke="#aaa" strokeWidth="0.3" opacity="0.8" />
        </g>
      ))}
      <text x="360" y="120" textAnchor="middle" fill="#037971" fontFamily="'Space Mono', monospace" fontSize="9" letterSpacing="0.15em" opacity="0.8">CELL STACK</text>
      <text x="360" y="350" textAnchor="middle" fill="#037971" fontFamily="'Space Mono', monospace" fontSize="9" filter="url(#glow)">2.84 V</text>

      {/* === CATHOLYTE TANK === */}
      <rect x="490" y="130" width="120" height="230" rx="4" fill="url(#tankFill)" stroke="#037971" strokeWidth="0.8" opacity="0.7" />
      <rect x="494" y="200" width="112" height="156" rx="2" fill="url(#liquidCat)">
        <animate attributeName="height" values="156;148;156" dur="4.5s" repeatCount="indefinite" />
        <animate attributeName="y" values="200;208;200" dur="4.5s" repeatCount="indefinite" />
      </rect>
      <text x="550" y="120" textAnchor="middle" fill="#037971" fontFamily="'Space Mono', monospace" fontSize="9" letterSpacing="0.15em" opacity="0.8">CATHOLYTE</text>
      <text x="550" y="185" textAnchor="middle" fill="#888" fontFamily="'Space Mono', monospace" fontSize="7">Phenothiazine</text>

      {/* === FLOW PIPES === */}
      <line x1="230" y1="170" x2="290" y2="170" stroke="#aaa" strokeWidth="2" />
      <line x1="290" y1="290" x2="230" y2="290" stroke="#aaa" strokeWidth="2" />
      <line x1="430" y1="170" x2="490" y2="170" stroke="#aaa" strokeWidth="2" />
      <line x1="490" y1="290" x2="430" y2="290" stroke="#aaa" strokeWidth="2" />

      {/* === FLOW PARTICLES === */}
      <circle r="2.5" fill="#037971" opacity="0.8" filter="url(#glow)">
        <animateMotion dur="1.8s" repeatCount="indefinite" path="M 230,170 L 290,170" />
      </circle>
      <circle r="2.5" fill="#037971" opacity="0.8" filter="url(#glow)">
        <animateMotion dur="1.8s" repeatCount="indefinite" path="M 290,290 L 230,290" />
      </circle>
      <circle r="2.5" fill="#023436" opacity="0.8" filter="url(#glow)">
        <animateMotion dur="2s" repeatCount="indefinite" path="M 430,170 L 490,170" />
      </circle>
      <circle r="2.5" fill="#023436" opacity="0.8" filter="url(#glow)">
        <animateMotion dur="2s" repeatCount="indefinite" path="M 490,290 L 430,290" />
      </circle>

      {/* === PUMP SYMBOLS === */}
      <circle cx="260" cy="230" r="10" fill="none" stroke="#aaa" strokeWidth="0.8" />
      <text x="260" y="233" textAnchor="middle" fill="#888" fontFamily="'Space Mono', monospace" fontSize="7">P</text>
      <circle cx="460" cy="230" r="10" fill="none" stroke="#aaa" strokeWidth="0.8" />
      <text x="460" y="233" textAnchor="middle" fill="#888" fontFamily="'Space Mono', monospace" fontSize="7">P</text>

      {/* === PCS BOX === */}
      <rect x="310" y="370" width="100" height="25" rx="2" fill="#ddd" stroke="#aaa" strokeWidth="0.5" />
      <text x="360" y="386" textAnchor="middle" fill="#888" fontFamily="'Space Mono', monospace" fontSize="6" letterSpacing="0.1em">PCS / INVERTER</text>

      <line x1="360" y1="395" x2="360" y2="420" stroke="#037971" strokeWidth="1" opacity="0.4" />
      <text x="360" y="440" textAnchor="middle" fill="#037971" fontFamily="'Space Mono', monospace" fontSize="8" opacity="0.6" letterSpacing="0.15em">&rarr; GRID</text>

      <text x="100" y="420" fill="#aaa" fontFamily="'Space Mono', monospace" fontSize="7" letterSpacing="0.15em">CARBO ENERGY &mdash; 1 MWh / 250 kW MODULE</text>

      <text x="80" y="465" fill="#888" fontFamily="'Space Mono', monospace" fontSize="10" letterSpacing="0.05em">FIG. 1</text>
      <text x="142" y="465" fill="#aaa" fontFamily="'Space Mono', monospace" fontSize="9">Containerized Hybrid Non-Aqueous Redox Flow Battery</text>
    </svg>
  )
}

/* ═══════════════════════════════════════════
   BATTERY SVG DIAGRAM (How It Works)
   ═══════════════════════════════════════════ */
function BatteryDiagram() {
  return (
    <svg viewBox="0 0 800 400" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tankGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e0e0e0" />
          <stop offset="100%" stopColor="#d4d4d4" />
        </linearGradient>
        <filter id="glowDiag">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <rect x="40" y="80" width="160" height="240" rx="4" fill="url(#tankGrad)" stroke="#037971" strokeWidth="1" opacity="0.8" />
      <rect x="50" y="180" width="140" height="130" rx="2" fill="rgba(3,121,113,0.08)" />
      <rect x="50" y="180" width="140" height="130" rx="2" fill="rgba(3,121,113,0.05)">
        <animate attributeName="height" values="130;125;130" dur="3s" repeatCount="indefinite" />
        <animate attributeName="y" values="180;185;180" dur="3s" repeatCount="indefinite" />
      </rect>
      <text x="120" y="60" textAnchor="middle" fill="#037971" fontFamily="'Space Mono', monospace" fontSize="11" letterSpacing="0.1em">ANOLYTE</text>
      <text x="120" y="155" textAnchor="middle" fill="#888" fontFamily="'Space Mono', monospace" fontSize="9">AlCl&#x2083;:N-ethylurea</text>
      <text x="120" y="170" textAnchor="middle" fill="#aaa" fontFamily="'Space Mono', monospace" fontSize="8">1.4:1 molar ratio</text>

      <rect x="300" y="100" width="200" height="200" rx="4" fill="url(#tankGrad)" stroke="#aaa" strokeWidth="1" />
      <line x1="400" y1="110" x2="400" y2="290" stroke="#037971" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
      <rect x="340" y="120" width="8" height="160" rx="2" fill="#ccc" stroke="#037971" strokeWidth="0.5" opacity="0.6" />
      <rect x="452" y="120" width="8" height="160" rx="2" fill="#ccc" stroke="#037971" strokeWidth="0.5" opacity="0.6" />
      <text x="400" y="85" textAnchor="middle" fill="#037971" fontFamily="'Space Mono', monospace" fontSize="11" letterSpacing="0.1em">CELL STACK</text>
      <text x="360" y="310" textAnchor="middle" fill="#aaa" fontFamily="'Space Mono', monospace" fontSize="8">ANODE</text>
      <text x="440" y="310" textAnchor="middle" fill="#aaa" fontFamily="'Space Mono', monospace" fontSize="8">CATHODE</text>
      <text x="400" y="340" textAnchor="middle" fill="#037971" fontFamily="'Space Mono', monospace" fontSize="10" filter="url(#glowDiag)">V_cell &asymp; 2.84 V</text>

      <rect x="600" y="80" width="160" height="240" rx="4" fill="url(#tankGrad)" stroke="#037971" strokeWidth="1" opacity="0.8" />
      <rect x="610" y="180" width="140" height="130" rx="2" fill="rgba(3,121,113,0.08)" />
      <rect x="610" y="180" width="140" height="130" rx="2" fill="rgba(3,121,113,0.05)">
        <animate attributeName="height" values="130;120;130" dur="3.5s" repeatCount="indefinite" />
        <animate attributeName="y" values="180;190;180" dur="3.5s" repeatCount="indefinite" />
      </rect>
      <text x="680" y="60" textAnchor="middle" fill="#037971" fontFamily="'Space Mono', monospace" fontSize="11" letterSpacing="0.1em">CATHOLYTE</text>
      <text x="680" y="155" textAnchor="middle" fill="#888" fontFamily="'Space Mono', monospace" fontSize="9">Phenothiazine</text>
      <text x="680" y="170" textAnchor="middle" fill="#aaa" fontFamily="'Space Mono', monospace" fontSize="8">2-electron transfer</text>

      <line x1="200" y1="160" x2="300" y2="160" stroke="#aaa" strokeWidth="2" />
      <line x1="200" y1="260" x2="300" y2="260" stroke="#aaa" strokeWidth="2" />
      <line x1="500" y1="160" x2="600" y2="160" stroke="#aaa" strokeWidth="2" />
      <line x1="500" y1="260" x2="600" y2="260" stroke="#aaa" strokeWidth="2" />

      <circle r="3" fill="#037971" opacity="0.8" filter="url(#glowDiag)">
        <animateMotion dur="2s" repeatCount="indefinite" path="M 200,160 L 300,160" />
      </circle>
      <circle r="3" fill="#037971" opacity="0.8" filter="url(#glowDiag)">
        <animateMotion dur="2s" repeatCount="indefinite" path="M 300,260 L 200,260" />
      </circle>
      <circle r="3" fill="#037971" opacity="0.8" filter="url(#glowDiag)">
        <animateMotion dur="2.2s" repeatCount="indefinite" path="M 500,160 L 600,160" />
      </circle>
      <circle r="3" fill="#037971" opacity="0.8" filter="url(#glowDiag)">
        <animateMotion dur="2.2s" repeatCount="indefinite" path="M 600,260 L 500,260" />
      </circle>

      <circle cx="250" cy="210" r="14" fill="none" stroke="#aaa" strokeWidth="1" />
      <text x="250" y="214" textAnchor="middle" fill="#888" fontFamily="'Space Mono', monospace" fontSize="8">P</text>
      <circle cx="550" cy="210" r="14" fill="none" stroke="#aaa" strokeWidth="1" />
      <text x="550" y="214" textAnchor="middle" fill="#888" fontFamily="'Space Mono', monospace" fontSize="8">P</text>

      <line x1="400" y1="360" x2="400" y2="390" stroke="#037971" strokeWidth="1" />
      <text x="400" y="398" textAnchor="middle" fill="#888" fontFamily="'Space Mono', monospace" fontSize="8">&rarr; GRID</text>
    </svg>
  )
}

/* ═══════════════════════════════════════════
   INFRASTRUCTURE CONVERSION DIAGRAM
   ═══════════════════════════════════════════ */
function InfrastructureDiagram() {
  return (
    <svg viewBox="0 0 800 420" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="groundGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c8bfb0" />
          <stop offset="100%" stopColor="#a89880" />
        </linearGradient>
        <linearGradient id="electrolyteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(3,121,113,0.08)" />
          <stop offset="100%" stopColor="rgba(3,121,113,0.3)" />
        </linearGradient>
        <filter id="glowInfra">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <rect x="0" y="0" width="800" height="180" fill="#e8e8e8" />
      <line x1="0" y1="180" x2="800" y2="180" stroke="#aaa" strokeWidth="1" />
      <text x="780" y="175" textAnchor="end" fill="#aaa" fontFamily="'Space Mono', monospace" fontSize="7">GRADE</text>

      <rect x="280" y="110" width="240" height="70" rx="2" fill="#ddd" stroke="#037971" strokeWidth="0.5" opacity="0.7" />
      <text x="400" y="150" textAnchor="middle" fill="#037971" fontFamily="'Space Mono', monospace" fontSize="8" letterSpacing="0.1em">CELL STACKS + PCS</text>

      <rect x="540" y="140" width="60" height="40" rx="2" fill="#ddd" stroke="#aaa" strokeWidth="0.5" />
      <text x="570" y="163" textAnchor="middle" fill="#888" fontFamily="'Space Mono', monospace" fontSize="6">PCS</text>

      <line x1="600" y1="160" x2="700" y2="160" stroke="#037971" strokeWidth="0.5" strokeDasharray="4 3" />
      <line x1="700" y1="100" x2="700" y2="180" stroke="#888" strokeWidth="1.5" />
      <line x1="680" y1="110" x2="720" y2="110" stroke="#888" strokeWidth="1" />
      <line x1="685" y1="120" x2="715" y2="120" stroke="#888" strokeWidth="0.8" />
      <line x1="690" y1="128" x2="710" y2="128" stroke="#888" strokeWidth="0.6" />
      <text x="700" y="98" textAnchor="middle" fill="#aaa" fontFamily="'Space Mono', monospace" fontSize="7">GRID</text>

      <rect x="0" y="180" width="800" height="240" fill="url(#groundGrad)" />

      <ellipse cx="250" cy="300" rx="120" ry="60" fill="#d8d0c0" stroke="#aaa" strokeWidth="1" />
      <ellipse cx="250" cy="300" rx="116" ry="56" fill="url(#electrolyteGrad)">
        <animate attributeName="ry" values="56;52;56" dur="5s" repeatCount="indefinite" />
      </ellipse>
      <text x="250" y="295" textAnchor="middle" fill="#037971" fontFamily="'Space Mono', monospace" fontSize="8" opacity="0.9">ANOLYTE</text>
      <text x="250" y="310" textAnchor="middle" fill="#888" fontFamily="'Space Mono', monospace" fontSize="7">30,000 L</text>

      <ellipse cx="520" cy="300" rx="120" ry="60" fill="#d8d0c0" stroke="#aaa" strokeWidth="1" />
      <ellipse cx="520" cy="300" rx="116" ry="56" fill="url(#electrolyteGrad)">
        <animate attributeName="ry" values="56;50;56" dur="5.5s" repeatCount="indefinite" />
      </ellipse>
      <text x="520" y="295" textAnchor="middle" fill="#037971" fontFamily="'Space Mono', monospace" fontSize="8" opacity="0.9">CATHOLYTE</text>
      <text x="520" y="310" textAnchor="middle" fill="#888" fontFamily="'Space Mono', monospace" fontSize="7">30,000 L</text>

      <line x1="250" y1="240" x2="350" y2="180" stroke="#888" strokeWidth="1.5" />
      <line x1="520" y1="240" x2="450" y2="180" stroke="#888" strokeWidth="1.5" />

      <circle r="2" fill="#037971" opacity="0.7" filter="url(#glowInfra)">
        <animateMotion dur="2s" repeatCount="indefinite" path="M 250,240 L 350,180" />
      </circle>
      <circle r="2" fill="#037971" opacity="0.7" filter="url(#glowInfra)">
        <animateMotion dur="2.2s" repeatCount="indefinite" path="M 520,240 L 450,180" />
      </circle>

      <line x1="130" y1="240" x2="130" y2="360" stroke="#888" strokeWidth="0.5" strokeDasharray="2 2" />
      <line x1="125" y1="240" x2="135" y2="240" stroke="#888" strokeWidth="0.5" />
      <line x1="125" y1="360" x2="135" y2="360" stroke="#888" strokeWidth="0.5" />
      <text x="115" y="305" textAnchor="middle" fill="#888" fontFamily="'Space Mono', monospace" fontSize="7" transform="rotate(-90, 115, 305)">3-5m depth</text>

      <text x="385" y="385" textAnchor="middle" fill="#037971" fontFamily="'Space Mono', monospace" fontSize="9" filter="url(#glowInfra)">At 190 Wh/L &rarr; 11.4 MWh per station</text>

      <text x="20" y="415" fill="#888" fontFamily="'Space Mono', monospace" fontSize="10" letterSpacing="0.05em">FIG. 3</text>
      <text x="82" y="415" fill="#aaa" fontFamily="'Space Mono', monospace" fontSize="9">Gas Station &rarr; Grid-Scale Energy Storage Node</text>
    </svg>
  )
}


/* ═══════════════════════════════════════════
   SCROLLYTELLING STEPS — 1 block visible at a time
   ═══════════════════════════════════════════ */
type ScrollyItem = { num: string; title: string; subtitle: string; specs: [string, string][]; note: string }

function ScrollySteps({ items, header }: { items: ScrollyItem[]; header: ReactNode }) {
  const [active, setActive] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isLocked = useRef(false)
  const cooldown = useRef(false)
  const scrollAccum = useRef(0)
  const lastTouchY = useRef(0)
  const activeRef = useRef(0)

  // Keep ref in sync with state
  useEffect(() => { activeRef.current = active }, [active])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    // Lock when section is mostly in view
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.6 && !isLocked.current && !cooldown.current) {
        isLocked.current = true
        scrollAccum.current = 0
        document.body.style.overflow = 'hidden'
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, { threshold: [0.6] })
    obs.observe(el)

    const unlock = () => {
      isLocked.current = false
      cooldown.current = true
      document.body.style.overflow = ''
      setTimeout(() => { cooldown.current = false }, 1500)
    }

    const advance = (delta: number) => {
      if (!isLocked.current) return
      scrollAccum.current += delta
      const THRESHOLD = 80

      if (scrollAccum.current > THRESHOLD) {
        scrollAccum.current = 0
        const cur = activeRef.current
        if (cur >= items.length - 1) {
          unlock()
        } else {
          setActive(cur + 1)
        }
      } else if (scrollAccum.current < -THRESHOLD) {
        scrollAccum.current = 0
        const cur = activeRef.current
        if (cur <= 0) {
          unlock()
        } else {
          setActive(cur - 1)
        }
      }
    }

    const onWheel = (e: WheelEvent) => {
      if (!isLocked.current) return
      e.preventDefault()
      advance(e.deltaY)
    }

    const onTouchStart = (e: TouchEvent) => {
      lastTouchY.current = e.touches[0].clientY
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!isLocked.current) return
      e.preventDefault()
      const y = e.touches[0].clientY
      advance(lastTouchY.current - y)
      lastTouchY.current = y
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (!isLocked.current) return
      if (e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); advance(100) }
      if (e.key === 'ArrowUp') { e.preventDefault(); advance(-100) }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('keydown', onKeyDown)

    return () => {
      obs.disconnect()
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [items.length])

  return (
    <div ref={sectionRef} className="h-screen bg-[#e0e0e0] flex flex-col justify-center">
      <div className="w-full max-w-[1400px] mx-auto px-10 md:px-16">
        <div className="mb-8">{header}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[2cm] items-start">
          {/* Left: diagram */}
          <ContainerizedRFB />
          {/* Right: active step */}
          <div className="relative min-h-[300px]">
            {items.map((item, i) => (
              <div
                key={item.num}
                className="absolute inset-0 transition-all duration-500"
                style={{
                  opacity: i === active ? 1 : 0,
                  transform: i === active ? 'translateY(0)' : `translateY(${i < active ? '-10px' : '10px'})`,
                  pointerEvents: i === active ? 'auto' : 'none',
                }}
              >
                <div className="border-l-2 border-[#037971]/40 pl-6">
                  <div className="font-mono text-xs text-[#ccc] mb-3">{item.num}</div>
                  <h3 className="font-mono text-xl mb-1 text-[#333]">{item.title}</h3>
                  <div className="text-sm text-[#037971] font-mono mb-4">{item.subtitle}</div>
                  <div className="space-y-2 mb-4">
                    {item.specs.map(([label, val]) => (
                      <div key={label} className="flex justify-between items-baseline border-b border-[#c8c8c8] pb-1">
                        <span className="text-sm text-[#888]">{label}</span>
                        <span className="font-mono text-sm text-[#444]">{val}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-[#aaa] italic">{item.note}</p>
                </div>
                {/* Step progress bar */}
                <div className="flex gap-2 mt-8">
                  {items.map((_, j) => (
                    <div key={j} className="h-[2px] flex-1 transition-colors duration-300"
                      style={{ background: j <= active ? '#037971' : '#d0d0d0' }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */
export default function Home() {
  const [selectedSize, setSelectedSize] = useState(120)

  // System sizing data — 10 MW power, varying duration
  const systemData: Record<number, { duration: string; electrolyteM3: number; footprint: string; capex: string; capexKWh: number }> = {
    12: { duration: "1.2h", electrolyteM3: 63, footprint: "~800 m²", capex: "$10.1M", capexKWh: 842 },
    24: { duration: "2.4h", electrolyteM3: 126, footprint: "~1,200 m²", capex: "$12.0M", capexKWh: 500 },
    48: { duration: "4.8h", electrolyteM3: 253, footprint: "~2,000 m²", capex: "$15.7M", capexKWh: 327 },
    60: { duration: "6h", electrolyteM3: 316, footprint: "~2,400 m²", capex: "$17.6M", capexKWh: 293 },
    90: { duration: "9h", electrolyteM3: 474, footprint: "~3,500 m²", capex: "$22.2M", capexKWh: 247 },
    120: { duration: "12h", electrolyteM3: 632, footprint: "~5,000 m²", capex: "$26.9M", capexKWh: 224 },
  }

  const currentSystem = systemData[selectedSize]

  return (
    <main className="min-h-screen bg-[#eeeeee] text-[#444] overflow-hidden relative">

      {/* ════════════════════════════════════
          VERTICAL GRID OVERLAY (Quaise-style)
          ════════════════════════════════════ */}
      <div className="grid-overlay">
        <div className="grid-overlay-inner">
          <div className="grid-col" />
        </div>
      </div>

      {/* ════════════════════════════════════
          NAVIGATION
          ════════════════════════════════════ */}
      <nav className="absolute top-0 left-0 right-0 z-50">
        <div className="max-w-[1400px] mx-auto px-10 md:px-16 h-16 flex items-center justify-between">
          <Link href="/" className="font-mono text-lg tracking-wider text-[#037971] hover:opacity-80 transition-opacity">
            CARBO<span className="text-[#444]">.</span>ENERGY
          </Link>
          <div className="flex items-center gap-8 font-mono text-xs tracking-widest uppercase">
            <a href="#science" className="text-[#888] hover:text-[#037971] transition-colors hidden md:block">Science</a>
            <a href="#roadmap" className="text-[#888] hover:text-[#037971] transition-colors hidden md:block">Roadmap</a>
            <Link href="/carbo-os" className="text-[#888] hover:text-[#037971] transition-colors hidden md:block">CarboOS</Link>
            <Link href="/login" className="text-[#888] hover:text-[#037971] transition-colors hidden md:block">Login</Link>
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════
          HERO
          ════════════════════════════════════ */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="relative z-10 max-w-[1400px] mx-auto px-10 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="mono-label mb-8">Batteries Meant to Last a Lifetime</div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] mb-8 text-[#222]">
                Grid-Scale Storage That<br />
                Finally Makes Renewable<br />
                Energy <span className="text-[#037971]">Reliable</span>
              </h1>
              <p className="text-lg md:text-xl text-[#888] max-w-xl mb-10 font-light leading-relaxed">
                We build hybrid non-aqueous redox flow batteries with near-lithium energy density,
                zero fire risk, and a 40-year lifespan. Grid-scale storage that finally makes
                renewable energy reliable.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#science" className="inline-flex items-center gap-2 bg-[#037971] text-white px-6 py-3 font-mono text-sm tracking-wider hover:bg-[#023436] transition-colors">
                  EXPLORE THE SCIENCE
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" strokeWidth="1.5"/></svg>
                </a>
                <a href="#technology" className="inline-flex items-center gap-2 border border-[#ccc] text-[#444] px-6 py-3 font-mono text-sm tracking-wider hover:border-[#037971] hover:text-[#037971] transition-colors">
                  HOW IT WORKS
                </a>
              </div>
            </div>
          </div>

          {/* Key stats */}
          <div className="mt-16 grid grid-cols-3 gap-[1px] bg-[#d0d0d0]">
            {[
              { value: "190–200", unit: "Wh/L DENSITY" },
              { value: "2.84V", unit: "CELL VOLTAGE" },
              { value: "40yr", unit: "SYSTEM LIFESPAN" },
            ].map((s) => (
              <div key={s.unit} className="bg-[#eeeeee] p-6 text-center">
                <div className="font-mono text-xl md:text-2xl text-[#037971]">{s.value}</div>
                <div className="font-mono text-[10px] text-[#aaa] tracking-widest mt-1">{s.unit}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          IMAGE STRIP (Quaise-style 3 photos)
          ════════════════════════════════════ */}
      <section className="max-w-[1400px] mx-auto px-10 md:px-16">
        <div className="grid gap-0" style={{ gridTemplateColumns: "3fr 4fr 3fr" }}>
          {["/img1.jpg", "/img2.jpg", "/img3.jpg"].map((src, i) => (
            <div key={i} className="relative h-[200px] md:h-[300px] overflow-hidden">
              <Image src={src} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════
          BRIDGE — 25× more storage (dark)
          ════════════════════════════════════ */}
      <section className="bg-[#023436] py-14 md:py-20 mt-[2cm]">
        <div className="max-w-[1200px] mx-auto px-10 md:px-16 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white mb-8">
              The world needs <span className="text-[#00FFB2]">25&times;</span> more energy storage by 2030.
              Lithium can&apos;t get us there.
            </h2>
            <p className="text-xl md:text-2xl text-[#88b8b5] max-w-3xl mx-auto font-light leading-relaxed">
              Li-ion degrades fast, catches fire, and depends on scarce minerals.
              The grid needs something fundamentally different.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════
          THE PROBLEM — 01-03
          ════════════════════════════════════ */}
      <section className="bg-[#eeeeee] py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-10 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#d0d0d0]">
            {[
              { num: "01", title: "Storage Gap", stat: "$186B+", desc: "Global LDES must grow 25\u00D7 by 2030 (IEA). The grid loses billions in curtailed renewable energy daily because there's nowhere to put it." },
              { num: "02", title: "Wrong Chemistry", stat: "2\u20134 hrs", desc: "Li-ion degrades fast at deep cycling and needs full replacement every 8\u201310 years. There isn't enough lithium on Earth for all the storage the world needs." },
              { num: "03", title: "Fire Risk", stat: "+30%/yr", desc: "Li-ion has inherent thermal runaway risk. Insurance premiums for grid-scale Li-ion are rising 15\u201330% annually. Permitting near populated areas is increasingly difficult." }
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 150}>
                <div className="bg-[#e6e6e6] p-10 h-full group hover:bg-[#e0e0e0] transition-colors">
                  <div className="font-mono text-xs text-[#ccc] mb-6">{item.num}</div>
                  <h3 className="font-mono text-xl mb-4 text-[#333]">{item.title}</h3>
                  <div className="font-mono text-3xl text-[#037971] mb-6">{item.stat}</div>
                  <p className="text-sm text-[#888] leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          FIG. 1 — 1 MWh STORAGE MODULE
          Full-bleed gray, scrollytelling
          ════════════════════════════════════ */}
      {/* ════════════════════════════════════
          SCROLLYTELLING — scroll-locked steps
          ════════════════════════════════════ */}
      <ScrollySteps header={
          <>
            <div className="mono-label mb-4">Our Solution</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl max-w-3xl mb-4 text-[#222]">
              Inside a <span className="text-[#037971]">1 MWh</span> Carbo storage module
            </h2>
            <p className="text-[#888] max-w-2xl leading-relaxed text-lg">
              A single containerized unit rated at 250 kW and 4 hours of duration.
              Non-pyrophoric. No thermal management. Fits in a standard shipping container.
            </p>
          </>
        } items={[
          {
            num: "01", title: "Anolyte Tank",
            subtitle: "AlCl\u2083:N-ethylurea (1.4:1) in diglyme",
            specs: [
              ["Volume", "2,500 L (2.5 m\u00B3)"],
              ["Concentration", "6.878 M AlCl\u2083"],
              ["Electrode potential", "\u22121.66 V vs SHE"],
              ["Electron inventory", "20.64 mol e\u207B/L"],
            ],
            note: "Non-pyrophoric. Tolerates 50,500 ppm water. No glovebox needed."
          },
          {
            num: "02", title: "Cell Stack",
            subtitle: "Electrochemical reactor module",
            specs: [
              ["Cell voltage", "2.84 V nominal"],
              ["Power rating", "250 kW"],
              ["Configuration", "Series-connected bipolar plates"],
              ["Membrane", "Ion-selective separator"],
            ],
            note: "Power is decoupled from energy. Add tanks for more storage, not more cells."
          },
          {
            num: "03", title: "Catholyte Tank",
            subtitle: "Phenothiazine-OEG-FTFSI in diglyme",
            specs: [
              ["Volume", "2,500 L (2.5 m\u00B3)"],
              ["Concentration", "~2.5 M (targeting 2.628 M)"],
              ["Electron transfer", "2-electron redox (PT \u2192 PT\u00B2\u207A)"],
              ["Electrode potential", "+1.18 V vs SHE"],
            ],
            note: "Multi-electron chemistry enables near-lithium energy density in a flow format."
          },
          {
            num: "04", title: "PCS & Grid Connection",
            subtitle: "Power conversion system",
            specs: [
              ["Total electrolyte", "5,000 L (5 m\u00B3)"],
              ["Energy density", "190 Wh/L"],
              ["Module footprint", "~20 m\u00B2"],
              ["Weight", "~6\u20137 tonnes"],
            ],
            note: "Standard 20ft container houses the complete system. Plug-and-play grid connection."
          },
        ]} />

      {/* Unit economics */}
      <section className="bg-[#e0e0e0] border-b border-[#c8c8c8]">
        <div className="max-w-[1400px] mx-auto px-10 md:px-16 py-[2cm]">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-[#c8c8c8]">
              {[
                { value: "$126", label: "ACTIVE MATERIALS", sub: "per kWh" },
                { value: "$183", label: "INSTALLED CAPEX", sub: "per kWh" },
                { value: ">8,000", label: "CYCLE LIFE", sub: "<0.2% fade/cycle" },
                { value: "ZERO", label: "FIRE RISK", sub: "non-pyrophoric" },
              ].map((item) => (
                <div key={item.label} className="bg-[#e0e0e0] p-8 text-center">
                  <div className="font-mono text-2xl md:text-3xl text-[#037971] mb-2">{item.value}</div>
                  <div className="font-mono text-[9px] text-[#aaa] tracking-[0.15em] mb-1">{item.label}</div>
                  <div className="text-xs text-[#ccc]">{item.sub}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════
          WHY NOW
          ════════════════════════════════════ */}
      <section className="bg-[#e4e2de] py-20 md:py-28 border-y border-[#d0ccc4]">
        <div className="max-w-[1400px] mx-auto px-10 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Reveal>
              <div className="mono-label mb-3">Why Now</div>
              <h3 className="text-2xl md:text-3xl text-[#333]">Three forces creating a <span className="text-[#037971]">$186B+</span> market</h3>
            </Reveal>
            {[
              { title: "Exponential Growth", desc: "AI-driven datacenter demand is adding 35+ GW of load to US grids by 2030. Every datacenter needs 4\u201312 hours of backup storage." },
              { title: "Renewable Waste Crisis", desc: "30\u201340% of solar/wind energy is curtailed because there's no storage. Storage unlocks this stranded value \u2014 buy at $0\u201320/MWh, sell at $80\u2013200/MWh." }
            ].map((item, i) => (
              <Reveal key={item.title} delay={200 + i * 150}>
                <div className="border-l-2 border-[#037971]/30 pl-6">
                  <h4 className="font-mono text-base mb-3 text-[#444]">{item.title}</h4>
                  <p className="text-base text-[#888] leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          BRIDGE — Dark callout (new text)
          ════════════════════════════════════ */}
      <section className="bg-[#023436] py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-10 md:px-16 text-center">
          <Reveal>
            <p className="text-2xl md:text-3xl lg:text-4xl text-white font-bold leading-snug">
              What if you could build a battery with <span className="text-[#00FFB2]">1/3 lithium density</span>,{" "}
              a <span className="text-[#00FFB2]">higher ROI</span>,{" "}
              <span className="text-white">zero fire risk</span>, and a{" "}
              <span className="text-[#00FFB2]">40-year lifespan</span>?
            </p>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════
          OUR CHEMISTRY + THE SCIENCE (merged)
          ════════════════════════════════════ */}
      <section id="science" className="bg-[#eeeeee] py-24 md:py-32 border-t border-[#d0d0d0]">
        <div className="max-w-[1400px] mx-auto px-10 md:px-16">
          <Reveal>
            <div className="mono-label mb-4">Our Chemistry</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl max-w-4xl mb-6 text-[#222]">
              A hybrid non-aqueous redox flow battery with
              <span className="text-[#037971]"> breakthrough energy density</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
            <Reveal>
              <p className="text-lg text-[#888] leading-relaxed mb-8">
                Our architecture pairs a chloroaluminate ionic-liquid-analogue anolyte with a multi-electron
                phenothiazine catholyte in a diglyme medium. Validated in laboratory with &gt;8,000 charge cycles
                at &lt;0.2% capacity fade per cycle.
              </p>
              <div className="space-y-6">
                {[
                  { title: "Anolyte: AlCl\u2083:N-ethylurea", desc: "Chloroaluminate ionic-liquid analogue at 1.4:1 molar ratio. E\u00B0 = \u22121.66V vs SHE. Massive electron inventory (20.64 mol e\u207B/L). Non-pyrophoric, tolerates water." },
                  { title: "Catholyte: Phenothiazine-OEG", desc: "Ether-functionalized phenothiazine with FTFSI counteranion. 2-electron redox (E\u00B0 = +1.18V vs SHE). Enables 2.84V cell voltage \u2014 2\u00D7 higher than vanadium flow batteries." },
                  { title: "Solvent: Diglyme", desc: "Non-aqueous medium that enables the high voltage window. Compatible with both electrode chemistries. Commercially available at scale." },
                ].map((item) => (
                  <div key={item.title} className="border-l-2 border-[#037971]/30 pl-6">
                    <h4 className="font-mono text-sm mb-1 text-[#444]">{item.title}</h4>
                    <p className="text-sm text-[#888] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="grid grid-cols-2 gap-[1px] bg-[#d0d0d0]">
                {[
                  { value: 8000, prefix: ">", suffix: "", label: "CHARGE CYCLES", sub: "<0.2% fade per cycle" },
                  { value: 200, prefix: "", suffix: "", label: "Wh/L DENSITY", sub: "Near-lithium performance" },
                  { value: 284, prefix: "", suffix: "", label: "CELL VOLTAGE (V\u00D7100)", sub: "2.84V nominal" },
                  { value: 0, prefix: "", suffix: "", label: "FIRE RISK", sub: "Non-pyrophoric chemistry" },
                ].map((item, i) => (
                  <div key={item.label} className="bg-[#e6e6e6] p-8 text-center group hover:bg-[#e0e0e0] transition-colors">
                    <div className="font-mono text-3xl md:text-4xl text-[#037971] mb-3">
                      {item.value === 0 ? <span>ZERO</span> : <Counter end={item.value} prefix={item.prefix} suffix={item.suffix} />}
                    </div>
                    <div className="font-mono text-[9px] text-[#aaa] tracking-[0.15em] mb-1">{item.label}</div>
                    <div className="text-xs text-[#ccc]">{item.sub}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-6 border border-[#d0d0d0] bg-[#e6e6e6]">
                <p className="font-mono text-sm text-center text-[#888]">
                  Active materials: <span className="text-[#037971]">$126/kWh</span> &middot;
                  Installed CAPEX: <span className="text-[#037971]">$183/kWh</span> &middot;
                  LCOS (20yr): <span className="text-[#037971]">$0.08&ndash;0.10/kWh</span> &middot;
                  Validated in laboratory.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Comparison table */}
          <Reveal>
            <h3 className="text-2xl md:text-3xl max-w-4xl mb-8 text-[#222]">
              Why Carbo beats lithium at every duration
              <span className="text-[#037971]"> beyond 4 hours</span>
            </h3>
          </Reveal>

          <Reveal>
            <div className="overflow-x-auto border border-[#d0d0d0] bg-[#eeeeee]">
              <table className="data-table">
                <thead>
                  <tr className="bg-[#e6e6e6]">
                    <th>Metric</th>
                    <th>Carbo Energy</th>
                    <th>Li-ion (LFP)</th>
                    <th>Vanadium RFB</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Cell Voltage", "2.84 V", "3.2 V", "1.4 V"],
                    ["Energy Density", "190\u2013200 Wh/L", "250+ Wh/L", "25\u201340 Wh/L"],
                    ["Optimal Duration", "8\u2013100+ hours", "2\u20134 hours", "4\u201312 hours"],
                    ["Cycle Life", ">8,000 cycles", "3,000\u20135,000", "15,000+"],
                    ["Degradation", "0.2%/yr", "2\u20133%/yr", "<0.1%/yr"],
                    ["Augmentation (Yr 8\u201310)", "$0", "$12\u201318M", "$0"],
                    ["20-Year TCO (120 MWh)", "$22M", "$48\u201364M", "$42\u201360M"],
                    ["LCOS (20 yr)", "$0.08\u20130.10/kWh", "$0.15\u20130.25/kWh", "$0.12\u20130.18/kWh"],
                    ["Safety", "Non-pyrophoric", "Thermal runaway risk", "Non-flammable"],
                    ["Supply Chain", "Abundant, local", "Critical minerals", "85% China/Russia"],
                    ["Life Extension", "Electrolyte refresh \u2192 40 yr", "Full replacement", "Electrolyte refresh"],
                  ].map(([metric, carbo, liion, vanadium]) => (
                    <tr key={metric}>
                      <td className="!text-[#444] font-mono">{metric}</td>
                      <td className="highlight">{carbo}</td>
                      <td className={liion?.includes("risk") || liion?.includes("replacement") || liion?.includes("Critical") ? "danger" : ""}>{liion}</td>
                      <td>{vanadium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal>
            <p className="mt-6 font-mono text-xs text-[#bbb] max-w-4xl">
              Li-ion degrades 2&ndash;3%/yr at daily deep cycling &rarr; needs $12&ndash;18M cell replacement at Year 8&ndash;10 &rarr; again at Year 15.
              Carbo: 0.2%/yr &asymp; 96% capacity at Year 20. Electrolyte refresh at Year 20 extends life to 40 years.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════
          HOW IT WORKS + SIZE SELECTOR
          ════════════════════════════════════ */}
      <section id="technology" className="bg-[#e8e8e8] py-24 md:py-32 border-t border-[#d0d0d0]">
        <div className="max-w-[1400px] mx-auto px-10 md:px-16">
          <Reveal>
            <div className="mono-label mb-4">How It Works</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl max-w-3xl mb-16 text-[#222]">
              Modular architecture.<br />
              <span className="text-[#037971]">Add tanks, not cells.</span>
            </h2>
          </Reveal>

          <Reveal>
            <div className="border border-[#d0d0d0] bg-[#eeeeee] p-8 mb-16">
              <BatteryDiagram />
            </div>
          </Reveal>

          {/* Interactive System Size Selector */}
          <Reveal>
            <div className="mb-8">
              <h3 className="font-mono text-xl mb-6 text-[#333]">Configure your system &mdash; 10 MW power, variable duration</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {[12, 24, 48, 60, 90, 120].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`size-tab ${selectedSize === size ? "active" : ""}`}
                  >
                    {size} MWh
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-[1px] bg-[#d0d0d0]">
                {[
                  ["Energy", `${selectedSize} MWh`],
                  ["Power", "10 MW"],
                  ["Duration", currentSystem.duration],
                  ["Electrolyte", `${currentSystem.electrolyteM3} m\u00B3`],
                  ["Footprint", currentSystem.footprint],
                  ["Installed Cost", currentSystem.capex],
                ].map(([label, val]) => (
                  <div key={label} className="bg-[#eeeeee] p-6">
                    <div className="font-mono text-[10px] text-[#aaa] tracking-[0.12em] mb-2">{label}</div>
                    <div className="font-mono text-xl md:text-2xl text-[#037971]">{val}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-[#eeeeee] border border-[#d0d0d0]">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <span className="font-mono text-sm text-[#888]">Carbo: </span>
                    <span className="font-mono text-sm text-[#037971] font-bold">${currentSystem.capexKWh}/kWh</span>
                  </div>
                  <div className="font-mono text-xs text-[#aaa]">
                    {selectedSize >= 48
                      ? <span className="text-[#037971]">&#x2713; Cheaper than Li-ion on initial CAPEX at this duration</span>
                      : <span>Li-ion is cheaper on CAPEX at short durations &mdash; but 2&ndash;3&times; more expensive over 20 years</span>
                    }
                  </div>
                </div>
              </div>

              <p className="mt-4 font-mono text-[10px] text-[#ccc]">
                Cost model: $6.5M fixed power infrastructure (10 MW stacks + PCS) + $129/kWh variable (electrolyte + tanks + BOS).
                Installed cost includes 20% margin. No thermal management costs. Zero fire risk insurance premium.
              </p>
            </div>
          </Reveal>

          {/* Why flow beats lithium */}
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-16">
              <div>
                <h3 className="font-mono text-xl mb-6 text-[#333]">Why Flow Beats Lithium at Scale</h3>
                <div className="space-y-6">
                  {[
                    { title: "Decoupled power & energy", desc: "Power is set by the cell stack, energy by the tank volume. Scale storage without scaling hardware." },
                    { title: "No degradation trap", desc: "0.2%/yr degradation vs 2\u20133%/yr for Li-ion. At Year 20, Carbo retains 96% capacity. Li-ion is dead." },
                    { title: "Electrolyte refresh \u2192 40 years", desc: "At Year 20, refresh only the catholyte ($4\u20136M). Total 40-year TCO: $26\u201328M vs $48\u201364M for Li-ion." },
                    { title: "Infrastructure conversion", desc: "Repurpose decommissioned oil tanks and closed gas stations. 1 tank of 5,000 m\u00B3 = 950 MWh of storage." }
                  ].map((item) => (
                    <div key={item.title} className="border-l-2 border-[#037971]/30 pl-6">
                      <h4 className="font-mono text-sm mb-1 text-[#444]">{item.title}</h4>
                      <p className="text-sm text-[#888] leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="font-mono text-xl md:text-2xl lg:text-3xl text-[#ccc]">
                    FROM <span className="text-[#444]">50 kWh</span> TO <span className="text-[#444]">100+ MWh</span>
                  </div>
                  <div className="font-mono text-sm text-[#ccc] mt-2 tracking-[0.2em]">MODULAR STORAGE FOR EVERY SCALE</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════
          CUMULATIVE THROUGHPUT
          ════════════════════════════════════ */}
      <section className="bg-[#eeeeee] py-24 md:py-32 border-t border-[#d0d0d0]">
        <div className="max-w-[1400px] mx-auto px-10 md:px-16">
          <Reveal>
            <div className="mono-label mb-4">Lifetime Throughput</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl max-w-4xl mb-6 text-[#222]">
              No degradation trap.<br />
              <span className="text-[#037971]">No operational handcuffs.</span>
            </h2>
            <p className="text-[#888] max-w-2xl mb-16 leading-relaxed">
              Use your battery as much as you want, at any state of charge. With 0.2%/yr degradation
              and electrolyte refresh at Year 20, a single Carbo system delivers over 3&times; the lifetime
              energy of a comparably-sized lithium battery.
            </p>
          </Reveal>

          <Reveal>
            <div className="border border-[#d0d0d0] bg-[#eeeeee] p-6 md:p-10">
              <div className="font-mono text-sm text-[#888] mb-8 tracking-wider">CUMULATIVE ENERGY DELIVERED OVER TIME &mdash; 10 MW / 120 MWh SYSTEM</div>

              <svg viewBox="0 0 820 440" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                {[0, 1, 2, 3, 4, 5].map((i) => {
                  const yVal = 2000000 - i * 400000
                  const y = 50 + i * 64
                  return (
                    <g key={`grid-${i}`}>
                      <line x1="100" y1={y} x2="780" y2={y} stroke="#d0d0d0" strokeWidth="0.5" strokeDasharray="4 4" />
                      <text x="92" y={y + 4} textAnchor="end" fill="#aaa" fontFamily="'Space Mono', monospace" fontSize="8">
                        {yVal === 0 ? "0" : `${(yVal / 1000).toLocaleString()}k`}
                      </text>
                    </g>
                  )
                })}
                <line x1="100" y1="370" x2="780" y2="370" stroke="#bbb" strokeWidth="1" />

                {[0, 5, 10, 15, 20, 25, 30].map((yr) => {
                  const x = 100 + (yr / 30) * 680
                  return (
                    <g key={`yr-${yr}`}>
                      <line x1={x} y1="370" x2={x} y2="376" stroke="#bbb" strokeWidth="1" />
                      <text x={x} y="390" textAnchor="middle" fill="#aaa" fontFamily="'Space Mono', monospace" fontSize="9">{yr}</text>
                    </g>
                  )
                })}
                <text x="440" y="410" textAnchor="middle" fill="#aaa" fontFamily="'Space Mono', monospace" fontSize="8" letterSpacing="0.15em">YEAR</text>
                <text x="22" y="210" textAnchor="middle" fill="#aaa" fontFamily="'Space Mono', monospace" fontSize="8" letterSpacing="0.1em" transform="rotate(-90, 22, 210)">MWh DELIVERED</text>

                {/* CARBO LINE */}
                <polyline
                  fill="none" stroke="#037971" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                  points={(() => {
                    const pts: string[] = []
                    let cumulative = 0
                    for (let yr = 0; yr <= 30; yr++) {
                      if (yr > 0) {
                        const yrSinceRefresh = yr > 20 ? yr - 20 : yr
                        cumulative += 120 * 1.5 * 365 * Math.pow(0.998, yrSinceRefresh)
                      }
                      const x = 100 + (yr / 30) * 680
                      const y = 370 - (cumulative / 2000000) * 320
                      pts.push(`${x},${y}`)
                    }
                    return pts.join(" ")
                  })()}
                />

                {/* LITHIUM LINE */}
                <polyline
                  fill="none" stroke="#bbb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  points={(() => {
                    const pts: string[] = []
                    let cumulative = 0
                    for (let yr = 0; yr <= 30; yr++) {
                      if (yr > 0 && yr <= 10) {
                        cumulative += 120 * 1.5 * 365 * Math.pow(0.97, yr)
                      }
                      const x = 100 + (yr / 30) * 680
                      const y = 370 - (cumulative / 2000000) * 320
                      pts.push(`${x},${y}`)
                    }
                    return pts.join(" ")
                  })()}
                />

                {/* EOL marker */}
                {(() => {
                  const x = 100 + (10 / 30) * 680
                  return (
                    <g>
                      <line x1={x} y1="50" x2={x} y2="370" stroke="#444" strokeWidth="1" strokeDasharray="6 4" />
                      <rect x={x + 6} y="52" width="150" height="18" rx="2" fill="#eeeeee" />
                      <text x={x + 12} y="64" fill="#444" fontFamily="'Space Mono', monospace" fontSize="8" fontWeight="bold">
                        End of Li-ion Battery
                      </text>
                    </g>
                  )
                })()}

                {/* Carbo endpoint */}
                {(() => {
                  let cumulative = 0
                  for (let yr = 1; yr <= 30; yr++) {
                    const yrSinceRefresh = yr > 20 ? yr - 20 : yr
                    cumulative += 120 * 1.5 * 365 * Math.pow(0.998, yrSinceRefresh)
                  }
                  const y = 370 - (cumulative / 2000000) * 320
                  const label = `${(cumulative / 1000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} GWh`
                  return <text x="775" y={y - 10} textAnchor="end" fill="#037971" fontFamily="'Space Mono', monospace" fontSize="12" fontWeight="bold">{label}</text>
                })()}

                {/* Lithium endpoint */}
                {(() => {
                  let cumulative = 0
                  for (let yr = 1; yr <= 10; yr++) {
                    cumulative += 120 * 1.5 * 365 * Math.pow(0.97, yr)
                  }
                  const y = 370 - (cumulative / 2000000) * 320
                  const label = `${Math.round(cumulative).toLocaleString()} MWh`
                  return <text x="775" y={y - 8} textAnchor="end" fill="#999" fontFamily="'Space Mono', monospace" fontSize="10">{label}</text>
                })()}

                {/* Legend */}
                <rect x="110" y="424" width="14" height="4" rx="1" fill="#037971" />
                <text x="130" y="429" fill="#444" fontFamily="'Space Mono', monospace" fontSize="9">CARBO ENERGY (120 MWh)</text>
                <rect x="380" y="424" width="14" height="4" rx="1" fill="#bbb" />
                <text x="400" y="429" fill="#888" fontFamily="'Space Mono', monospace" fontSize="9">LITHIUM-ION LFP (120 MWh)</text>
              </svg>

              <p className="font-mono text-[10px] text-[#bbb] mt-6 leading-relaxed">
                Assumptions: 10 MW / 120 MWh system, 1.5 cycles/day avg, 100% DoD, 365 days/year.
                Carbo: 0.2%/yr degradation, catholyte refresh at Year 20 restores full capacity.
                Li-ion: 3%/yr degradation at daily deep cycling, EOL at Year 10. Li-ion replacement cost of $12&ndash;18M not included.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════
          USE CASES
          ════════════════════════════════════ */}
      <section id="markets" className="bg-[#e8e8e8] py-24 md:py-32 border-t border-[#d0d0d0]">
        <div className="max-w-[1400px] mx-auto px-10 md:px-16">
          <Reveal>
            <div className="mono-label mb-4">Use Cases</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl max-w-3xl mb-16 text-[#222]">
              Four high-value markets,<br />
              <span className="text-[#037971]">one modular platform</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[#d0d0d0]">
            {[
              {
                icon: (<svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="#037971" strokeWidth="1"><rect x="4" y="20" width="6" height="16" /><rect x="14" y="12" width="6" height="24" /><rect x="24" y="16" width="6" height="20" /><rect x="34" y="8" width="2" height="28" /><line x1="0" y1="38" x2="40" y2="38" /></svg>),
                title: "Grid-Scale Storage & Energy Trading", revenue: "$1.5\u20132.9M/yr",
                desc: "Buy power at $0\u201320/MWh (night/solar peak), sell at $80\u2013200/MWh (evening peak). 12h duration captures full spread curve."
              },
              {
                icon: (<svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="#037971" strokeWidth="1"><rect x="8" y="4" width="24" height="32" rx="2" /><line x1="12" y1="12" x2="28" y2="12" /><line x1="12" y1="18" x2="28" y2="18" /><line x1="12" y1="24" x2="28" y2="24" /><line x1="12" y1="30" x2="28" y2="30" /><circle cx="20" cy="8" r="2" /></svg>),
                title: "Datacenter Backup & Baseload", revenue: "10 MW = 1 campus",
                desc: "AI datacenters need 4\u201312h uninterruptible power. Our non-pyrophoric chemistry eliminates fire risk insurance premiums."
              },
              {
                icon: (<svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="#037971" strokeWidth="1"><path d="M20 4L4 36h32L20 4z" /><line x1="20" y1="14" x2="20" y2="28" /><line x1="14" y1="22" x2="26" y2="22" /><circle cx="20" cy="32" r="2" /></svg>),
                title: "Mining Operations (Off-Grid)", revenue: "$3.5M/yr savings",
                desc: "Replace diesel generators at remote lithium, copper, gold mines. 120 MWh system replaces ~$3.5M/yr in diesel fuel. Zero emissions."
              },
              {
                icon: (<svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="#037971" strokeWidth="1"><circle cx="20" cy="20" r="8" /><line x1="20" y1="4" x2="20" y2="10" /><line x1="20" y1="30" x2="20" y2="36" /><line x1="4" y1="20" x2="10" y2="20" /><line x1="30" y1="20" x2="36" y2="20" /></svg>),
                title: "Solar/Wind Farm Co-location", revenue: "30\u201340% value unlock",
                desc: "Store excess renewable generation, sell during high-price windows. Eliminates curtailment losses."
              }
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="bg-[#eeeeee] p-10 group hover:bg-[#e6e6e6] transition-colors h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div className="opacity-40 group-hover:opacity-80 transition-opacity">{item.icon}</div>
                    <span className="font-mono text-sm text-[#037971]">{item.revenue}</span>
                  </div>
                  <h3 className="font-mono text-lg mb-4 text-[#333]">{item.title}</h3>
                  <p className="text-sm text-[#888] leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          BRIDGE — Infrastructure
          ════════════════════════════════════ */}
      <section className="bg-[#023436] py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-10 md:px-16 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
              Every closed gas station.<br />
              Every idle oil tank.<br />
              <span className="text-[#00FFB2]">Becomes an energy hub.</span>
            </h2>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════
          INFRASTRUCTURE — FIG. 3
          ════════════════════════════════════ */}
      <section className="bg-[#eeeeee] py-24 md:py-32 border-t border-[#d0d0d0]">
        <div className="max-w-[1400px] mx-auto px-10 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-16">
            <Reveal>
              <div className="mono-label mb-4">Infrastructure Play</div>
              <h2 className="text-3xl md:text-4xl max-w-lg mb-8 text-[#222]">
                Repurpose fossil fuel infrastructure into
                <span className="text-[#037971]"> clean energy storage</span>
              </h2>
              <div className="space-y-6">
                {[
                  { title: "Closed Gas Station \u2192 Energy Node", desc: "Underground tanks: 3\u20135 tanks \u00D7 30,000\u201350,000 L = 90,000\u2013250,000 L. At 190 Wh/L \u2192 17\u201347 MWh per station." },
                  { title: "Decommissioned Oil Tank \u2192 Grid Battery", desc: "Standard oil tank: 5,000\u201350,000 m\u00B3. At 190 Wh/L \u2192 1 tank of 5,000 m\u00B3 = 950 MWh of storage." },
                ].map((item) => (
                  <div key={item.title} className="border-l-2 border-[#037971]/30 pl-6">
                    <h4 className="font-mono text-sm mb-2 text-[#444]">{item.title}</h4>
                    <p className="text-sm text-[#888] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="border border-[#d0d0d0] bg-[#e8e8e8] p-4 md:p-6">
                <InfrastructureDiagram />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          IP & DEFENSIBILITY
          ════════════════════════════════════ */}
      <section className="bg-[#e8e8e8] py-24 md:py-32 border-t border-[#d0d0d0]">
        <div className="max-w-[1400px] mx-auto px-10 md:px-16">
          <Reveal>
            <div className="mono-label mb-4">IP & Defensibility</div>
            <h2 className="text-3xl md:text-4xl max-w-3xl mb-16 text-[#222]">
              Multiple layers of protection around our <span className="text-[#037971]">core innovation</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[#d0d0d0]">
            {[
              { title: "Proprietary Electrolyte Chemistry", desc: "Optimized chloroaluminate anolyte and phenothiazine catholyte formulations. Patent pathway for multi-electron system architecture." },
              { title: ">8,000-Cycle Validation Dataset", desc: "Extensive lab data on electrochemical stability, capacity fade, and safety. Proprietary computational models validated in laboratory." },
              { title: "University Partnership", desc: "NDA-protected research collaboration. Co-development of next-gen catholyte formulations and pilot deployment near datacenter corridor." },
              { title: "CarboOS Software Platform", desc: "AI-driven battery management trained on real data. Predictive maintenance and energy arbitrage optimization for autonomous operation." }
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="bg-[#eeeeee] p-10 h-full group hover:bg-[#e6e6e6] transition-colors">
                  <div className="w-2 h-2 bg-[#037971] rounded-full mb-6 group-hover:shadow-[0_0_10px_rgba(3,121,113,0.3)] transition-shadow" />
                  <h3 className="font-mono text-base mb-3 text-[#333]">{item.title}</h3>
                  <p className="text-sm text-[#888] leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          ROADMAP
          ════════════════════════════════════ */}
      <section id="roadmap" className="bg-[#eeeeee] py-24 md:py-32 border-t border-[#d0d0d0]">
        <div className="max-w-[1400px] mx-auto px-10 md:px-16">
          <Reveal>
            <div className="mono-label mb-4">Roadmap</div>
            <h2 className="text-3xl md:text-4xl max-w-3xl mb-20 text-[#222]">
              Prototype &rarr; Pilot &rarr; <span className="text-[#037971]">Commercial</span>
            </h2>
          </Reveal>

          <div className="relative">
            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#037971] via-[#037971]/50 to-[#d0d0d0]" />

            <div className="space-y-16 md:pl-12">
              {[
                { phase: "Phase 1", year: "2026", title: "Global Pilot", cost: "Seed", active: true, items: ["1 MWh pilot with Utility partner (Europe/Asia)", "Validate full system integration", "Demonstrate performance for international scaling"] },
                { phase: "Phase 2", year: "2027", title: "US Entry & Large Scale", cost: "Series A", items: ["10–120 MWh system for AlmaSADI (Argentina)", "1 MWh US pilot at University of Nevada, Reno", "First revenue from utility-scale infrastructure"] },
                { phase: "Phase 3", year: "2028", title: "Commercial Scaling", cost: "Growth / Grants", items: ["Multi-site deployments for Datacenters & Oil infra reuse", "Establish US operational HQ and local BD team", "Target: $15M+ revenue run rate"] },
                { phase: "Phase 4", year: "2029+", title: "Grid Independence", cost: "Series B", items: ["100+ MWh LDES systems in ERCOT/CAISO markets", "Commission first local manufacturing facility", "Target: $50M+ ARR and global expansion"] },
              ].map((phase, i) => (
                <Reveal key={phase.phase} delay={i * 150}>
                  <div className="relative">
                    <div className={`hidden md:block absolute -left-12 top-1 w-3 h-3 rounded-full border ${
                      phase.active ? "bg-[#037971] border-[#037971] shadow-[0_0_10px_rgba(3,121,113,0.4)]" : "bg-[#ddd] border-[#bbb]"
                    }`} style={{ transform: "translateX(-5px)" }} />
                    <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                      <div className="md:min-w-[180px]">
                        <div className="font-mono text-xs text-[#037971] mb-1">{phase.phase}</div>
                        <div className="font-mono text-2xl text-[#333]">{phase.year}</div>
                        <div className="font-mono text-xs text-[#bbb] mt-1">{phase.cost}</div>
                      </div>
                      <div className="flex-1 border-l border-[#d0d0d0] pl-6 md:border-l-0 md:pl-0">
                        <h3 className="font-mono text-lg mb-4 text-[#333]">{phase.title}</h3>
                        <ul className="space-y-2">
                          {phase.items.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-sm text-[#888]">
                              <span className="text-[#037971] mt-1 text-xs">&#x25B8;</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          CTA / VISION
          ════════════════════════════════════ */}
      <section className="bg-[#023436] py-28 md:py-36">
        <div className="max-w-[1200px] mx-auto px-10 md:px-16 text-center">
          <Reveal>
            <div className="mono-label mb-6 !text-[#00FFB2]">The Vision</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl max-w-4xl mx-auto mb-8 font-bold leading-tight text-white">
              A world where every kilowatt of renewable energy
              <span className="text-[#00FFB2]"> is stored, not wasted</span>
            </h2>
            <p className="text-lg text-[#88b8b5] max-w-2xl mx-auto mb-12 font-light">
              Carbo Energy is building the storage infrastructure the planet needs.
              Safe. Durable. Affordable. Built to last a lifetime.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="mailto:dt@carbo.energy" className="inline-flex items-center gap-2 bg-[#00FFB2] text-[#023436] px-8 py-4 font-mono text-sm tracking-wider hover:bg-[#00e6a0] transition-colors">
                GET IN TOUCH
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" strokeWidth="1.5"/></svg>
              </a>
              {/* Cuando tengas el archivo, cambiá el href="#" por href="/docs/investors/nombre-del-archivo.pdf" */}
              <a href="#" download className="inline-flex items-center gap-2 border border-[#00FFB2]/40 text-white px-8 py-4 font-mono text-sm tracking-wider hover:border-[#00FFB2] transition-colors">
                WHITEPAPER
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════
          FOOTER
          ════════════════════════════════════ */}
      <footer className="border-t border-[#d0d0d0] bg-[#e4e4e4]">
        <div className="max-w-[1400px] mx-auto px-10 md:px-16 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="font-mono text-lg tracking-wider text-[#037971] mb-4">
                CARBO<span className="text-[#444]">.</span>ENERGY
              </div>
              <p className="text-sm text-[#888] max-w-sm leading-relaxed mb-8">
                Building the next generation of grid-scale energy storage with hybrid non-aqueous redox flow batteries.
              </p>
              <Link href="https://www.linkedin.com/company/carbo-energy/" className="text-[#888] hover:text-[#037971] transition-colors font-mono text-xs tracking-wider">
                LINKEDIN
              </Link>
            </div>
            <div>
              <div className="font-mono text-xs text-[#bbb] tracking-[0.15em] mb-4">CONTACT</div>
              <div className="space-y-2">
                <a href="mailto:dt@carbo.energy" className="block text-sm text-[#888] hover:text-[#037971] transition-colors font-mono">dt@carbo.energy</a>
                <a href="mailto:jobs@carbo.energy" className="block text-sm text-[#888] hover:text-[#037971] transition-colors font-mono">jobs@carbo.energy</a>
                <a href="mailto:info@carbo.energy" className="block text-sm text-[#888] hover:text-[#037971] transition-colors font-mono">info@carbo.energy</a>
              </div>
            </div>
            <div>
              <div className="font-mono text-xs text-[#bbb] tracking-[0.15em] mb-4">NAVIGATE</div>
              <div className="space-y-2">
                <a href="#science" className="block text-sm text-[#888] hover:text-[#037971] transition-colors font-mono">Science</a>
                <a href="#technology" className="block text-sm text-[#888] hover:text-[#037971] transition-colors font-mono">Technology</a>
                <a href="#markets" className="block text-sm text-[#888] hover:text-[#037971] transition-colors font-mono">Markets</a>
                <a href="#roadmap" className="block text-sm text-[#888] hover:text-[#037971] transition-colors font-mono">Roadmap</a>
                <Link href="/carbo-os" className="block text-sm text-[#888] hover:text-[#037971] transition-colors font-mono">CarboOS</Link>
              </div>
            </div>
          </div>

          <div className="separator mt-12 mb-8" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-mono text-xs text-[#bbb]">
              &copy; {new Date().getFullYear()} Carbo Energy Storage. All rights reserved.
            </div>
            <div className="font-mono text-[10px] text-[#d0d0d0] tracking-[0.2em]">
              GRID-SCALE STORAGE THAT LASTS A LIFETIME

            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
