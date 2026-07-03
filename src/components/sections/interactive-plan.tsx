"use client"
import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"

type Zone = {
  id: string
  label: string
  label2?: string
  photo?: string
  shape: "rect" | "polygon"
  coords: string
  fontSize?: number
  labelX: number
  labelY: number
  clickable?: boolean
  fill?: string
  textFill?: string
}

type StaticZone = {
  shape: "rect" | "polygon"
  coords: string
  fill: string
  stroke?: string
  label?: string
  labelX?: number
  labelY?: number
  textFill?: string
  fontSize?: number
  label2?: string
  label2Y?: number
  dashed?: boolean
}

type Wall = string

type Floor = {
  id: string
  label: string
  zones: Zone[]
  statics?: StaticZone[]
  walls: Wall[]
  dashedLines?: string[]
}

type Villa = {
  name: string
  floors: Floor[]
}

const FILL_DEFAULT = "rgba(244,240,233,0.58)"
const FILL_HOVER = "rgba(225,217,201,0.88)"
const FILL_SELECTED = "rgba(223,214,197,0.95)"
const STROKE_DEFAULT = "rgba(61,57,52,0.95)"
const STROKE_ACCENT = "#A3968D"
const TEXT_FILL = "rgba(52,48,44,0.9)"

const VILLAS: Villa[] = [
  {
    name: "Élégance",
    floors: [
      {
        id: "rdc", label: "RDC",
        zones: [
          { id: "living", label: "Living Room", photo: "/seseh/elegance/living.jpg", shape: "rect", coords: "0,0,260,210", labelX: 130, labelY: 110, clickable: true },
          { id: "kitchen", label: "Cuisine", photo: "/seseh/elegance/kitchen.jpg", shape: "rect", coords: "260,0,240,210", labelX: 380, labelY: 110, clickable: true },
          { id: "terrace", label: "Terrasse", photo: "/seseh/elegance/terrace.jpg", shape: "rect", coords: "0,210,500,90", labelX: 250, labelY: 260, clickable: true },
        ],
        statics: [
          { shape: "rect", coords: "0,300,250,81", fill: "rgba(178,210,225,0.55)", stroke: STROKE_DEFAULT, label: "Jacuzzi", labelX: 125, labelY: 345, textFill: "rgba(50,80,100,0.9)" },
          { shape: "rect", coords: "250,300,250,81", fill: "rgba(190,205,180,0.5)", stroke: STROKE_DEFAULT, label: "Jardin", labelX: 375, labelY: 345, textFill: "rgba(60,80,55,0.9)" },
        ],
        walls: ["M 0 0 L 500 0 L 500 300 L 0 300 Z", "M 0 300 L 0 381 L 500 381 L 500 300"],
        dashedLines: ["260,0,260,210"],
      },
      {
        id: "etage", label: "Étage",
        zones: [
          { id: "bedroom1", label: "Chambre", photo: "/seseh/elegance/bedroom1.jpg", shape: "rect", coords: "0,0,320,280", labelX: 160, labelY: 140, clickable: true },
          { id: "bath2", label: "Salle de bain", photo: "/seseh/elegance/bath2.jpg", shape: "rect", coords: "320,0,180,280", labelX: 410, labelY: 140, clickable: true },
        ],
        statics: [
          { shape: "rect", coords: "0,280,500,101", fill: "rgba(225,222,215,0.5)", label: "Terrasse (accès RDC)", labelX: 250, labelY: 335, textFill: "rgba(94,89,82,0.55)", dashed: true },
        ],
        walls: ["M 0 0 L 500 0 L 500 381 L 0 381 Z", "M 320 0 L 320 280", "M 0 280 L 500 280"],
      },
    ],
  },
  {
    name: "Prestige",
    floors: [
      {
        id: "rdc", label: "RDC",
        zones: [
          { id: "toilet", label: "Toilettes", photo: "/seseh/prestige/toilet.jpg", shape: "rect", coords: "0,0,77,54", labelX: 38.5, labelY: 32, fontSize: 11, clickable: true },
          { id: "kitchen", label: "Cuisine", photo: "/seseh/prestige/kitchen.jpg", shape: "polygon", coords: "0,54 140,54 140,210 0,210", labelX: 70, labelY: 135, clickable: true },
          { id: "dining", label: "Dining", photo: "/seseh/prestige/dining.jpg", shape: "polygon", coords: "140,54 279,54 279,210 140,210", labelX: 209.5, labelY: 135, clickable: true },
          { id: "living", label: "Living", photo: "/seseh/prestige/living.jpg", shape: "polygon", coords: "279,0 500,0 500,210 279,210", labelX: 389.5, labelY: 110, clickable: true },
          { id: "terrace", label: "Terrasse", photo: "/seseh/prestige/terrace.jpg", shape: "rect", coords: "0,210,500,171", labelX: 250, labelY: 232, clickable: true },
        ],
        statics: [
          { shape: "rect", coords: "77,0,202,54", fill: "rgba(225,222,215,0.5)" },
          { shape: "rect", coords: "0,252,209,129", fill: "rgba(178,210,225,0.55)", label: "Piscine", labelX: 104.5, labelY: 320, textFill: "rgba(50,80,100,0.9)" },
          { shape: "rect", coords: "257,252,137,129", fill: "rgba(190,205,180,0.5)", label: "Jardin", labelX: 325.5, labelY: 320, textFill: "rgba(60,80,55,0.9)" },
          { shape: "rect", coords: "394,252,106,129", fill: "rgba(225,222,215,0.65)", label: "Parking", labelX: 447, labelY: 320, textFill: "rgba(52,48,44,0.85)" },
        ],
        walls: ["M 0 0 L 500 0 L 500 210 L 0 210 Z", "M 77 0 L 77 54", "M 0 54 L 279 54", "M 279 0 L 279 54", "M 0 210 L 0 381 L 500 381 L 500 210", "M 0 252 L 209 252 L 209 381", "M 257 381 L 257 252 L 394 252 L 394 381", "M 394 252 L 500 252"],
        dashedLines: ["140,54,140,210", "279,54,279,210"],
      },
      {
        id: "etage", label: "Étage",
        zones: [
          { id: "bedroom1", label: "Chambre 1", photo: "/seseh/prestige/bedroom1.jpg", shape: "polygon", coords: "250,0 500,0 500,280 250,280", labelX: 375, labelY: 145, clickable: true },
          { id: "bedroom2", label: "Chambre 2", photo: "/seseh/prestige/bedroom2.jpg", shape: "polygon", coords: "0,100 160,100 160,280 0,280", labelX: 80, labelY: 195, clickable: true },
          { id: "bath1", label: "Salle de bain", photo: "/seseh/prestige/bath1.jpg", shape: "polygon", coords: "160,100 250,100 250,280 160,280", labelX: 205, labelY: 190, fontSize: 12, clickable: true },
        ],
        statics: [
          { shape: "rect", coords: "0,0,250,100", fill: "rgba(225,222,215,0.5)" },
          { shape: "rect", coords: "40,0,170,56", fill: "rgba(225,222,215,0.7)", stroke: "rgba(61,57,52,0.6)" },
          { shape: "rect", coords: "0,280,500,101", fill: "rgba(225,222,215,0.5)", label: "Terrasse (accès RDC)", labelX: 250, labelY: 335, textFill: "rgba(94,89,82,0.55)", dashed: true },
        ],
        walls: ["M 0 0 L 500 0 L 500 381 L 0 381 Z", "M 0 280 L 500 280", "M 0 100 L 250 100", "M 160 100 L 160 280", "M 250 0 L 250 280"],
      },
    ],
  },
  {
    name: "Signature",
    floors: [
      {
        id: "rdc", label: "RDC",
        zones: [
          { id: "toilet", label: "Toilettes", photo: "/seseh/signature/toilet.jpg", shape: "rect", coords: "0,0,77,54", labelX: 38.5, labelY: 32, fontSize: 11, clickable: true },
          { id: "kitchen", label: "Cuisine", photo: "/seseh/signature/kitchen.jpg", shape: "polygon", coords: "0,54 140,54 140,210 0,210", labelX: 70, labelY: 135, clickable: true },
          { id: "dining", label: "Dining", photo: "/seseh/signature/dining.jpg", shape: "polygon", coords: "140,54 279,54 279,210 140,210", labelX: 209.5, labelY: 135, clickable: true },
          { id: "living", label: "Living", label2: "Room", photo: "/seseh/signature/living.jpg", shape: "polygon", coords: "279,0 500,0 500,210 279,210", labelX: 389.5, labelY: 100, clickable: true },
          { id: "terrace", label: "Terrasse", photo: "/seseh/signature/terrace.jpg", shape: "rect", coords: "0,210,500,171", labelX: 250, labelY: 232, clickable: true },
        ],
        statics: [
          { shape: "rect", coords: "77,0,202,54", fill: "rgba(225,222,215,0.5)" },
          { shape: "rect", coords: "0,252,209,129", fill: "rgba(178,210,225,0.55)", label: "Piscine", labelX: 104.5, labelY: 320, textFill: "rgba(50,80,100,0.9)" },
          { shape: "rect", coords: "257,252,137,129", fill: "rgba(190,205,180,0.5)", label: "Jardin", labelX: 325.5, labelY: 320, textFill: "rgba(60,80,55,0.9)" },
          { shape: "rect", coords: "394,252,106,129", fill: "rgba(225,222,215,0.65)", label: "Parking", labelX: 447, labelY: 320, textFill: "rgba(52,48,44,0.85)" },
        ],
        walls: ["M 0 0 L 500 0 L 500 210 L 0 210 Z", "M 77 0 L 77 54", "M 0 54 L 279 54", "M 279 0 L 279 54", "M 0 210 L 0 381 L 500 381 L 500 210", "M 0 252 L 209 252 L 209 381", "M 257 381 L 257 252 L 394 252 L 394 381", "M 394 252 L 500 252"],
        dashedLines: ["140,54,140,210", "279,54,279,210"],
      },
      {
        id: "etage", label: "Étage",
        zones: [
          { id: "bedroom1", label: "Chambre 1", photo: "/seseh/signature/bedroom1.jpg", shape: "polygon", coords: "302,0 500,0 500,276 346,276 346,99 302,99", labelX: 423, labelY: 155, clickable: true },
          { id: "bedroom2", label: "Chambre 2", photo: "/seseh/signature/bedroom2.jpg", shape: "polygon", coords: "0,99 160,99 160,276 0,276", labelX: 80, labelY: 192, clickable: true },
          { id: "office", label: "Bureau", photo: "/seseh/signature/office.jpg", shape: "polygon", coords: "160,99 254,99 254,163 160,163", labelX: 207, labelY: 135, fontSize: 13, clickable: true },
          { id: "bath2", label: "Salle de", label2: "bain 2", photo: "/seseh/signature/bath2.jpg", shape: "polygon", coords: "160,163 254,163 254,276 160,276", labelX: 207, labelY: 215, fontSize: 12, clickable: true },
          { id: "bath1", label: "Salle de", label2: "bain 1", photo: "/seseh/signature/bath1.jpg", shape: "polygon", coords: "254,99 346,99 346,276 254,276", labelX: 300, labelY: 180, fontSize: 12, clickable: true },
        ],
        statics: [
          { shape: "rect", coords: "0,0,302,99", fill: "rgba(225,222,215,0.5)" },
          { shape: "rect", coords: "43,0,192,56", fill: "rgba(225,222,215,0.7)", stroke: "rgba(61,57,52,0.6)" },
          { shape: "rect", coords: "0,276,401,105", fill: "rgba(225,222,215,0.5)", label: "Terrasse", labelX: 200.5, labelY: 325, textFill: "rgba(94,89,82,0.55)", label2: "accès rez-de-chaussée", label2Y: 341, dashed: true },
          { shape: "rect", coords: "401,276,99,105", fill: "rgba(225,222,215,0.5)", label: "Parking", labelX: 450.5, labelY: 332, textFill: "rgba(94,89,82,0.55)", dashed: true },
        ],
        walls: ["M 0 0 L 500 0 L 500 381 L 0 381 Z", "M 0 276 L 500 276", "M 401 276 L 401 381", "M 0 99 L 302 99 L 302 0", "M 302 99 L 346 99", "M 160 99 L 160 276", "M 160 163 L 254 163", "M 254 99 L 254 276", "M 346 99 L 346 276"],
      },
    ],
  },
  {
    name: "Exception",
    floors: [
      {
        id: "rdc", label: "RDC",
        zones: [
          { id: "toilet", label: "Toilettes", photo: "/seseh/exception/toilet.jpg", shape: "rect", coords: "0,0,77,54", labelX: 38.5, labelY: 32, fontSize: 11, clickable: true },
          { id: "kitchen", label: "Cuisine", photo: "/seseh/exception/kitchen.jpg", shape: "polygon", coords: "0,54 140,54 140,210 0,210", labelX: 70, labelY: 135, clickable: true },
          { id: "dining", label: "Dining", photo: "/seseh/exception/dining.jpg", shape: "polygon", coords: "140,54 279,54 279,210 140,210", labelX: 209.5, labelY: 135, clickable: true },
          { id: "living", label: "Living Room", photo: "/seseh/exception/living.jpg", shape: "polygon", coords: "279,0 500,0 500,130 279,130", labelX: 389.5, labelY: 70, clickable: true },
          { id: "office", label: "Bureau", photo: "/seseh/exception/office.jpg", shape: "polygon", coords: "279,130 500,130 500,210 279,210", labelX: 389.5, labelY: 175, fontSize: 13, clickable: true },
          { id: "terrace", label: "Terrasse", photo: "/seseh/exception/terrace.jpg", shape: "rect", coords: "0,210,500,171", labelX: 250, labelY: 232, clickable: true },
        ],
        statics: [
          { shape: "rect", coords: "77,0,202,54", fill: "rgba(225,222,215,0.5)" },
          { shape: "rect", coords: "0,252,209,129", fill: "rgba(178,210,225,0.55)", label: "Piscine", labelX: 104.5, labelY: 320, textFill: "rgba(50,80,100,0.9)" },
          { shape: "rect", coords: "257,252,137,129", fill: "rgba(190,205,180,0.5)", label: "Jardin", labelX: 325.5, labelY: 320, textFill: "rgba(60,80,55,0.9)" },
          { shape: "rect", coords: "394,252,106,129", fill: "rgba(225,222,215,0.65)", label: "Parking", labelX: 447, labelY: 320, textFill: "rgba(52,48,44,0.85)" },
        ],
        walls: ["M 0 0 L 500 0 L 500 210 L 0 210 Z", "M 77 0 L 77 54", "M 0 54 L 279 54", "M 279 0 L 279 54", "M 279 130 L 500 130", "M 0 210 L 0 381 L 500 381 L 500 210", "M 0 252 L 209 252 L 209 381", "M 257 381 L 257 252 L 394 252 L 394 381", "M 394 252 L 500 252"],
        dashedLines: ["140,54,140,210", "279,54,279,210"],
      },
      {
        id: "etage", label: "Étage",
        zones: [
          { id: "bedroom1", label: "Chambre 1", photo: "/seseh/exception/bedroom1.jpg", shape: "polygon", coords: "302,0 500,0 500,276 346,276 346,99 302,99", labelX: 423, labelY: 155, clickable: true },
          { id: "bedroom2", label: "Chambre 2", photo: "/seseh/exception/bedroom2.jpg", shape: "polygon", coords: "0,99 120,99 120,276 0,276", labelX: 60, labelY: 192, clickable: true },
          { id: "bedroom3", label: "Chambre 3", photo: "/seseh/exception/bedroom3.jpg", shape: "polygon", coords: "120,99 200,99 200,276 120,276", labelX: 160, labelY: 192, fontSize: 13, clickable: true },
          { id: "bath2", label: "SdB 2", photo: "/seseh/exception/bath2.jpg", shape: "polygon", coords: "200,99 260,99 260,188 200,188", labelX: 230, labelY: 148, fontSize: 10, clickable: true },
          { id: "bath3", label: "SdB 3", photo: "/seseh/exception/bath3.jpg", shape: "polygon", coords: "200,188 260,188 260,276 200,276", labelX: 230, labelY: 236, fontSize: 10, clickable: true },
          { id: "bath1", label: "SdB 1", photo: "/seseh/exception/bath1.jpg", shape: "polygon", coords: "260,99 346,99 346,276 260,276", labelX: 303, labelY: 192, fontSize: 12, clickable: true },
        ],
        statics: [
          { shape: "rect", coords: "0,0,302,99", fill: "rgba(225,222,215,0.5)" },
          { shape: "rect", coords: "43,0,192,56", fill: "rgba(225,222,215,0.7)", stroke: "rgba(61,57,52,0.6)" },
          { shape: "rect", coords: "0,276,401,105", fill: "rgba(225,222,215,0.5)", label: "Terrasse (accès RDC)", labelX: 200.5, labelY: 335, textFill: "rgba(94,89,82,0.55)", dashed: true },
          { shape: "rect", coords: "401,276,99,105", fill: "rgba(225,222,215,0.5)", label: "Parking", labelX: 450.5, labelY: 332, textFill: "rgba(94,89,82,0.55)", dashed: true },
        ],
        walls: ["M 0 0 L 500 0 L 500 381 L 0 381 Z", "M 0 276 L 500 276", "M 401 276 L 401 381", "M 0 99 L 302 99 L 302 0", "M 302 99 L 346 99", "M 120 99 L 120 276", "M 200 99 L 200 276", "M 260 99 L 260 276", "M 200 188 L 260 188", "M 346 99 L 346 276"],
      },
    ],
  },
]

