/// <reference types="vitest/config" />

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias:{
      '@hooks':path.resolve(__dirname,'src/hooks'),
      '@pages':path.resolve(__dirname,'src/pages'),
      '@config':path.resolve(__dirname,'src/config')
    }
  },

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup.ts",
  },
});