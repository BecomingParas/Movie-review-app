# Movie Review Application

A modern web application for browsing and reviewing movies built with React, TypeScript, and TailwindCSS.

## Features

- 🎬 Browse movie listings
- ⭐ Read and write reviews
- 👤 User authentication
- 🎯 Personalized recommendations
- 📱 Responsive design

## Tech Stack

- React 19
- TypeScript
- TailwindCSS
- React Query
- React Router
- Zustand
- Zod
- React Hook Form

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd movie-review-app
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Start the development server:

```bash
npm run dev
```

## Project Structure

```
src/
├── api/            # API integration
│   ├── auth/       # Authentication endpoints
│   └── movie/      # Movie-related endpoints
├── components/     # Reusable components
│   ├── auth/       # Authentication components
│   ├── common/     # Shared components
│   ├── home/       # Home page components
│   └── movie/      # Movie-related components
├── pages/          # Page components
├── store/          # State management
├── utils/          # Utility functions
└── types/          # TypeScript types
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Environment Variables

- `VITE_BACKEND_URL` - Backend API URL
- `NODE_ENV` - Environment (development/production)

## API Integration

The application integrates with a RESTful API:

- Authentication endpoints (`/api/auth/*`)
- Movie endpoints (`/api/movies/*`)
- Review endpoints (`/api/reviews/*`)

## State Management

- **Zustand** for global state
- **React Query** for server state
- **React Hook Form** for form state

## Styling

Uses TailwindCSS with:

- Custom theme configuration
- Responsive design utilities
- Dark mode support
- Component-specific styles

## Testing

Coming soon...

## Deployment

1. Build the application:

```bash
npm run build
```

2. Preview the build:

```bash
npm run preview
```

3. Deploy the `dist` directory to your hosting provider

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT License - see LICENSE file for details
