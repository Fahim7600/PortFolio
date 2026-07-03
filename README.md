# Arfan Ahmed Fahim — Portfolio

A modern, single-page developer portfolio built with React, TypeScript, and Three.js.

## Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI library |
| **TypeScript** | Type-safe development |
| **Vite** | Build tool & dev server |
| **React Router DOM v6+** | Client-side routing |
| **Tailwind CSS v4** | Utility-first styling |
| **React Three Fiber** | Declarative 3D (Three.js) |
| **@react-three/drei** | R3F helpers & abstractions |
| **Three.js** | 3D graphics engine |
| **GSAP** | Scroll & entrance animations |
| **Framer Motion** | UI transitions |
| **react-icons** | Icon library |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── assets/              # Images, resume PDF, icons
├── components/
│   ├── layout/          # Navbar, Footer, PageWrapper
│   ├── sections/        # Hero, About, Skills, Education, Experience, Projects, Contact
│   ├── three/           # 3D scene components (React Three Fiber)
│   └── ui/              # Reusable buttons, cards, etc.
├── data/                # portfolio-data.ts — all content as typed objects
├── hooks/               # Custom hooks (useScrollSpy, etc.)
├── pages/               # Home.tsx, ProjectDetail.tsx
└── types/               # Shared TypeScript interfaces
```

## License

All rights reserved.
