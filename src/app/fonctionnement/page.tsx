import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Footer from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "Fonctionnement | SORA Immobilier",
  description:
    "Sora gère toutes les étapes de votre investissement à Bali : sélection du foncier, structuration juridique, conception, travaux et gestion locative.",
}

const STEPS = [
  {
    title: "Sélection terrain",
    desc: "Analyse des emplacements, scénarios d'usage et potentiel locatif avant engagement.",
  },
  {
    title: "Structuration juridique",
    desc: "Cadre PT PMA, leasehold et contrats vérifiés avec les partenaires locaux.",
  },
  {
    title: "Conception & travaux",
    desc: "Architecture, ingénierie et pilotage du chantier avec reporting et validation des étapes clés sur place.",
  },
  {
    title: "Gestion locative",
    desc: "Mise en exploitation, distribution, suivi des revenus et arbitrage des scénarios.",
  },
]

const PARTNERS = [
  {
    name: "Vienna Lux Cooperation",
    role: "Maîtrise d'œuvre",
    desc: "Architecture et ingénierie des projets, de la conception à la livraison.",
  },
  {
    name: "ILA Global Consulting",
    role: "Cabinet légal",
    desc: "Juridique, notaire et comptabilité : le cadre de chaque opération est vérifié et documenté.",
  },
  {
    name: "Julie",
    role: "Architecte d'intérieur",
    desc: "Architecte d'intérieur de renommée internationale, en charge des intérieurs de nos projets.",
  },
]

export default function FonctionnementPage() {
  return (
    <>
      <section className="bg-bg px-6 pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="container-page max-w-5xl mx-auto text-center">
          <p className="eyebrow mb-6">Fonctionnement</p>
          <h1
            className="font-serif font-medium text-ink leading-[0.95]"
            style={{ fontSize: "clamp(36px,5vw,72px)" }}
          >
            Toutes les étapes, gérées par une seule équipe.
          </h1>
          <p className="text-ink/70 mt-8 leading-relaxed text-lg max-w-2xl mx-auto">
            De la sélection du foncier à la gestion locative, Sora pilote l&apos;intégralité du
            projet sur place. Vous avancez depuis l&apos;Europe avec une lecture claire de chaque
            étape.
          </p>
        </div>

        <div className="container-page max-w-5xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
          {STEPS.map((step, i) => (
            <div key={step.title}>
              <Separator className="bg-ink/10" />
              <div className="flex gap-5 pt-6 pb-8">
                <span className="metadata text-ink/50">0{i + 1}</span>
                <div>
                  <h2 className="font-serif text-2xl text-ink mb-2">{step.title}</h2>
                  <p className="text-ink/65 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary px-6 py-24 md:py-36">
        <div className="container-page max-w-5xl mx-auto text-center mb-16">
          <p className="eyebrow-dark mb-8">Nos partenaires</p>
          <h2
            className="font-serif font-medium text-background leading-[1.0]"
            style={{ fontSize: "clamp(32px,4.5vw,64px)" }}
          >
            Une équipe projet constituée sur place.
          </h2>
        </div>
        <div className="container-page max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {PARTNERS.map((p) => (
            <div key={p.name} className="rounded-sm border border-background/10 bg-background/5 p-8">
              <p className="tertiary text-background/55 mb-3">{p.role}</p>
              <h3 className="font-serif text-2xl text-background mb-3">{p.name}</h3>
              <p className="text-background/70 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
        <div className="container-page max-w-5xl mx-auto mt-16 text-center">
          <Button asChild variant="inverse">
            <Link href="/contact">Réserver un appel offert</Link>
          </Button>
        </div>
      </section>
      <Footer />
    </>
  )
}
