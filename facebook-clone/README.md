# Facebook Clone (Angular)

This project converts a static HTML/CSS Facebook clone into a component-based Angular app.

## Component Structure
- `HeaderComponent`: top navigation and search
- `SidebarComponent`: left navigation items
- `FeedComponent`: page center column
- `StoryReelComponent`: stories row rendered from data
- `MessageSenderComponent`: message composer card
- `PostCardComponent`: reusable post card rendered with `*ngFor`
- `WidgetsComponent`: Facebook page embed

## Quick Start
```bash
npm install
npm run start
```

Then open `http://localhost:4200`.

## Build and Test
```bash
npm run build
npm run test -- --watch=false --browsers=ChromeHeadless
```

## Notes
- Main app shell is in `src/app/app.component.html`.
- Shared styles and media queries are in `src/styles.css`.
- Feed data lives in `src/app/components/feed/feed.component.ts`.

