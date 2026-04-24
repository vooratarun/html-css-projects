# AGENTS.md

## Project Snapshot
- This repo is an Angular standalone app that recreates a Facebook-style UI.
- App shell is composed from reusable components under `src/app/components`.
- Visual language is still class-driven (`.header__*`, `.post__*`) with shared styles in `src/styles.css`.

## File Map and Responsibilities
- `src/main.ts`: bootstraps `AppComponent` via `bootstrapApplication`.
- `src/app/app.component.html`: high-level layout (`<app-header />`, `<app-sidebar />`, `<app-feed />`, `<app-widgets />`).
- `src/app/components/feed/feed.component.ts`: source of mock `stories` and `posts` data.
- `src/app/components/post-card/post-card.component.*`: reusable single post rendering.
- `src/app/components/story-reel/story-reel.component.*`: story strip rendering with `*ngFor`.
- `src/styles.css`: global reset, section styling, hover/active states, and breakpoints.

## Architecture and Data Flow
- Data flow is one-way and local: `FeedComponent` owns arrays and passes data to child components via `@Input`.
- Repeated UI is driven by Angular templates (`*ngFor`) instead of manually duplicated HTML blocks.
- There is no backend/API integration; all content is mock/static in component TS files.

## Conventions to Preserve
- Keep BEM-like class naming (`block__element`) because CSS depends on it.
- Prefer template bindings over inline duplication (for example `post.imageUrl` with `*ngIf`).
- Keep avatar/post/story card structure aligned with existing selectors to avoid style regressions.
- Use standalone components (no NgModule-based feature modules).

## Responsive Rules You Must Respect
- Mobile breakpoint at `@media (max-width: 768px)` hides `.sidebar`, `.widgets`, `.header__middle`, and `.header__info`.
- Horizontal story scrolling remains under `@media (min-width: 320px)` on `.storyReel`.
- Mid-size feed tuning remains under `@media (min-width: 769px) and (max-width: 1440px)`.

## External Integrations
- Material Icons is loaded in `src/index.html`; icon usage stays as `<span class="material-icons">...</span>`.
- Facebook Page widget lives in `widgets.component.html`, with SDK script loaded in `src/index.html`.
- Avoid changing `.fb-page` `data-*` attrs unless intentionally changing embed behavior.

## Developer Workflow
- Install: `npm install`
- Run: `npm run start`
- Build: `npm run build`
- Test: `npm run test -- --watch=false --browsers=ChromeHeadless`

## Safe Change Patterns for Agents
- For new posts/stories, append to arrays in `feed.component.ts` rather than duplicating template markup.
- Prefer global style updates in `src/styles.css` when classes are shared across components.
- Keep color and shadow tokens consistent (`#2e81f4`, `#eff2f5`, light gray borders).

