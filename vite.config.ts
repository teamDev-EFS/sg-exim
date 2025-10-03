import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          ui: ["framer-motion", "lucide-react"],
          utils: ["react-helmet-async", "react-toastify"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: "esbuild",
  },
  server: {
    headers: {
      "Cache-Control": "public, max-age=31536000",
    },
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "framer-motion",
      "lucide-react",
    ],
  },
});
