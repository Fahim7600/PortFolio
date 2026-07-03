# Arfan Ahmed Fahim — Portfolio

A modern, high-performance developer portfolio built with React, TypeScript, and Three.js, styled with a sleek dark neon theme.

---

## 🔗 Live Demo
- **Live Link**: [https://arfanahmedfahim.vercel.app/](https://arfanahmedfahim.vercel.app/) *(Placeholder for production deployment URL)*

---

## 🛠️ Tech Stack

### Frontend
- **React 19** & **TypeScript** — UI structure & type-safe code logic
- **Vite** — High-speed build tool and dev server
- **React Router DOM v6** — Client-side routes (Project details routing)
- **Tailwind CSS v4** — Modern, responsive utility styling
- **React Three Fiber (R3F)** & **@react-three/drei** — Lightweight declarative 3D (canvas element scenes)
- **Three.js** — Core 3D engine support
- **GSAP (ScrollTrigger)** — Staggered entrance animations and page transition sequences
- **Framer Motion** — Premium interactive micro-animations, 3D tilts, and modal overlays

### Backend
- **Node.js** & **Express** — REST API endpoints
- **Resend SDK** — Email API client for secure contact form mail delivery
- **Express Rate Limit** — Basic API rate-limiting against spam submissions

---

## ⚙️ Local Development

### 1. Setup Environment Files

#### Frontend Environment
Create a `.env` file in the project root:
```env
# Backend API URL (for sending contact requests)
VITE_API_URL=http://localhost:5000
```

#### Backend Environment
Create a `.env` file in the `server/` directory:
```env
# Server Port
PORT=5000

# Allowed client origin URL (CORS setting)
FRONTEND_URL=http://localhost:5173

# Resend API Key Setup
RESEND_API_KEY=your_resend_api_key
```

### 2. Install and Run Locally

You need to run both the frontend and the backend server.

#### Option A: Running the Frontend
From the root directory:
```bash
# Install frontend packages
npm install

# Start the Vite development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

#### Option B: Running the Backend
From the `server/` directory:
```bash
# Navigate to backend server folder
cd server

# Install server packages
npm install

# Start dev server with ts-node-dev (hot-reload)
npm run dev

# Build the TypeScript files
npm run build

# Run the compiled production build
npm start
```

---

## 📁 Project Structure

```
├── public/                 # Static assets (Favicons, Profile image, Resume PDF)
├── src/                    # Frontend React code
│   ├── assets/             # Raw icons and assets
│   ├── components/
│   │   ├── layout/         # Navbar, Footer, PageWrapper, ResumeModal
│   │   ├── sections/       # Hero, About, Skills, Education, Projects, Contact
│   │   ├── three/          # 3D canvas objects (SkillsScene, FooterScene)
│   │   └── ui/             # Standardized IconChip, etc.
│   ├── data/               # portfolio-data.ts (Typed application copy/data)
│   ├── hooks/              # Custom React hooks (useScrollSpy)
│   ├── pages/              # Home.tsx, ProjectDetail.tsx
│   └── main.tsx            # Application entrypoint
├── server/                 # Backend Node/Express Server
│   ├── src/                # TypeScript source files
│   │   ├── routes/         # Contact endpoint routers
│   │   └── index.ts        # Server entrypoint & CORS configurations
│   ├── tsconfig.json       # Backend TypeScript config
│   └── package.json        # Backend dependencies & script configurations
├── vercel.json             # Vercel rewrite configuration for routing
├── vite.config.ts          # Vite build config
└── package.json            # Frontend packages & configurations
```

---

## 📄 License
All rights reserved. © 2026 Arfan Ahmed Fahim.
