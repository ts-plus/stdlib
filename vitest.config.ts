/// <reference types="vitest" />
import * as path from "path"
import { defineConfig } from "vite"

export default defineConfig({
  resolve: {
    alias: {
      "@tsplus/stdlib": path.resolve(__dirname, "./packages/stdlib/build/esm")
    }
  },
  test: {
    include: ["packages/*/build/tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"]
  }
})
