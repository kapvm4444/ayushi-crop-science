import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    host: true,
    cors: true,
    allowedHosts: [
      "ayushi.idestinytechlab.com",
      "ayushiapi.idestinytechlab.com",
    ],
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
