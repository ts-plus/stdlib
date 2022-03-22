/// <reference types="vitest" />
import * as path from "path"
import { defineConfig } from "vite"

export default defineConfig({
  resolve: {
    alias: {
      "@tsplus/stdlib": path.resolve(__dirname, "./packages/stdlib/build/esm"),
      "@tsplus-tests/stdlib": path.resolve(__dirname, "./packages/stdlib/build/tests")
    }
  },
  test: {
    include: ["packages/*/build/tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"]
  }
})
