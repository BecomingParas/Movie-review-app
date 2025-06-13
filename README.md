# 🎬 Movie Review App – Full Stack Deployment Guide

A modern full-stack movie review application built with React (Vite + TypeScript) frontend and Node.js + Express + TypeScript backend, using MongoDB Atlas. The frontend is deployed via **Vercel**, and the backend is deployed using **Render**.

---

## 🧩 Architecture Overview

| Layer    | Stack                                                                        |
| -------- | ---------------------------------------------------------------------------- |
| Frontend | React, Vite, TypeScript, TailwindCSS (Hosted on **Vercel**)                  |
| Backend  | Node.js, Express, TypeScript, TSX, Zod, JWT, Multer, Cloudinary (**Render**) |
| Database | MongoDB Atlas (Cloud Database)                                               |

---

## 📁 Repository Structure

```
movie-review-app/
├── frontend/
│   ├── package.json
│   ├── .env.example
│   └── src/
└── backend/
    ├── src/
    ├── package.json
    ├── tsconfig.json
    └── .env.example
```

---

## ⚙️ Frontend Setup (Local & Vercel)

### 1. Local Development

```bash
cd frontend
npm install
```

#### Create `.env.local`

```ini
VITE_API_URL=https://<your-backend-url>
```

#### Run Dev Server

```bash
npm run dev
```

### 2. Deploy on Vercel

* Connect the `frontend/` folder to your GitHub repo in Vercel
* During setup:

  * Add `VITE_API_URL` in the environment variables
  * (Optional) Choose MongoDB Atlas integration → auto-injects `MONGODB_URI`

---

## ⚙️ Backend Setup (Local & Render)

### 1. Prerequisites

* Node.js (LTS)
* MongoDB Atlas cluster (IP whitelisted)

### 2. Local Installation

```bash
cd backend
npm install
npm install -D typescript tsx @types/node
npm install express mongoose dotenv zod jsonwebtoken bcryptjs multer cloudinary
npm install -D @types/express @types/jsonwebtoken @types/bcryptjs @types/multer
npx tsc --init
```

### 3. Set `tsconfig.json`

```jsonc
"rootDir": "./src",
"outDir": "./dist",
"module": "ESNext",
"moduleResolution": "Node",
"esModuleInterop": true,
"resolveJsonModule": true,
"target": "ES2020"
```

### 4. Create `.env`

