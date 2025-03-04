# Movie Components

This directory contains components for displaying and managing movie-related content in the application.

## Component Overview

### MovieCard

Displays individual movie information in various layouts.

```tsx
import { MovieCard } from "./MovieCard";

<MovieCard movie={movieData} variant="default" />;
```

Variants:

- `default`: Standard card layout
- `featured`: Larger card with more details
- `compact`: Condensed version for lists

### MovieGrid

Displays a grid of movie cards with responsive layout.

```tsx
import { MovieGrid } from "./MovieGrid";

<MovieGrid title="Latest Movies" movies={moviesData} />;
```

Features:

- Responsive grid layout
- Loading states
- Error handling
- Infinite scroll support

### MovieDetails

Comprehensive view of a single movie.

```tsx
import { MovieDetails } from "./MovieDetails";

<MovieDetails movieId="123" />;
```

Features:

- Full movie information
- Cast details
- Review section
- Rating system

## Data Integration

Components integrate with the following hooks:

- `useMovies()`: Fetch movie list
- `useMovie(id)`: Fetch single movie
- `useMovieReviews(movieId)`: Fetch movie reviews
- `useCreateReviewMutation()`: Submit reviews

## State Management

Movies data is managed through:

- React Query for server state
- Zustand for local state
- Component-level state for UI

## Error Handling

Components handle various error states:

- Loading failures
- Missing data
- API errors
- Network issues

## Accessibility

All components follow accessibility best practices:

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader support

## Styling

Uses Tailwind CSS with:

- Responsive design
- Dark theme
- Custom animations
- Consistent spacing
