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

## 📦 Sample Folder Structure Snapshot (Backend)

```
MoviesReviewApp
├─ backend
│  ├─ .env
│  ├─ dist/
│  │  ├─ config/
│  │  ├─ controllers/
│  │  ├─ middlewares/
│  │  ├─ model/
│  │  ├─ mongo/
│  │  ├─ routes/
│  │  ├─ services/
│  │  ├─ types/
│  │  └─ utils/
```

---

Let me know if you want me to add **frontend structure**, **example API routes**, or **troubleshooting tips**.
