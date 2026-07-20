import { NextResponse } from "next/server"

const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Merci pour votre participation | SORA x Lybox</title>
<meta name="description" content="Vous avez participé au webinaire SORA x Lybox : définissez votre projet d'investissement à Bali, réservez un appel avec l'équipe, ou écrivez-nous sur WhatsApp." />
<meta name="robots" content="noindex, nofollow" />

<meta property="og:type" content="website" />
<meta property="og:title" content="Merci pour votre participation | SORA x Lybox" />
<meta property="og:description" content="Découvrez comment aller plus loin après le webinaire SORA x Lybox : définissez votre projet, réservez un appel, ou échangez sur WhatsApp." />
<meta property="og:image" content="https://www.sora-immobilier.com/seseh/exception/exterior.webp" />
<meta property="og:locale" content="fr_FR" />
<meta name="twitter:card" content="summary_large_image" />

<link rel="icon" href="https://www.sora-immobilier.com/favicon.ico" />

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />

<style>
  @font-face {
    font-family: "Eightly Teenage";
    src: url("https://www.sora-immobilier.com/fonts/eightlyteenage-medium.otf") format("opentype");
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "Eightly Teenage";
    src: url("https://www.sora-immobilier.com/fonts/eightlyteenage-semibold.otf") format("opentype");
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  :root {
    --color-bg: #F9F8F4;
    --color-bg-mid: #DEDACF;
    --color-ink: #262626;
    --color-ink-muted: #4A4545;
    --color-accent: #A3968D;
    --color-line: #DEDACF;
    --ease-soft: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --ease-expo: cubic-bezier(0.16, 1, 0.3, 1);
  }

  * { box-sizing: border-box; }

  html { overflow-x: hidden; scroll-behavior: smooth; }

  body {
    margin: 0;
    font-family: "Hanken Grotesk", system-ui, sans-serif;
    background: var(--color-bg);
    color: var(--color-ink);
    letter-spacing: -0.011em;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  h1, h2, h3 {
    font-family: "Eightly Teenage", Georgia, serif;
    font-weight: 500;
    line-height: 1.05;
    letter-spacing: 0;
    text-wrap: balance;
    margin: 0;
  }

  p { margin: 0; }

  a { color: inherit; text-decoration: none; }

  img { max-width: 100%; display: block; }

  :focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 3px;
  }

  .container {
    max-width: 1040px;
    margin-inline: auto;
    padding-inline: 24px;
  }

  /* ---------- Header ---------- */
  .site-header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 20;
    padding: 24px;
    display: flex;
    justify-content: center;
  }
  .site-header img {
    height: 34px;
    width: auto;
  }
  @media (min-width: 768px) {
    .site-header { padding: 32px 24px; justify-content: flex-start; }
    .site-header img { height: 40px; }
  }

  /* ---------- Hero ---------- */
  .hero {
    position: relative;
    display: flex;
    align-items: center;
    padding: 78px 20px 26px;
    min-height: 460px;
    background: #1c1a17;
  }
  .hero::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url("https://www.sora-immobilier.com/seseh/exception/exterior.webp");
    background-size: cover;
    background-position: center;
  }
  .hero::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(20,18,15,0.4) 0%, rgba(20,18,15,0.58) 55%, rgba(20,18,15,0.88) 100%);
  }
  .hero-content {
    position: relative;
    z-index: 2;
    max-width: 760px;
    margin-inline: auto;
    text-align: center;
  }
  .eyebrow {
    display: inline-flex;
    align-items: center;
    padding: 0.4rem 0.75rem;
    border: 1px solid rgba(249,248,244,0.28);
    border-radius: 9999px;
    background: rgba(249,248,244,0.08);
    -webkit-backdrop-filter: blur(14px);
    backdrop-filter: blur(14px);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(249,248,244,0.9);
    margin-bottom: 12px;
  }
  .hero h1 {
    color: #F9F8F4;
    font-size: clamp(21px, 5.5vw, 34px);
    line-height: 1.14;
  }
  .hero p {
    color: rgba(249,248,244,0.78);
    font-size: 13.5px;
    line-height: 1.5;
    margin-top: 10px;
    max-width: 520px;
    margin-inline: auto;
  }
  @media (min-width: 640px) {
    .hero { padding: 96px 24px 34px; }
    .hero h1 { font-size: clamp(26px, 3.4vw, 36px); }
    .hero p { font-size: 15px; margin-top: 12px; }
  }
  @media (min-width: 768px) {
    .hero { padding: 150px 32px 88px; min-height: 620px; }
    .hero h1 { font-size: clamp(38px, 4.4vw, 58px); }
    .hero p { font-size: 18px; margin-top: 22px; max-width: 640px; }
    .eyebrow { margin-bottom: 22px; padding: 0.55rem 1rem; font-size: 12px; }
  }

  /* ---------- Sections ---------- */
  .steps {
    padding: 22px 0 64px;
  }
  @media (min-width: 768px) {
    .steps { padding: 32px 0 88px; }
  }

  .step-card {
    background: #FFFFFF;
    border: 1px solid var(--color-line);
    border-radius: 4px;
    padding: 20px 18px;
    margin-bottom: 18px;
  }
  @media (min-width: 640px) {
    .step-card { padding: 36px 40px; margin-bottom: 28px; }
  }

  .step-head {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
  }

  .step-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    border-radius: 9999px;
    background: var(--color-accent);
    color: var(--color-bg);
    font-size: 11px;
    font-weight: 700;
  }

  .step-card h2 {
    color: var(--color-ink);
    font-size: clamp(18px, 3.2vw, 26px);
    margin-bottom: 0;
  }

  .step-card > p.step-text {
    color: var(--color-ink-muted);
    font-size: 14px;
    line-height: 1.5;
    max-width: 560px;
    margin-bottom: 16px;
  }

  /* ---------- Buttons ---------- */
  .cta-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: var(--color-accent);
    color: var(--color-bg);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 0.85rem 1.75rem;
    border-radius: 9999px;
    border: none;
    cursor: pointer;
    transition: background-color 400ms var(--ease-soft), color 400ms var(--ease-soft), transform 300ms var(--ease-soft);
  }
  .cta-primary:hover {
    background: var(--color-ink);
    color: var(--color-bg);
    transform: translateY(-1px);
  }

  .cta-whatsapp {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border: none;
    color: #fff;
    background: #25D366;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 1rem 2rem;
    border-radius: 9999px;
    cursor: pointer;
    transition: all 400ms var(--ease-soft);
  }
  .cta-whatsapp:hover {
    background: #1ebe5a;
    transform: translateY(-1px);
  }

  /* ---------- Calendly ---------- */
  .step-card--calendly {
    padding-left: 0;
    padding-right: 0;
    overflow: hidden;
  }
  .step-card--calendly .step-card-inner {
    padding-inline: 18px;
  }
  @media (min-width: 640px) {
    .step-card--calendly .step-card-inner { padding-inline: 40px; }
  }
  .calendly-wrap {
    margin-top: 16px;
    background: #fff;
    padding-inline: 28px;
  }
  @media (min-width: 768px) {
    .calendly-wrap { padding-inline: 0; }
  }
  .calendly-frame {
    width: 100%;
    height: 660px;
    border: 0;
    display: block;
  }
  @media (min-width: 640px) {
    .calendly-frame { height: 720px; }
  }

  /* ---------- Footer ---------- */
  .site-footer {
    background: var(--color-ink);
    color: rgba(249,248,244,0.65);
    padding: 48px 24px 96px;
    text-align: center;
  }
  .site-footer img {
    height: 30px;
    width: auto;
    margin-inline: auto;
    margin-bottom: 20px;
    filter: brightness(0) invert(1);
  }
  .site-footer .contacts {
    font-size: 14px;
    line-height: 1.9;
  }
  .site-footer a:hover { color: #F9F8F4; }
  .site-footer .legal {
    margin-top: 24px;
    font-size: 12px;
    color: rgba(249,248,244,0.4);
  }

  /* ---------- WhatsApp floating button ---------- */
  .wa-float {
    position: fixed;
    right: 18px;
    bottom: 18px;
    z-index: 50;
    display: flex;
    align-items: center;
    background: #25D366;
    color: #fff;
    border-radius: 9999px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.25);
    padding: 14px;
    transition: padding 350ms var(--ease-expo), box-shadow 300ms var(--ease-soft), transform 300ms var(--ease-soft);
    overflow: hidden;
    white-space: nowrap;
  }
  .wa-float svg {
    width: 26px;
    height: 26px;
    flex-shrink: 0;
  }
  .wa-float .wa-label {
    max-width: 0;
    opacity: 0;
    overflow: hidden;
    font-size: 13px;
    font-weight: 600;
    transition: max-width 350ms var(--ease-expo), opacity 250ms var(--ease-soft), margin 350ms var(--ease-expo);
  }
  @media (hover: hover) {
    .wa-float:hover {
      box-shadow: 0 14px 36px rgba(0,0,0,0.32);
      transform: translateY(-2px);
    }
    .wa-float:hover .wa-label {
      max-width: 160px;
      opacity: 1;
      margin-left: 10px;
    }
  }
  .wa-float:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 3px;
  }

  @media (min-width: 768px) {
    .wa-float { right: 28px; bottom: 28px; }
  }
