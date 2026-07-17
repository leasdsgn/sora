# SORA

Site Next.js pour SORA Immobilier.1

## Démarrage

Installer les dépendances :

```bash
bun install
```

Lancer le serveur de développement :

```bash
bun run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.

## Scripts

```bash
bun run dev
bun run build
bun run start
bun run lint
```

## Stack

- Next.js 16
- React 19
- Tailwind CSS v4
- GSAP
- Lenis

## Déploiement

Le projet est prévu pour Vercel. Vercel détecte `bun.lock` et utilise Bun pour l'installation.

## Structure

```txt
src/
  app/
  components/
    layout/
    sections/
public/
  fonts/
```
