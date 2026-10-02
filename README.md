# EventEase (Blazor WebAssembly)

Application de gestion d'événements construite avec **Blazor WebAssembly (.NET 8)**.

## Lancer le projet

Prérequis : [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)

```bash
dotnet run
```

Puis ouvrir l'adresse affichée (ex. http://localhost:5000).

## Fonctionnalités

- **EventCard** (`Components/EventCard.razor`) : carte d'événement avec champs éditables (titre, date, lieu, capacité, description) et liaison de données bidirectionnelle via `@bind-Value` (`InputText`, `InputDate`, `InputNumber`, `InputTextArea`) et aperçu en direct.
- **Routage** : `/`, `/events`, `/events/{Id:int}`, `/events/{Id:int}/register`, `/login`, `/attendance` (protégée), page 404 (`<NotFound>` du `Router`).
- **Optimisation et robustesse** : validation des entrées par DataAnnotations (`EditForm` + `DataAnnotationsValidator`), contrainte de route `{Id:int}`, identifiant inconnu → message 404, `ErrorBoundary` dans le layout, `@key` sur les listes, redirection de connexion limitée aux chemins internes.
- **Fonctionnalités avancées** : formulaire d'inscription validé (e-mail, doublons, capacité), session utilisateur (`SessionService`, persistée en `localStorage`), suivi des présences avec taux de présence, persistance des données (`EventService`).

## Structure

```
Components/  EventCard, NotFoundMessage
Layout/      MainLayout (ErrorBoundary), NavMenu
Models/      EventItem, Registration, UserSession
Pages/       Home, Events, EventDetail, Register, Login, Attendance
Services/    EventService, SessionService
```

## Résumé : comment Copilot m'a aidé à chaque étape

> À relire et adapter avec vos propres mots/expériences avant de soumettre.

1. **Dépôt GitHub / mise en place** : Copilot a aidé à créer le projet Blazor WebAssembly et à initialiser le dépôt git.
2. **Composant EventCard** : à partir d'un prompt décrivant les champs d'un événement, Copilot a généré le composant de base avec liaison de données bidirectionnelle (`@bind-Value`).
3. **Routage** : Copilot a généré les pages avec `@page` et aidé à déboguer les paramètres de route (`{Id:int}`) et la navigation.
4. **Optimisation** : Copilot a suggéré la validation par DataAnnotations, la gestion des routes invalides (404), l'`ErrorBoundary` et l'usage de `@key`.
5. **Fonctionnalités avancées** : Copilot a aidé à concevoir le formulaire d'inscription validé, le service de session et le suivi des présences.
6. **Documentation** : Copilot a aidé à rédiger ce README et ce résumé.
