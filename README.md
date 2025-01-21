# Backend Setup Guide

This guide outlines the steps to set up a basic backend environment using TypeScript and Node.js.

## Prerequisites
Ensure you have the following installed:
- Node.js (LTS version recommended)
- npm (comes with Node.js)
- A code editor (e.g., VS Code)

## Steps

### 1. Initialize the Project
Run the following command to create a `package.json` file:
```bash
npm init -y
```

### 2. Install TypeScript and Node Types
Install TypeScript and Node.js type definitions as development dependencies:
```bash
npm install -D typescript @types/node
```

### 3. Initialize TypeScript Configuration
Generate a `tsconfig.json` file:
```bash
npx tsc --init
```

### 4. Update `tsconfig.json`
Modify the `tsconfig.json` file:
- Uncomment the line for `"rootDir"` and set it to `"./src"`.
- Uncomment the line for `"outDir"` and set it to `"./dist"`.

### 5. Create a `.gitignore` File
Add the following lines to a new `.gitignore` file to exclude unnecessary files and directories:
```
node_modules
/dist
```

### 6. Create the Source Directory
Create a directory named `src`:
```bash
mkdir src
```

### 7. Create the Main TypeScript File
Inside the `src` directory, create a file named `main.ts` and add the following code:
```typescript
console.log("Running server");
```

### 8. Install TSX for Development
Install TSX as a development dependency:
```bash
npm install -D tsx
```

### 9. Update `package.json` Scripts
Add the following scripts to the `package.json` file:
```json
"scripts": {
  "dev": "npx tsx --watch src/main.ts",
  "build": "tsc",
  "start": "node dist/main.js",
  "dev:start": "npm run build && npm run start"
}
```

### 10. Install Express
Install Express for handling HTTP requests:
```bash
npm install express
```

### 11. Install Express Type Definitions
Install type definitions for Express as a development dependency:
```bash
npm install -D @types/express
```

### 12. Build and Run the Application
- To build the TypeScript code:
  ```bash
  npm run build
  ```

- To run the application in development mode:
  ```bash
  npm run dev
  ```

- To build and start the application:
  ```bash
  npm run dev:start
  ```

## Directory Structure
After completing the setup, your project directory structure should look like this:
```
project-root/
├── dist/            # Compiled JavaScript files
├── node_modules/    # Installed dependencies
├── src/             # Source TypeScript files
│   └── main.ts
├── .gitignore       # Ignored files
├── package.json     # Project metadata and scripts
├── tsconfig.json    # TypeScript configuration
└── package-lock.json
```

You're all set to start building your backend application!