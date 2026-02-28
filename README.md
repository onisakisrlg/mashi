# Komorebi Coffee Website

A modern, Japanese-style specialty coffee shop website built with React, Tailwind CSS, and Framer Motion.

## Project Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

### Build

Build for production:

```bash
npm run build
```

## Deployment on Vercel

This project is optimized for deployment on [Vercel](https://vercel.com).

1.  **Push to GitHub/GitLab/Bitbucket**: Push your code to a git repository.
2.  **Import Project in Vercel**:
    *   Go to your Vercel dashboard.
    *   Click "Add New..." -> "Project".
    *   Import your repository.
3.  **Configure Project**:
    *   **Framework Preset**: Vercel should automatically detect **Vite**.
    *   **Root Directory**: `./` (default)
    *   **Build Command**: `npm run build` (default)
    *   **Output Directory**: `dist` (default)
4.  **Deploy**: Click "Deploy".

### Vercel Configuration (`vercel.json`)

A `vercel.json` file is included to handle Single Page Application (SPA) routing rewrites, ensuring that all requests are directed to `index.html`.

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Tech Stack

-   **Framework**: React 19
-   **Styling**: Tailwind CSS v4
-   **Animations**: Motion (Framer Motion)
-   **Icons**: Lucide React
-   **Build Tool**: Vite
