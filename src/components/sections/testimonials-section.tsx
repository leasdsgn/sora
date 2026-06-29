"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const DECISION_POINTS = [
  {
    title: "Le cadre juridique doit être compris avant le ticket d'entrée.",
    body: "L'appel sert à clarifier la structure prévue, les contrats, les droits d'usage et les points à valider avec les conseils locaux.",
  },
  {
    title: "Le rendement annoncé n'a de valeur que si les hypothèses sont lisibles.",
    body: "Le dossier doit expliquer les charges, le mode d'exploitation, la saisonnalité et ce qui reste réellement à la charge de l'investisseur.",
  },
  {
    title: "La sortie doit être envisagée dès le départ.",
    body: "Selon votre horizon, Gabriel détaille les scénarios de conservation, de cession ou de revente pour éviter de découvrir les contraintes trop tard.",
  },
]

export default function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tm-item", { opacity: 0, y: 28, duration: 0.9, stagger: 0.12, ease: "expo.out", scrollTrigger: { trigger: ref.current, start: "top 70%" } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="bg-bg-soft py-24 md:py-36 px-6">
      <div className="container-page">
        <div className="text-center max-w-5xl mx-auto mb-16">
          <p className="tm-item font-mono text-[10px] tracking-[0.3em] text-ink-muted mb-6">Avant de demander le dossier</p>
	          <h2 className="tm-item font-serif font-medium text-ink leading-[1.0]" style={{ fontSize: "clamp(36px,5vw,72px)" }}>
            Les bons sujets doivent être cadrés avant d&apos;investir.
          </h2>
          <p className="tm-item text-ink/65 max-w-xl mx-auto mt-6 leading-relaxed">
            Le risque vient rarement d&apos;une seule mauvaise décision. Il apparaît quand le montage, le calendrier ou l&apos;exploitation restent flous au moment de signer.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {DECISION_POINTS.map((point, i) => (
            <div key={i} className="tm-item bg-bg-mid p-8 md:p-10 rounded-sm flex flex-col">
              <span className="font-mono text-[10px] tracking-[0.18em] text-ink/45 mb-8">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-serif text-2xl text-ink leading-snug mb-5 flex-1">{point.title}</h3>
              <div className="border-t border-ink/15 pt-5">
                <p className="text-sm text-ink/70 leading-relaxed">{point.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
