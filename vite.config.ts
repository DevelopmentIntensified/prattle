import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/**
 * Build configuration for client code, executed in the browser
 */
export default defineConfig({
  plugins: [react()]
});