```env
PORT=5000
MONGODB_URI=<YOUR_ATLAS_URI>
JWT_SECRET=supersecret
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### 5. Add scripts in `package.json`

```json
"scripts": {
  "dev": "tsx --watch src/main.ts",
  "build": "tsc",
  "start": "node dist/main.js",
  "dev:start": "npm run build && npm run start"
}
```

### 6. Run Backend

```bash
npm run dev       # Development
npm run build     # Compile
npm run start     # Production
```

### 7. Deploy on Render

* Create **Web Service** in Render and link the backend repo
* Set **Build Command**: `npm install && npm run build`
* Set **Start Command**: `npm run start`
* Add the environment variables
* Whitelist Render IP addresses in MongoDB Atlas

---

## 🔄 MongoDB Atlas Integration

1. Create a free-tier cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Whitelist your local and Render IPs
3. Create a database user with proper roles
4. Use the generated connection string in your `.env` file
5. Vercel setup auto injects `MONGODB_URI` if integrated

---

## 🚀 Deployment Flow Summary

| Component | Platform | Steps                                                                 |
| --------- | -------- | --------------------------------------------------------------------- |
| Frontend  | Vercel   | GitHub repo → Set `VITE_API_URL` → Optional MongoDB Atlas integration |
| Backend   | Render   | GitHub repo → `npm run build` & `start` → Configure `.env`            |
| Database  | Atlas    | Create cluster → Whitelist IPs → Connect to backend & frontend        |

---

## ✅ Verification Checklist

* [ ] Frontend builds without errors
* [ ] Backend logs: `Connected to MongoDB`
* [ ] Test endpoints: `/api/movies`, `/api/reviews`
* [ ] Vercel and Render dashboards are error-free

---

## 🌱 Next Steps

* Add CI/CD: GitHub Actions, Prettier, ESLint
* Apply security middleware (Helmet, rate-limiting)
* Improve performance (compression, caching)
* Add API Docs (Swagger or Postman)
* Add user analytics & logs

---

## 🏷️ Resources

* [MongoDB Atlas Docs](https://www.mongodb.com/docs/atlas/)
* [Render Deployment Guide](https://render.com/docs/deploy-node-express-app)
* [Vercel Docs](https://vercel.com/docs)
* [Vite + React Docs](https://vitejs.dev/guide/)
* [Cloudinary Docs](https://cloudinary.com/documentation)

---

## 📦 Sample Folder Structure Snapshot 

```
MoviesReviewApp
├─ backend
│  ├─ .env
│  ├─ .env.example
│  ├─ dist
│  │  ├─ config
│  │  │  ├─ db.js
│  │  │  └─ jwt.js
│  │  ├─ controllers
│  │  │  ├─ auth-controller
│  │  │  │  ├─ login-controller.js
│  │  │  │  ├─ logout-controller.js
│  │  │  │  ├─ me-controller.js
│  │  │  │  └─ signup-controller.js
│  │  │  ├─ Dashboard.controller.js
│  │  │  ├─ home-controller.js
│  │  │  ├─ home.controller.js
│  │  │  ├─ movie-review-controllers
│  │  │  │  ├─ movie-controllers
│  │  │  │  │  ├─ create-movie-controller.js
│  │  │  │  │  ├─ createMovie.controller.js
│  │  │  │  │  ├─ delete-movie-controller.js
│  │  │  │  │  ├─ deleteMovie.controller.js
│  │  │  │  │  ├─ getAll-movie-controller.js
│  │  │  │  │  ├─ getAllMovie.controller.js
│  │  │  │  │  ├─ getById-movie-controller.js
│  │  │  │  │  ├─ getByIdMovie.controller.js
│  │  │  │  │  ├─ update-movie-controller.js
│  │  │  │  │  └─ updateMovie.controller.js
│  │  │  │  └─ review-controller
│  │  │  │     ├─ create-review-controller.js
│  │  │  │     ├─ createReview.controller.js
│  │  │  │     ├─ delete-review-controller.js
│  │  │  │     ├─ deleteReview.controller.js
│  │  │  │     ├─ getAll-review-controller.js
│  │  │  │     ├─ getAllReview.controller.js
│  │  │  │     ├─ getById-review-controller.js
│  │  │  │     ├─ getReviewByMovie.controller.js
│  │  │  │     ├─ getReviewByMovieId.js
│  │  │  │     ├─ getUserReviews-controller.js
│  │  │  │     ├─ update-review-controller.js
│  │  │  │     └─ updateReview.controller.js
│  │  │  ├─ updateMovieAverageRating.js
│  │  │  └─ user.controller.js
│  │  ├─ db-promise.js
│  │  ├─ db.js
│  │  ├─ error.js
│  │  ├─ main.js
│  │  ├─ middlewares
│  │  │  ├─ auth.middlewares.js
│  │  │  ├─ reviewAccess.middleware.js
│  │  │  └─ role.middleware.js
│  │  ├─ migrations
│  │  │  └─ run.js
│  │  ├─ model
│  │  │  ├─ movie.model.js
│  │  │  ├─ movieModel.js
│  │  │  ├─ review.model.js
│  │  │  ├─ token.model.js
│  │  │  ├─ user.model.js
│  │  │  └─ userActivity.model.js
│  │  ├─ mongo
│  │  │  ├─ auth
│  │  │  │  ├─ model.js
│  │  │  │  ├─ roleService.js
│  │  │  │  ├─ service.js
│  │  │  │  └─ token-service.js
│  │  │  ├─ movie
│  │  │  │  ├─ mongoMovieService.js
│  │  │  │  └─ movieModel.js
│  │  │  └─ review
│  │  │     ├─ mongoReviewServices.js
│  │  │     └─ reviewModel.js
│  │  ├─ mongo-db.js
│  │  ├─ routes
│  │  │  ├─ auth-route.js
│  │  │  ├─ auth.routes.js
│  │  │  ├─ dashboard.routes.js
│  │  │  ├─ movie-route.js
│  │  │  ├─ movie.routes.js
│  │  │  ├─ review-route.js
│  │  │  └─ review.routes.js
│  │  ├─ services
│  │  │  ├─ authUser.service.js
│  │  │  ├─ db-promise.js
│  │  │  ├─ movie-review-errors.js
│  │  │  ├─ movie-review-validations.js
│  │  │  ├─ movie-review-zodSchema.js
│  │  │  ├─ movie.js
│  │  │  ├─ movie.service.js
│  │  │  ├─ MovieService.js
│  │  │  ├─ review.service.js
│  │  │  ├─ reviews.js
│  │  │  └─ token.service.js
│  │  ├─ types
│  │  │  ├─ index.js
│  │  │  ├─ movie.type.js
│  │  │  ├─ multer.type.js
│  │  │  ├─ payload.type.js
│  │  │  └─ user.type.js
│  │  └─ utils
│  │     ├─ auth-middleware.js
│  │     ├─ bcrypt.js
│  │     ├─ cloudinaryUpload.js
│  │     ├─ constant.js
│  │     ├─ jwt.js
│  │     ├─ mongo-db.js
│  │     ├─ movie-review-errors.js
│  │     ├─ movie-review-zodSchema.js
│  │     └─ multer.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  └─ temp
│  ├─ src
│  │  ├─ config
│  │  │  ├─ db.ts
│  │  │  └─ jwt.ts
│  │  ├─ controllers
│  │  │  ├─ auth-controller
│  │  │  │  ├─ login-controller.ts
│  │  │  │  ├─ logout-controller.ts
│  │  │  │  ├─ me-controller.ts
│  │  │  │  └─ signup-controller.ts
│  │  │  ├─ Dashboard.controller.ts
│  │  │  ├─ home.controller.ts
│  │  │  ├─ movie-review-controllers
│  │  │  │  ├─ movie-controllers
│  │  │  │  │  ├─ createMovie.controller.ts
│  │  │  │  │  ├─ deleteMovie.controller.ts
│  │  │  │  │  ├─ getAllMovie.controller.ts
│  │  │  │  │  ├─ getByIdMovie.controller.ts
│  │  │  │  │  └─ updateMovie.controller.ts
│  │  │  │  └─ review-controller
│  │  │  │     ├─ createReview.controller.ts
│  │  │  │     ├─ deleteReview.controller.ts
│  │  │  │     ├─ getAllReview.controller.ts
│  │  │  │     ├─ getReviewByMovie.controller.ts
│  │  │  │     └─ updateReview.controller.ts
│  │  │  ├─ updateMovieAverageRating.ts
│  │  │  └─ user.controller.ts
│  │  ├─ data
│  │  │  └─ movies.json
│  │  ├─ error.ts
│  │  ├─ express.d.ts
│  │  ├─ main.ts
│  │  ├─ middlewares
│  │  │  ├─ auth.middlewares.ts
│  │  │  ├─ reviewAccess.middleware.ts
│  │  │  └─ role.middleware.ts
│  │  ├─ model
│  │  │  ├─ movie.model.ts
│  │  │  ├─ review.model.ts
│  │  │  ├─ token.model.ts
│  │  │  ├─ user.model.ts
│  │  │  └─ userActivity.model.ts
│  │  ├─ public
│  │  │  └─ temp
│  │  ├─ routes
│  │  │  ├─ auth.routes.ts
│  │  │  ├─ dashboard.routes.ts
│  │  │  ├─ movie.routes.ts
│  │  │  └─ review.routes.ts
│  │  ├─ services
│  │  │  ├─ authUser.service.ts
│  │  │  ├─ movie.service.ts
│  │  │  ├─ review.service.ts
│  │  │  └─ token.service.ts
│  │  ├─ types
│  │  │  ├─ movie.type.ts
│  │  │  ├─ multer.type.ts
│  │  │  ├─ payload.type.ts
│  │  │  └─ user.type.ts
│  │  └─ utils
│  │     ├─ bcrypt.ts
│  │     ├─ cloudinaryUpload.ts
│  │     ├─ constant.ts
│  │     ├─ movie-review-errors.ts
│  │     ├─ movie-review-zodSchema.ts
│  │     └─ multer.ts
│  ├─ tsconfig.json
│  └─ yarn.lock
├─ frontend
│  ├─ .env
│  ├─ .env.example
│  ├─ components.json
│  ├─ dist
│  │  ├─ assets
│  │  │  ├─ index-45XDp4Z7.css
│  │  │  └─ index-CcHbynYQ.js
│  │  ├─ images
│  │  │  └─ bg.jpg
│  │  ├─ index.html
│  │  └─ vite.svg
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ images
│  │  │  └─ bg.jpg
│  │  └─ vite.svg
│  ├─ README.md
│  ├─ src
│  │  ├─ api
│  │  │  ├─ auth
│  │  │  │  ├─ auth.fetch.tsx
│  │  │  │  └─ auth.query.tsx
│  │  │  ├─ dashboard
│  │  │  │  ├─ dashboard.fetch.tsx
│  │  │  │  └─ dashboard.query.tsx
│  │  │  ├─ movies
│  │  │  │  ├─ movie.fetch.ts
│  │  │  │  └─ movie.mutations.ts
│  │  │  └─ review
│  │  │     ├─ review.fetch.ts
│  │  │     └─ review.mutation.ts
│  │  ├─ App.css
│  │  ├─ App.tsx
│  │  ├─ components
│  │  │  ├─ auth
│  │  │  │  ├─ LoginForm.tsx
│  │  │  │  └─ SignUpForm.tsx
│  │  │  ├─ AuthInitializer.tsx
│  │  │  ├─ Herosection.tsx
│  │  │  ├─ InfoBlock.tsx
│  │  │  ├─ layout
│  │  │  │  ├─ Footer.tsx
│  │  │  │  ├─ Layout.tsx
│  │  │  │  └─ Navbar.tsx
│  │  │  ├─ movieForm
│  │  │  │  ├─ createMovie.tsx
│  │  │  │  └─ updateMovie.tsx
│  │  │  ├─ RatingStars.tsx
│  │  │  ├─ ReviewForm.tsx
│  │  │  ├─ ThemeToggle.tsx
│  │  │  ├─ toaster.tsx
│  │  │  └─ ui
│  │  │     ├─ avatar.tsx
│  │  │     ├─ button.tsx
│  │  │     ├─ card.tsx
│  │  │     ├─ CheckboxGroupField.tsx
│  │  │     ├─ dropdown-menu.tsx
│  │  │     ├─ DynamicInputField.tsx
│  │  │     ├─ FileUploadField.tsx
│  │  │     ├─ InputField.tsx
│  │  │     ├─ selectField.tsx
│  │  │     ├─ separator.tsx
│  │  │     ├─ skeleton.tsx
│  │  │     ├─ sonner.tsx
│  │  │     ├─ Spinner.tsx
│  │  │     ├─ star-rating.tsx
│  │  │     ├─ textarea.tsx
│  │  │     ├─ toast.tsx
│  │  │     ├─ toaster.tsx
│  │  │     ├─ toggle.tsx
│  │  │     └─ tooltip.tsx
│  │  ├─ context
│  │  │  └─ AuthContext.tsx
│  │  ├─ data
│  │  │  └─ mockData.ts
│  │  ├─ hooks
│  │  │  ├─ use-toast.ts
│  │  │  ├─ useAuth.ts
│  │  │  ├─ useAuthMutations.hook.ts
│  │  │  ├─ useMovies.ts
│  │  │  └─ useTheme.ts
│  │  ├─ index.css
│  │  ├─ lib
│  │  │  ├─ movieSchema.ts
│  │  │  ├─ register.schema.ts
│  │  │  └─ utils.ts
│  │  ├─ main.tsx
│  │  ├─ pages
│  │  │  ├─ about
│  │  │  │  └─ About.tsx
│  │  │  ├─ auth
│  │  │  │  ├─ LoginPage.tsx
│  │  │  │  └─ SignupPage.tsx
│  │  │  ├─ contact
│  │  │  │  └─ Contact.tsx
│  │  │  ├─ Dashboard
│  │  │  │  ├─ AdminDashboard.tsx
│  │  │  │  ├─ DashboardPage.tsx
│  │  │  │  └─ UserDashboard.tsx
│  │  │  ├─ home
│  │  │  │  └─ Index.tsx
│  │  │  ├─ movie
│  │  │  │  ├─ MovieCard.tsx
│  │  │  │  ├─ MovieDetails.tsx
│  │  │  │  ├─ MovieList.tsx
│  │  │  │  └─ movies.tsx
│  │  │  ├─ NotFound.tsx
│  │  │  ├─ review
│  │  │  │  ├─ review-form.tsx
│  │  │  │  ├─ review-list.tsx
│  │  │  │  └─ review.tsx
│  │  │  └─ watchlist
│  │  │     └─ WatchList.tsx
│  │  ├─ routes
│  │  │  ├─ AdminRoute.tsx
│  │  │  └─ ProtectedRoute.tsx
│  │  ├─ services
│  │  │  └─ auth.service.ts
│  │  ├─ store
│  │  │  └─ auth.store.ts
│  │  ├─ types
│  │  │  ├─ dashboard.types.ts
│  │  │  └─ movies.types.ts
│  │  ├─ utils
│  │  │  ├─ config.ts
│  │  │  ├─ getAccessToken.ts
│  │  │  └─ setupAuthInterceptor.ts
│  │  └─ vite-env.d.ts
│  ├─ tailwind.config.ts
│  ├─ tsconfig.app.json
│  ├─ tsconfig.json
│  ├─ tsconfig.node.json
│  ├─ vercel.json
│  └─ vite.config.ts
└─ README.md

```