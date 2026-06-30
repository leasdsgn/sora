"use client"

export default function SpinningBadge({ className = "" }: { className?: string }) {
  const text = "CANGGU / BALI / INDONÉSIE / SORA IMMOBILIER / "
  const perimeter = 2 * Math.PI * 62 // circle radius = 62
  return (
    <div className={`relative w-[128px] h-[128px] pointer-events-none ${className}`}>
      {/* Rotating ring of text, no bg disc */}
      <svg viewBox="0 0 160 160" className="absolute inset-0 w-full h-full animate-spin-slow">
        <defs>
          <path
            id="badge-ring"
            d="M 80,80 m -62,0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0"
          />
        </defs>
        <text
          style={{
            fill: "var(--color-ink)",
            fontFamily: "var(--font-sans)",
            fontSize: "13px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          <textPath
            href="#badge-ring"
            startOffset="0"
            textLength={perimeter}
            lengthAdjust="spacing"
          >
            {text}
          </textPath>
        </text>
      </svg>

      {/* Indonesian flag, centered, static */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40px] h-[28px] rounded-[3px] overflow-hidden ring-1 ring-ink/25">
        <div className="h-1/2 bg-[#E70011]" />
        <div className="h-1/2 bg-white" />
      </div>
    </div>
  )
}
