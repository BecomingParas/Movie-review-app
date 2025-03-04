# Home Page Components

This directory contains the components used to build the movie review application's home page.

## Components Overview

### HeroSection

The main banner section of the home page featuring:

- Latest movie highlight
- Navigation menu
- Watch trailer button
- Responsive design for mobile and desktop

### MovieGrid

Displays a grid of movies with:

- Latest distributions section
- Multiple movie cards
- Responsive grid layout
- "See More" functionality

### UpcomingMovies

Shows upcoming movie releases with:

- Featured large movie preview
- Side thumbnails for other upcoming movies
- Movie details including duration and genre
- Partner logos section

### AboutSection

Company information section featuring:

- Company description
- Feature highlights
- Partner logos
- Responsive layout

## Usage

```tsx
import { HomePage } from "./pages/home/HomePage";

function App() {
  return (
    <Router>
      <Route path="/" element={<HomePage />} />
    </Router>
  );
}
```

## Component Dependencies

- @tanstack/react-query for data fetching
- react-router-dom for navigation
- Tailwind CSS for styling
- Custom hooks from api/movie/hooks.ts

## Styling

The components use Tailwind CSS for styling with:

- Responsive design (mobile-first approach)
- Custom color scheme
- Consistent spacing
- Flexible grid layouts

## Accessibility

Components include:

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Proper heading hierarchy
