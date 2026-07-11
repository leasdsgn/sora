import type { Metadata } from "next"
import Footer from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "Mentions légales | SORA Immobilier",
  description: "Mentions légales du site sora-immobilier.com.",
}

export default function MentionsLegalesPage() {
  return (
    <>
      <main className="bg-background min-h-screen px-6 pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto">
          <h1
            className="font-serif font-medium text-foreground leading-[0.95] mb-12"
            style={{ fontSize: "clamp(32px,4.5vw,56px)" }}
          >
            Mentions légales
          </h1>

          <div className="space-y-10 text-foreground/70 leading-relaxed">
            <section>
              <h2 className="font-serif font-medium text-foreground text-lg mb-4">Éditeur du site</h2>
              <p>
                Le site <strong className="text-foreground">sora-immobilier.com</strong> est édité par la société
                PT FIVE BLOOM INTERNATIONAL, exploitant la marque SORA IMMOBILIER.
              </p>
              <ul className="mt-4 space-y-2">
                <li><span className="text-foreground/50">N° société :</span> 1000 0000 0144 2012</li>
                <li><span className="text-foreground/50">Dénomination :</span> PT FIVE BLOOM INTERNATIONAL</li>
                <li><span className="text-foreground/50">Marque commerciale :</span> SORA IMMOBILIER</li>
                <li><span className="text-foreground/50">Directeur de la publication :</span> Gabriel Lapierre</li>
                <li><span className="text-foreground/50">Siège social :</span> Jalan Raya Semat N°17B, Tibubeneng, Bali, 80361 Indonésie</li>
                <li><span className="text-foreground/50">Email :</span> contact@sora-immobilier.com</li>
                <li><span className="text-foreground/50">Téléphone :</span> +33 6 33 51 77 46</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif font-medium text-foreground text-lg mb-4">Hébergement</h2>
              <p>
                Le site est hébergé par <strong className="text-foreground">Vercel Inc.</strong>,
                440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
              </p>
            </section>

            <section>
              <h2 className="font-serif font-medium text-foreground text-lg mb-4">Propriété intellectuelle</h2>
              <p>
                L&apos;ensemble des contenus présents sur le site (textes, images, vidéos, logos, éléments graphiques)
                sont la propriété exclusive de PT FIVE BLOOM INTERNATIONAL ou de ses partenaires. Toute reproduction,
                représentation ou diffusion, en tout ou partie, sans autorisation écrite préalable est interdite.
              </p>
            </section>

            <section>
              <h2 className="font-serif font-medium text-foreground text-lg mb-4">Données personnelles</h2>
              <p>
                Les informations recueillies via les formulaires du site (nom, email, téléphone) sont destinées
                exclusivement à PT FIVE BLOOM INTERNATIONAL pour le traitement de votre demande et l&apos;envoi
                d&apos;informations relatives aux projets immobiliers SORA.
              </p>
              <p className="mt-4">
                Conformément à la réglementation applicable en matière de protection des données personnelles,
                vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement et de portabilité
                de vos données, ainsi que d&apos;un droit d&apos;opposition et de limitation du traitement.
                Vous pouvez exercer ces droits en écrivant à contact@sora-immobilier.com.
              </p>
              <p className="mt-4">
                Vous pouvez vous désinscrire de nos communications à tout moment via le lien de désinscription
                présent dans chaque email.
              </p>
            </section>

            <section>
              <h2 className="font-serif font-medium text-foreground text-lg mb-4">Cookies</h2>
              <p>
                Le site utilise des cookies et des technologies similaires (Meta Pixel) à des fins de mesure
                d&apos;audience et d&apos;optimisation publicitaire. En poursuivant votre navigation, vous acceptez
                l&apos;utilisation de ces cookies.
              </p>
            </section>

            <section>
              <h2 className="font-serif font-medium text-foreground text-lg mb-4">Responsabilité</h2>
              <p>
                Les informations diffusées sur le site sont fournies à titre indicatif et ne constituent pas
                un conseil en investissement. Les rendements mentionnés sont des objectifs et ne constituent
                pas une garantie de résultat. Tout investissement immobilier comporte des risques. Il est
                recommandé de consulter un conseiller financier ou juridique indépendant avant toute décision
                d&apos;investissement.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
