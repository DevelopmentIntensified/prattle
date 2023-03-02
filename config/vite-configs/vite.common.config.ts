import tsconfigPaths from "vite-tsconfig-paths";
import { PluginOption, defineConfig } from "vite";
/**
 * Build configuration for common (isomorphic) code
 */
export default defineConfig({
  plugins: [tsconfigPaths() as PluginOption],
  build: {
    lib: {
      entry: "index.ts"
    },
    minify: true,
    rollupOptions: {
      external: []
    }
  }
});
