# State Management

This directory contains the application's state management logic using Zustand.

## Stores

### Auth Store

Manages authentication state:

```tsx
import useAuthStore from "./authStore";

function Component() {
  const { user, isAuthenticated, login, logout } = useAuthStore();
}
```

Features:

- User information
- Authentication status
- Login/logout actions
- Persistent session

### Movie Store

Manages movie-related state:

```tsx
import useStore from "../store";

function Component() {
  const { movies, setMovies } = useStore();
}
```

Features:

- Movie listings
- Review management
- User interactions
- Cache management

## State Structure

### Auth State

```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}
```

### Movie State

```typescript
interface MovieState {
  movies: Movie[];
  reviews: Review[];
  users: User[];
  setMovies: (movies: Movie[]) => void;
  setReviews: (reviews: Review[]) => void;
  setUsers: (users: User[]) => void;
}
```

## Best Practices

1. Use selectors to prevent unnecessary rerenders
2. Keep state minimal and normalized
3. Use actions for state modifications
4. Combine with React Query for server state
5. Implement proper error handling

## Integration with React Query

The stores complement React Query:

- Zustand: UI state, user preferences
- React Query: Server state, caching, synchronization

## Usage Guidelines

1. Import store hooks at component level
2. Use selectors for specific state slices
3. Implement error boundaries
4. Handle loading states
5. Maintain type safety
