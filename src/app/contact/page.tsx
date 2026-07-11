import type { Metadata } from "next"
import Footer from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "Contact | SORA Immobilier",
  description: "Réservez un appel offert avec Gabriel pour cadrer votre projet d'investissement à Bali.",
}

const CALENDLY_URL =
  "https://calendly.com/contact-sora-immobilier/rdv-avec-gabriel-investir-a-bali?utm_source=contact&hide_gdpr_banner=1"

export default function ContactPage() {
  return (
    <>
      <section className="bg-bg px-6 pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="container-page max-w-5xl mx-auto text-center">
          <p className="eyebrow mb-6">Contact / Appel offert</p>
          <h1
            className="font-serif font-medium text-ink leading-[0.95]"
            style={{ fontSize: "clamp(36px,5vw,72px)" }}
          >
            Réservez un appel avec Gabriel.
          </h1>
          <p className="text-ink/70 mt-8 leading-relaxed text-lg max-w-2xl mx-auto">
            Pendant l&apos;appel, Gabriel vérifie votre situation, le montant envisagé, votre horizon
            de placement et les points juridiques à clarifier avant de vous envoyer le dossier.
          </p>
        </div>

        <div className="container-page max-w-5xl mx-auto mt-12">
          <iframe
            src={CALENDLY_URL}
            title="Réserver un appel avec Gabriel"
            className="w-full rounded-sm border border-ink/10 bg-white"
            style={{ height: "min(760px, 80vh)", minHeight: "600px" }}
            loading="lazy"
          />
        </div>

        <div className="container-page max-w-5xl mx-auto mt-12 text-center text-ink/60 text-base">
          <p>
            Vous pouvez aussi nous joindre directement :{" "}
            <a href="tel:+33633517746" className="text-ink underline underline-offset-4 hover:text-accent transition-colors">
              +33 6 33 51 77 46
            </a>{" "}
            ·{" "}
            <a href="mailto:contact@sora-immobilier.com" className="text-ink underline underline-offset-4 hover:text-accent transition-colors">
              contact@sora-immobilier.com
            </a>{" "}
            ·{" "}
            <a href="https://wa.me/message/U6SAMFGVWDQDO1" target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-4 hover:text-accent transition-colors">
              WhatsApp
            </a>
          </p>
        </div>
      </section>
      <Footer />
    </>
  )
}
