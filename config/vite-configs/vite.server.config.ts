import { defineConfig, PluginOption } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
/**
 * Build configuration for server code, executed by NodeJS
 */
export default defineConfig({
  plugins: [tsconfigPaths() as PluginOption],
  build: {
    lib: {
      entry: "index.ts"
    },
    rollupOptions: {
      // Do not bundle third-party dependencies,
      // since server packages can get them via npm install
      external: ["express"],
      output: {
        globals: {
          // "fastify": "fastify",
          // "fastify-cors": "fastifyCORS",
          // "fastify-swagger": "fastifySwagger"
        }
      }
    },
    minify: true
  }
});
