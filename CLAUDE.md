# CLAUDE.md

Guide projet pour Claude Code (et pour tout contributeur).

## Le produit en une phrase

PWA web qui guide une patiente enceinte dans la construction de son **projet de naissance**, depuis un lien cliqué dans un mail de la clinique, jusqu'à un PDF one-pager envoyé à l'équipe de la salle de naissance.

## Stack

- **React 18** (JS, pas TS) + **Vite 5**
- **React Router 6** en `HashRouter` (compat GitHub Pages)
- **PWA** via `vite-plugin-pwa` (manifest + service worker auto-update)
- **PDF** : `@react-pdf/renderer` (rendu vectoriel serveur-less)
- **Partage** : Web Share API L2 (`navigator.share` avec `files`) + fallback `mailto:` + téléchargement
- **Vidéos** : iframes YouTube sur domaine `youtube-nocookie.com`
- **Styles** : CSS Modules + variables CSS (`src/styles/theme.css`)
- **Persistance** : `localStorage` via hook `usePersistedState`

## Commandes

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # produit dist/
npm run preview    # sert dist/ en local pour valider le build
```

URL de test en dev : `http://localhost:5173/#/p/TEST1234` (code patient en hash).

## Conventions

- **JS uniquement** (pas de TypeScript)
- **Mobile-first** : tout CSS cible d'abord le mobile, puis une media query `min-width: 720px` pour tablette/desktop.
- **CSS Modules** pour les styles de composants (`Foo.module.css`). Variables de thème globales dans `src/styles/theme.css`.
- Tap targets ≥ 48px. Safe areas iOS via `env(safe-area-inset-*)`.
- Pas de bibliothèque UI : tout est custom pour garder le bundle léger et l'esthétique cohérente.

## Où modifier quoi

| Envie… | Fichier à éditer |
|---|---|
| **Contenu médical** (textes, questions, vidéos) | `src/content/themes.js` ← point d'entrée principal |
| Ordre des étapes du parcours | `src/content/journey.js` |
| Nom de la clinique / du médecin / email de contact | `src/content/config.js` |
| Couleurs, typographie, radius, ombres | `src/styles/theme.css` |
| Mise en page du PDF one-pager | `src/utils/pdf.js` |
| Logique de partage (Web Share / mailto) | `src/utils/share.js` |
| Écrans | `src/routes/*.jsx` |
| Briques réutilisables | `src/components/*.jsx` |

## Flow de données

```
URL /#/p/19381801
  └─► Welcome.jsx stocke le code dans BirthPlanContext
                                    │
                                    ▼
Journey.jsx (/journey/:step)
  └─► setAnswer(questionId, value) à chaque réponse
                                    │
                                    ▼
usePersistedState synchronise avec localStorage (clé "projet-naissance:v1")
                                    │
                                    ▼
Preview.jsx rend OnePagerPreview en HTML
                                    │
                                    ▼
Share.jsx → generateBirthPlanPdf(answers) → Blob PDF
          → sharePdf() : navigator.share ou download + mailto
```

## Déploiement GitHub Pages

1. Créer un repo GitHub `projet-naissance` (ou adapter `VITE_BASE` dans `vite.config.js` + le `base` du manifest).
2. Le workflow `.github/workflows/deploy.yml` build et déploie sur la branche `gh-pages` à chaque push sur `main`.
3. Activer GitHub Pages dans Settings → Pages, source = `gh-pages`.
4. URL finale type : `https://<user>.github.io/projet-naissance/#/p/{CODE_PATIENTE}`.
5. Le mail envoyé par la clinique doit pointer vers cette URL avec le code en hash.

## À faire avant mise en prod

- [ ] Remplir `CLINIC_NAME`, `DOCTOR_NAME`, `CLINIC_EMAIL` dans `src/content/config.js`
- [ ] Valider/remplacer les IDs vidéo YouTube dans `src/content/themes.js`
- [ ] Relire les textes médicaux avec le médecin
- [ ] Ajuster les icônes PWA si besoin (logo clinique)
- [ ] Tester le partage réel sur iOS Safari et Chrome Android

## Idées V2 (hors scope V1)

- Version desktop dédiée (layout deux colonnes)
- Backend minimal : validation du code patiente + envoi mail serveur-side (Resend / Mailgun)
- Export des réponses en JSON pour intégration au dossier médical
- i18n (anglais, espagnol) — utile HFME public international
- Analytics anonymisés (étapes abandonnées)
- Signature électronique du document par la patiente