function parseRect(coords: string) {
  const [x, y, w, h] = coords.split(",").map(Number)
  return { x, y, width: w, height: h }
}

function RenderZone({ zone, isSelected, isHovered }: { zone: Zone; isSelected: boolean; isHovered: boolean }) {
  const fill = isSelected ? FILL_SELECTED : isHovered ? FILL_HOVER : FILL_DEFAULT
  const stroke = isSelected || isHovered ? STROKE_ACCENT : STROKE_DEFAULT
  const strokeWidth = isSelected ? 1.8 : isHovered ? 1.5 : 1
  const fs = zone.fontSize || 14

  return (
    <g data-room={zone.id} style={{ cursor: zone.clickable ? "pointer" : "default" }}>
      {zone.shape === "rect" ? (
        <rect {...parseRect(zone.coords)} style={{ fill, stroke, strokeWidth, transition: "all 0.15s" }} />
      ) : (
        <polygon points={zone.coords} style={{ fill, stroke, strokeWidth, transition: "all 0.15s" }} />
      )}
      <text
        x={zone.labelX} y={zone.labelY}
        textAnchor="middle"
        style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: fs, fill: TEXT_FILL, pointerEvents: "none" }}
      >
        {zone.label}
      </text>
      {zone.label2 && (
        <text
          x={zone.labelX} y={zone.labelY + 16}
          textAnchor="middle"
          style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: fs, fill: TEXT_FILL, pointerEvents: "none" }}
        >
          {zone.label2}
        </text>
      )}
    </g>
  )
}