</style>
</head>
<body>

<header class="site-header">
  <a href="https://www.sora-immobilier.com" aria-label="SORA Immobilier">
    <img src="https://www.sora-immobilier.com/sora-logo.svg" alt="SORA Immobilier" />
  </a>
</header>

<section class="hero">
  <div class="hero-content">
    <span class="eyebrow">Webinaire SORA x Lybox</span>
    <h1>Merci d&rsquo;avoir participé au webinaire SORA x Lybox.</h1>
    <p>Vous avez découvert le projet et son potentiel — voici comment aller plus loin, à votre rythme. Que vous soyez déjà décidé ou simplement curieux d&rsquo;en savoir plus, choisissez l&rsquo;option qui vous convient ci-dessous.</p>
  </div>
</section>

<main>
  <div class="container steps">

    <!-- Bloc Typeform -->
    <article class="step-card">
      <div class="step-head">
        <span class="step-number" aria-hidden="true">1</span>
        <h2>Définissez votre projet d&rsquo;investissement</h2>
      </div>
      <p class="step-text">En quelques minutes, précisez ce que vous recherchez (villa entière ou co-investissement, budget, objectifs). Nous vous préparons une projection personnalisée adaptée à votre profil.</p>
      <a class="cta-primary" href="https://form.typeform.com/to/m5hp2paw" target="_blank" rel="noopener noreferrer">
        Définir mon projet
      </a>
    </article>

    <!-- Bloc Calendly -->
    <article class="step-card step-card--calendly">
      <div class="step-card-inner">
        <div class="step-head">
          <span class="step-number" aria-hidden="true">2</span>
          <h2>Échangeons de vive voix</h2>
        </div>
        <p class="step-text">Vous préférez poser vos questions directement ? Réservez un créneau avec l&rsquo;équipe SORA. On fait le point sur votre projet, le programme Seseh Sunset Villas et les modalités d&rsquo;investissement.</p>
      </div>

      <div class="calendly-wrap">
        <iframe
          class="calendly-frame"
          src="https://calendly.com/contact-sora-immobilier/rdv-avec-gabriel-investir-a-bali?utm_source=post-webinaire&hide_gdpr_banner=1"
          title="Réserver un appel avec l'équipe SORA"
          loading="lazy">
        </iframe>
      </div>
    </article>

    <!-- Bloc WhatsApp -->
    <article class="step-card">
      <div class="step-head">
        <span class="step-number" aria-hidden="true">3</span>
        <h2>Une question rapide ?</h2>
      </div>
      <p class="step-text">Écrivez-nous directement sur WhatsApp, on vous répond dans la journée.</p>
      <a class="cta-whatsapp"
         href="https://wa.me/33633517746?text=J%27ai%20participé%20au%20Webinaire%20avec%20Lybox%2C%20je%20suis%20intéressé%20par%20le%20projet%20j%27aimerais%20en%20savoir%20plus."
         target="_blank" rel="noopener noreferrer">
        Discuter sur WhatsApp
      </a>
    </article>

  </div>
