import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    root: fileURLToPath(new URL("./", import.meta.url)),
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