function RenderStatic({ s }: { s: StaticZone }) {
  const r = s.shape === "rect" ? parseRect(s.coords) : null
  return (
    <g pointerEvents="none">
      {r ? (
        <rect {...r} fill={s.fill} stroke={s.stroke || "none"} strokeWidth={s.stroke ? 1 : 0} />
      ) : (
        <polygon points={s.coords} fill={s.fill} stroke={s.stroke || "none"} strokeWidth={s.stroke ? 1 : 0} />
      )}
      {s.dashed && r && (
        <g stroke="rgba(61,57,52,0.18)" strokeWidth="0.6" strokeDasharray="3 2" fill="none">
          <line x1={r.x} y1={r.y} x2={r.x + r.width} y2={r.y + r.height} />
          <line x1={r.x + r.width} y1={r.y} x2={r.x} y2={r.y + r.height} />
        </g>
      )}
      {s.label && s.labelX != null && s.labelY != null && (
        <text
          x={s.labelX} y={s.labelY} textAnchor="middle"
          style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: s.fontSize || 13, fill: s.textFill || "rgba(52,48,44,0.85)", pointerEvents: "none" }}
        >
          {s.label}
        </text>
      )}
      {s.label2 && s.labelX != null && (
        <text
          x={s.labelX} y={s.label2Y || (s.labelY! + 16)} textAnchor="middle"
          style={{ fontFamily: "var(--font-sans, Inter, sans-serif)", fontSize: 8, letterSpacing: "0.06em", fill: s.textFill || "rgba(94,89,82,0.45)", pointerEvents: "none" }}
        >
          {s.label2}
        </text>
      )}
    </g>
  )
}