</main>

<footer class="site-footer">
  <img src="https://www.sora-immobilier.com/sora-logo.svg" alt="SORA Immobilier" />
  <div class="contacts">
    <a href="tel:+33633517746">+33 6 33 51 77 46</a><br />
    <a href="mailto:contact@sora-immobilier.com">contact@sora-immobilier.com</a>
  </div>
  <p class="legal">SORA Immobilier — Canggu, Bali, Indonésie</p>
</footer>

<!-- Bouton WhatsApp flottant -->
<a class="wa-float"
   href="https://wa.me/33633517746?text=J%27ai%20participé%20au%20Webinaire%20avec%20Lybox%2C%20je%20suis%20intéressé%20par%20le%20projet%20j%27aimerais%20en%20savoir%20plus."
   target="_blank" rel="noopener noreferrer"
   aria-label="Discuter sur WhatsApp">
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"></path>
    <path d="M12.004 2c-5.514 0-9.997 4.483-9.997 9.997 0 1.763.462 3.486 1.34 5.004L2 22l5.117-1.343a9.96 9.96 0 0 0 4.887 1.244h.005c5.514 0 9.997-4.483 9.997-9.997C21.998 6.483 17.518 2 12.004 2zm0 18.166h-.004a8.16 8.16 0 0 1-4.158-1.14l-.298-.177-3.036.796.81-2.96-.194-.304a8.147 8.147 0 0 1-1.253-4.384c0-4.508 3.669-8.176 8.177-8.176 2.184 0 4.238.851 5.783 2.397a8.13 8.13 0 0 1 2.394 5.785c0 4.508-3.67 8.163-8.221 8.163z"></path>
  </svg>
  <span class="wa-label">Une question ?</span>
</a>

</body>
</html>
`

export async function GET() {
  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  })
}
