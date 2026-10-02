# EventEase

Application de gestion d'événements (React + Vite + React Router).

## Lancer le projet

```bash
npm install
npm run dev      # développement
npm run build    # build de production
```

## Fonctionnalités

- **EventCard** : carte d'événement avec champs éditables (titre, date, lieu, capacité, description) et liaison de données bidirectionnelle (inputs contrôlés + aperçu en direct).
- **Routage** (React Router) : `/`, `/events`, `/events/:id`, `/events/:id/register`, `/login`, `/attendance` (protégée), `*` (404).
- **Optimisation et robustesse** : validation des entrées (`src/utils/validation.js`), identifiants de route invalides → page 404, `ErrorBoundary`, pages en `lazy`/`Suspense`, `React.memo`, `useMemo`/`useCallback`.
- **Fonctionnalités avancées** : formulaire d'inscription validé (e-mail, doublons, capacité), session utilisateur via Context + `localStorage`, suivi des présences (case à cocher + taux de présence), persistance des données.

## Structure

```
src/
  components/  EventCard, Field, Navbar, ProtectedRoute, ErrorBoundary
  pages/       Home, Events, EventDetail, Register, Login, Attendance, NotFound
  context/     SessionContext, EventsContext (useReducer)
  utils/       validation.js
```

## Résumé : comment Copilot m'a aidé à chaque étape

> À relire et adapter avec vos propres mots/expériences avant de soumettre.

1. **Dépôt GitHub / mise en place** : Copilot a proposé la structure du projet (Vite + React), le `.gitignore` et les commandes git d'initialisation.
2. **Composant EventCard** : à partir d'un prompt décrivant les champs d'un événement, Copilot a généré le composant de base avec des champs contrôlés (`value` + `onChange`) pour la liaison bidirectionnelle.
3. **Routage** : Copilot a généré les routes et la navigation, puis m'a aidé à déboguer les problèmes (route dynamique `:id`, comparaison `string`/`number` des identifiants, lien actif dans la barre de navigation).
4. **Optimisation** : Copilot a suggéré la validation des entrées, la page 404 pour les routes/identifiants invalides, l'`ErrorBoundary`, le chargement différé des pages et la mémoïsation.
5. **Fonctionnalités avancées** : Copilot a aidé à concevoir le formulaire d'inscription avec validation, le contexte de session (connexion/déconnexion persistante) et le tableau de suivi des présences.
6. **Documentation** : Copilot a aidé à rédiger ce README et ce résumé.
