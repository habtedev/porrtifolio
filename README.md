# Habtamu Dev — Client

This folder contains the client-side code for the Habtamu portfolio site built with Vite, React and TypeScript.

## Quick start (local development)

Requirements: Node.js and npm (or pnpm/yarn). Use nvm if you need to install Node: https://github.com/nvm-sh/nvm

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open the app (default: http://localhost:8080)
```

## Build for production

```bash
npm run build
# Preview the production build locally
npm run preview
```

## Editing and contributing

- Edit files in `src/` using your preferred IDE.
- Push changes to your Git remote as usual; CI/deployment depends on your hosting provider.

## Tech stack

- Vite
- TypeScript
- React
- Tailwind CSS
- shadcn-ui

## Deployment

You can deploy the built `dist/` to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages, etc.). Configure your provider to run `npm run build` and serve the `dist` folder.

## Notes

- The project previously included integration with an external tool; that integration has been removed and the project is self-contained for local development.
- If you want PNG favicon fallbacks or additional deploy scripts, I can add them.
