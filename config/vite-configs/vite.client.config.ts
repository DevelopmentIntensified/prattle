import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig, PluginOption } from "vite";

/**
 * Build configuration for client code, executed in the browser
 */
export default defineConfig({
  plugins: [react(), tsconfigPaths() as PluginOption],
  build: {
    lib: {
      entry: "index.js"
    },
    rollupOptions: {
      external: ["react", "react-dom", "react-router"]
    },
    minify: true
  },
  server: {
    watch: {
      ignored: ["!**/node_modules/**"]
    }
  }
});
