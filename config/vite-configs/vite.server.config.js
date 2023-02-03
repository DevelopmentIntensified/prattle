/**
 * Build configuration for server code, executed by NodeJS
 */
export default {
  build: {
    lib: {
      entry: "src/index.js"
    },
    rollupOptions: {
      // Do not bundle third-party dependencies,
      // since server packages can get them via npm install
      external: [
        "express",
      ],
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
};
