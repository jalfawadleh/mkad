import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: false,
    setupFiles: "./tests/setupTests.js",
    include: ["tests/**/*.test.{js,jsx}"],
  },
});
