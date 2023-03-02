import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

/**
 * Build configuration for client code, executed in the browser
 */
export default {
  plugins: [react(), tsconfigPaths()],

  build: {
    minify: true
  }
};
