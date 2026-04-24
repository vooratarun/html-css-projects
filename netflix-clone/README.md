# Netflix Clone - Angular Version

This is an Angular conversion of the Netflix Clone HTML/CSS project. The project has been transformed into a modern Angular application with component-based architecture.

## Project Structure

```
netflix-clone/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── navbar/           # Navigation bar component
│   │   │   ├── banner/           # Hero banner component
│   │   │   └── movie-row/        # Movie row component
│   │   ├── services/
│   │   │   ├── movie.service.ts  # Movie data service
│   │   │   └── scroll.service.ts # Scroll detection service
│   │   ├── app.component.ts      # Root app component
│   │   ├── app.component.html    # App template
│   │   └── app.component.scss    # App styles
│   ├── assets/
│   │   └── images/               # Movie posters and logos
│   ├── index.html                # HTML entry point
│   ├── main.ts                   # Angular bootstrap
│   └── styles.scss               # Global styles
├── angular.json                  # Angular CLI config
├── tsconfig.json                 # TypeScript config
└── package.json                  # Dependencies
```

## Installation & Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:4200`

3. **Build for production**
   ```bash
   npm run build:prod
   ```

## Features

- **Navbar Component**: Fixed navigation with scroll detection to add/remove background
- **Banner Component**: Hero section with movie title, description, and action buttons
- **Movie Row Component**: Horizontal scrollable rows of movie posters
- **Movie Service**: Centralized movie data management
- **Scroll Service**: RxJS-based scroll event detection

## Components

### NavbarComponent
- Displays Netflix logo and avatar
- Listens to scroll events via ScrollService
- Dynamically applies `nav__black` class on scroll

### BannerComponent
- Shows featured content (Money Heist by default)
- Includes Play and My List buttons with click handlers
- Movie description overlay

### MovieRowComponent
- Reusable component for displaying movie rows
- Accepts title, poster URLs, and size (large/small)
- Supports hover scaling animations

## Services

### MovieService
- Provides movie data structure with categories
- Returns array of MovieRow objects with:
  - Title (category name)
  - Posters (array of image URLs)
  - isLarge (boolean for sizing)

### ScrollService
- Exposes `isNavbarBlack$` observable
- Detects when user scrolls past 100px threshold
- Used by navbar to toggle background color

## Technologies Used

- **Angular 21+**: Component framework
- **TypeScript**: Language
- **RxJS**: Reactive programming
- **SCSS**: Styling
- **Angular CLI**: Build tools

## Styling

Global styles are in `src/styles.scss` including:
- Netflix-style dark theme
- Responsive grid layouts
- Smooth transitions and hover effects
- Custom scrollbar hiding

Component-specific styles can be added to individual `*.component.scss` files.

## Available Commands

```bash
npm start          # Start development server
npm run build      # Build for development
npm run build:prod # Build for production
npm test           # Run unit tests (when configured)
npm run lint       # Lint code (when configured)
```

## Future Enhancements

- Add movie detail pages with routing
- Implement API integration to fetch real movie data
- Add user authentication
- Implement video player functionality
- Add search functionality
- Mobile responsive improvements

