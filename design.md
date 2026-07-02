# design.md — Sora

> Source de vérité DA du projet. Mapper vers `globals.css` via `shadcn-install-guide.md`.

---

## Couleurs

### Palette primitive

| Token | Hex | oklch (Tailwind v4) |
|-------|-----|---------------------|
| `white` | `#FFFFFF` | `oklch(1 0 0)` |
| `cream` | `#F9F8F4` | `oklch(0.978 0.004 80)` |
| `beige` | `#DEDACF` | `oklch(0.886 0.018 82)` |
| `taupe` | `#A3968D` | `oklch(0.644 0.028 55)` |
| `noir` | `#262626` | `oklch(0.178 0 0)` |

### Tokens sémantiques

| Rôle | Light | Dark |
|------|-------|------|
| `--background` | `oklch(0.978 0.004 80)` — cream | `oklch(0.178 0 0)` — noir |
| `--foreground` | `oklch(0.178 0 0)` — noir | `oklch(0.978 0.004 80)` — cream |
| `--card` | `oklch(1 0 0)` — white | `oklch(0.22 0 0)` — noir légèrement relevé |
| `--card-foreground` | `oklch(0.178 0 0)` — noir | `oklch(0.978 0.004 80)` — cream |
| `--popover` | `oklch(1 0 0)` — white | `oklch(0.22 0 0)` |
| `--popover-foreground` | `oklch(0.178 0 0)` | `oklch(0.978 0.004 80)` |
| `--primary` | `oklch(0.178 0 0)` — noir | `oklch(0.978 0.004 80)` — cream |
| `--primary-foreground` | `oklch(0.978 0.004 80)` — cream | `oklch(0.178 0 0)` — noir |
| `--secondary` | `oklch(0.886 0.018 82)` — beige | `oklch(0.28 0 0)` |
| `--secondary-foreground` | `oklch(0.178 0 0)` | `oklch(0.978 0.004 80)` |
| `--muted` | `oklch(0.886 0.018 82)` — beige | `oklch(0.28 0 0)` |
| `--muted-foreground` | `oklch(0.644 0.028 55)` — taupe | `oklch(0.644 0.028 55)` — taupe |
| `--accent` | `oklch(0.644 0.028 55)` — taupe | `oklch(0.644 0.028 55)` — taupe |
| `--accent-foreground` | `oklch(1 0 0)` — white | `oklch(0.178 0 0)` |
| `--destructive` | `oklch(0.577 0.245 27.325)` — rouge shadcn défaut | idem |
| `--destructive-foreground` | `oklch(1 0 0)` | `oklch(1 0 0)` |
| `--border` | `oklch(0.886 0.018 82)` — beige | `oklch(0.32 0 0)` |
| `--input` | `oklch(0.886 0.018 82)` — beige | `oklch(0.32 0 0)` |
| `--ring` | `oklch(0.644 0.028 55)` — taupe | `oklch(0.644 0.028 55)` |

---

## Typographie

| Rôle | Font family | Poids disponibles | Source |
|------|-------------|-------------------|--------|
| Display (titres, H1-H3) | Eightly Teenage | Thin 100, Extralight 200, Light 300, Regular 400, Medium 500, Semibold 600, Bold 700, Extrabold 800, Black 900 | Font locale — à placer dans `public/fonts/` |
| Sans (corps, UI) | Hanken Grotesk | Thin 100, Extralight 200, Light 300, Regular 400, Medium 500, Semibold 600, Bold 700, Extrabold 800, Black 900 | Google Fonts — via `next/font/google` |

### Usage typographique
- H1 / H2 / grandes accrochdes : Eightly Teenage — poids Semibold ou Bold
- Corps de texte, labels, UI : Hanken Grotesk — poids Regular (400) ou Medium (500)
- Légendes, métadonnées : Hanken Grotesk Light (300) ou Regular, muted-foreground

### Échelle typographique

| Nom | Taille | Line height | Usage |
|-----|--------|-------------|-------|
| `xs` | 12px / 0.75rem | 1.5 | Légendes, métadonnées |
| `sm` | 14px / 0.875rem | 1.5 | Labels, captions |
| `base` | 16px / 1rem | 1.6 | Corps de texte |
| `lg` | 18px / 1.125rem | 1.5 | Corps large, intros |
| `xl` | 20px / 1.25rem | 1.4 | H4, sous-titres |
| `2xl` | 24px / 1.5rem | 1.3 | H3 |
| `3xl` | 30px / 1.875rem | 1.2 | H2 |
| `4xl` | 36px / 2.25rem | 1.15 | H1 desktop medium |
| `5xl` | 48px / 3rem | 1.1 | H1 desktop large |
| `6xl` | 60px / 3.75rem | 1.05 | Hero display |

---

## Spacing

Base unit : `4px` — échelle Tailwind standard, pas de dérogation.

---

## Border Radius

DA luxe/minimaliste — arrondi très discret.

| Token shadcn | Valeur | Usage |
|--------------|--------|-------|
| `--radius` (base) | `0.25rem` (4px) | Inputs, cards, popovers |
| Arrondi fort | `9999px` | Badges, pills uniquement |
| Arrondi nul | `0rem` | Tableaux, éléments structurels |

---

## Shadows

Ombres très légères — cohérentes avec la palette terreuse.

| Niveau | Valeur CSS | Usage |
|--------|------------|-------|
| `sm` | `0 1px 3px 0 rgba(38, 38, 38, 0.06)` | Cards |
| `md` | `0 4px 12px 0 rgba(38, 38, 38, 0.08)` | Modals, popovers |
| `lg` | `0 8px 24px 0 rgba(38, 38, 38, 0.10)` | Sheets, drawers |

---

## Dark mode

- [ ] À confirmer avec le client
- Stratégie si activé : classe `.dark` sur `<html>` via `next-themes`
- Tokens dark : colonne "Dark" dans la table sémantique ci-dessus

---

## Notes DA

- Palette sans couleur d'accent vive — tout dans les neutres chauds. Pas de bleu, pas de vert.
- Le `--primary` est le noir (`#262626`) — CTA et actions principales en noir sur fond cream.
- Le `--destructive` reste le rouge shadcn par défaut (pas dans la palette Sora, mais nécessaire fonctionnellement).
- Eightly Teenage est une font custom — vérifier la licence avant mise en prod.
- Ne jamais utiliser `#FFFFFF` blanc pur comme fond de page — toujours `#F9F8F4` cream.
