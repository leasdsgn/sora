"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const FAQ = [
	  {
	    q: "Une présence physique à Bali est-elle nécessaire ?",
		    a: "Non. Sora assure le pilotage opérationnel et technique sur place, avec un suivi régulier pour les investisseurs basés en Europe.",
	  },
	  {
	    q: "Comment se déroule le flux de capital ?",
	    a: "Le processus se fait par étapes : réservation, acquisition ou construction, puis livraison. Les paiements sont liés à l'avancement réel du projet et aux validations prévues.",
	  },
	  {
	    q: "Comment fonctionnent fiscalité et revenus ?",
		    a: "Chaque montage dépend de votre situation, de la structure retenue et de vos objectifs patrimoniaux. Le sujet est analysé avant toute décision d'investissement.",
	  },
	  {
	    q: "Que se passe-t-il si je veux sortir de l'investissement ?",
	    a: "Vous restez propriétaire selon les modalités prévues dans la structure choisie. En cas d'arbitrage ou de cession, Sora peut accompagner les prochaines étapes.",
	  },
	  {
	    q: "Co-investissement ou villa en pleine propriété ?",
	    a: "Le co-investissement permet d'accéder à un projet avec un ticket plus bas. L'acquisition en pleine propriété convient à ceux qui veulent contrôler l'actif et son usage.",
	  },
	  {
	    q: "Comment savoir si Bali correspond à mon profil ?",
		    a: "Le plus simple est d'échanger sur votre situation, votre horizon de placement et vos contraintes. L'appel de 30 minutes sert précisément à clarifier ce point.",
	  },
]

export default function FaqSection() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faq-item", { opacity: 0, y: 18, duration: 0.7, stagger: 0.06, ease: "expo.out", scrollTrigger: { trigger: ref.current, start: "top 75%" } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="bg-bg py-24 md:py-36 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="faq-item font-mono text-[10px] tracking-[0.3em] uppercase text-ink-muted mb-6">Questions fréquentes</p>
	          <h2 className="faq-item font-serif font-medium text-ink leading-[1.0]" style={{ fontSize: "clamp(36px,5vw,72px)" }}>
            Ce que vous voulez savoir avant d&apos;investir.
          </h2>
        </div>
        <div>
          {FAQ.map((item, i) => (
            <details key={i} className="faq-item group border-t border-ink/12 last:border-b last:border-ink/12 py-6">
              <summary className="cursor-pointer flex items-start justify-between gap-6 list-none">
                <span className="font-serif text-lg md:text-xl text-ink font-medium pr-4">{item.q}</span>
                <span className="font-serif text-2xl text-ink/40 transition-transform duration-300 group-open:rotate-45 shrink-0 leading-none">+</span>
              </summary>
              <p className="mt-5 text-ink/70 leading-relaxed text-base max-w-2xl">{item.a}</p>
            </details>
          ))}
        </div>
        <p className="faq-item mt-12 text-center text-ink/55 text-sm">
          Une autre question ? <a href="#contact" className="text-accent hover:text-accent-soft underline underline-offset-4">Posez-la dans la masterclass</a>.
        </p>
      </div>
    </section>
  )
}
