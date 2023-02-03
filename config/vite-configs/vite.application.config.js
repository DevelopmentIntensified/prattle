import react from "@vitejs/plugin-react";

/**
 * Build configuration for client code, executed in the browser
 */
export default {
  plugins: [
    react()
  ],

  build: {
    minify: true
  }
};