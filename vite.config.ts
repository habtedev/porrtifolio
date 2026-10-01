import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
const base = process.env.VITE_BASE ?? "/";

export default defineConfig(({ mode }) => ({
  base,
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  plugins: [
    react(),
  ].filter(Boolean),
  css: {
    postcss: path.resolve(__dirname, "./postcss.config.js"),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
