# Authentication Components

This directory contains components and utilities for handling user authentication in the movie review application.

## Components

### LoginForm

A form component for user authentication with validation.

```tsx
import { LoginForm } from "./components/auth/LoginForm";

function LoginPage() {
  return <LoginForm />;
}
```

Features:

- Email and password validation
- Error handling and feedback
- Loading states
- Integration with auth store
- Redirect after successful login

### SignUpForm

A form component for new user registration with validation.

```tsx
import { SignUpForm } from "./components/auth/SignUpForm";

function SignupPage() {
  return <SignUpForm />;
}
```

Features:

- Username, email, and password validation
- Password confirmation
- Error handling and feedback
- Loading states
- Redirect after successful registration

## Validation

Uses Zod for form validation with the following rules:

### Login Validation

- Email: Required, must be valid email format
- Password: 6-50 characters

### Signup Validation

- Username: 3-30 characters
- Email: Required, must be valid email format
- Password: 6-50 characters
- Password Confirmation: Must match password

## Authentication Flow

1. User submits credentials
2. Form validation occurs
3. API call is made if validation passes
4. Success: User is redirected and auth store is updated
5. Error: User receives feedback and can retry

## Error Handling

- Form validation errors
- API error responses
- Network errors
- User feedback via toast notifications

## State Management

Uses Zustand for auth state management:

- User information
- Authentication status
- Login/Logout actions

## API Integration

Integrates with the following endpoints:

- POST /api/auth/login
- POST /auth/signup

## Security Considerations

- Credentials sent over HTTPS
- Password validation
- CSRF protection
- HTTP-only cookies
