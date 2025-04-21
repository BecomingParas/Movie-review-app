# 🚀 TypeScript + Express Starter Template

A minimal and modern boilerplate to kickstart your **Node.js** backend using **TypeScript** and **Express**.

---

## 📦 Project Initialization

```bash
npm init -y
🔧 Development Setup
1. Install Dev Dependencies
bash
Copy
Edit
npm install -D typescript @types/node tsx
2. Initialize TypeScript Configuration
bash
Copy
Edit
npx tsc --init
Then, in tsconfig.json, update:

json
Copy
Edit
"rootDir": "./src",
"outDir": "./dist",
📁 Project Structure
pgsql
Copy
Edit
your-project/
├── src/
│   └── main.ts
├── dist/               # Compiled files (after build)
├── .gitignore
├── tsconfig.json
├── package.json
└── README.md
📝 .gitignore
Create a .gitignore file:

nginx
Copy
Edit
node_modules
dist
✨ Create Entry File
src/main.ts
ts
Copy
Edit
console.log("running server");
⚙️ Scripts Configuration
Update your package.json:

json
Copy
Edit
"scripts": {
  "dev": "npx tsx --watch src/main.ts",
  "build": "tsc",
  "start": "node dist/main.js",
  "dev:start": "npm run build && npm run start"
}
🌐 Add Express
1. Install Express
bash
Copy
Edit
npm install express
2. Install Type Definitions
bash
Copy
Edit
npm install -D @types/express
🛠 Build & Run Commands
Build TypeScript → JavaScript
bash
Copy
Edit
npm run build
Run in Development Mode (Live Reload)
bash
Copy
Edit
npm run dev
Build + Start (Production)
bash
Copy
Edit
npm run dev:start
⚡ Sample Express Server
Update main.ts to:

ts
Copy
Edit
import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (_req, res) => {
  res.send("Server is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is listening on http://localhost:${PORT}`);
});
🧠 Script Reference

Command	Description
npm run dev	Start server in watch mode
npm run build	Compile TypeScript to JavaScript
npm run start	Run the compiled server
npm run dev:start	Build and run server in production mode