export default function InteractivePlan() {
  const [villaIdx, setVillaIdx] = useState(0)
  const [floorIdx, setFloorIdx] = useState(0)
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const planRef = useRef<HTMLDivElement>(null)

  const villa = VILLAS[villaIdx]
  const floor = villa.floors[floorIdx]
  const allRooms = villa.floors.flatMap((f) => f.zones).filter((z) => z.clickable)
  const selectedPhoto = allRooms.find((r) => r.id === selectedRoom)?.photo
  const hoveredLabel = allRooms.find((r) => r.id === hoveredRoom)?.label

  useEffect(() => { setFloorIdx(0); setSelectedRoom(null) }, [villaIdx])
  useEffect(() => { setSelectedRoom(null) }, [floorIdx])

  const handleSvgClick = useCallback((e: React.MouseEvent) => {
    const target = (e.target as SVGElement).closest("[data-room]")
    if (target) {
      const roomId = target.getAttribute("data-room")!
      setSelectedRoom((prev) => (prev === roomId ? null : roomId))
    }
  }, [])

  const handleSvgMouseOver = useCallback((e: React.MouseEvent) => {
    const target = (e.target as SVGElement).closest("[data-room]")
    if (target) setHoveredRoom(target.getAttribute("data-room"))
  }, [])

  const handleSvgMouseOut = useCallback((e: React.MouseEvent) => {
    const target = (e.target as SVGElement).closest("[data-room]")
    if (target) setHoveredRoom(null)
  }, [])

  const handleSvgMouseMove = useCallback((e: React.MouseEvent) => {
    setTooltipPos({ x: e.clientX, y: e.clientY })
  }, [])

  return (
    <section className="bg-bg py-24 md:py-36 px-6">
      <div className="container-page max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="ss-fade eyebrow mx-auto mb-6">Explorez chaque villa</p>
          <h2 className="ss-fade font-serif font-medium text-ink leading-[1.0]" style={{ fontSize: "clamp(32px,4vw,60px)" }}>
            Plan interactif.
          </h2>
          <p className="ss-fade text-ink/60 mt-4 max-w-lg mx-auto">
            Sélectionnez une gamme puis cliquez sur une pièce pour voir l&apos;intérieur.
          </p>
        </div>

        <div className="ss-fade flex justify-center gap-2 mb-8">
          {VILLAS.map((v, i) => (
            <button
              key={v.name}
              onClick={() => setVillaIdx(i)}
              className={`metadata px-5 py-2.5 border transition-all duration-300 ${
                villaIdx === i ? "bg-ink text-bg border-ink" : "bg-transparent text-ink/70 border-line hover:border-ink/40"
              }`}
            >
              {v.name}
            </button>
          ))}
        </div>

        <div
          className="ss-fade grid gap-0"
          style={{
            gridTemplateColumns: selectedPhoto ? "1.08fr 1.22fr" : "1fr 0fr",
            transition: "grid-template-columns 0.7s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <div
            className="p-4 md:p-6"
            ref={planRef}
            onClick={handleSvgClick}
            onMouseOver={handleSvgMouseOver}
            onMouseOut={handleSvgMouseOut}
            onMouseMove={handleSvgMouseMove}
          >
            <div className="flex justify-between items-end mb-4 max-w-[520px] mx-auto">
              <div>
                <p className="metadata text-ink/90 font-semibold tracking-[0.18em]">{villa.name}</p>
                <p className="text-ink/50 text-[11px] tracking-[0.15em] uppercase mt-1">Sélectionnez une pièce</p>
              </div>
              <div className="flex gap-1.5">
                {villa.floors.map((f, i) => (
                  <button
                    key={f.id}
                    onClick={(e) => { e.stopPropagation(); setFloorIdx(i) }}
                    className={`metadata px-4 py-2 border transition-all duration-200 ${
                      floorIdx === i ? "text-ink border-ink/50 bg-white/60" : "text-ink/60 border-ink/20 bg-bg-soft/50 hover:border-ink/40"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center max-w-[640px] mx-auto">
              <svg viewBox="-1 -1 502 383" className="w-full h-auto block" style={{ maxHeight: 420 }}>
                {floor.statics?.map((s, i) => <RenderStatic key={i} s={s} />)}
                {floor.zones.map((z) => (
                  <RenderZone key={z.id} zone={z} isSelected={selectedRoom === z.id} isHovered={hoveredRoom === z.id} />
                ))}
                <g pointerEvents="none" fill="none" stroke="rgba(61,57,52,0.95)" strokeWidth="1.5" strokeLinecap="square">
                  {floor.walls.map((d, i) => <path key={i} d={d} />)}
                </g>
                {floor.dashedLines?.map((line, i) => {
                  const [x1, y1, x2, y2] = line.split(",").map(Number)
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(61,57,52,0.55)" strokeWidth="1.5" strokeDasharray="4 3" pointerEvents="none" />
                })}
              </svg>
            </div>
          </div>

          <div
            className="overflow-hidden p-3"
            style={{ opacity: selectedPhoto ? 1 : 0, transition: "opacity 0.5s ease 0.15s" }}
          >
            {selectedPhoto && (
              <div className="relative w-full aspect-[4/3] bg-bg-soft border border-line">
                <Image
                  src={selectedPhoto}
                  alt={allRooms.find((r) => r.id === selectedRoom)?.label || ""}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 50vw"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {hoveredRoom && (
        <div
          className="fixed pointer-events-none z-50 hidden md:block"
          style={{
            left: tooltipPos.x + 12,
            top: tooltipPos.y,
            transform: "translateY(-50%)",
            fontFamily: "var(--font-sans, Inter, sans-serif)",
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(247,243,237,0.92)",
            background: "rgba(58,54,49,0.92)",
            border: "1px solid rgba(255,255,255,0.14)",
            padding: "4px 9px",
          }}
        >
          {hoveredLabel}
        </div>
      )}
    </section>
  )
}
