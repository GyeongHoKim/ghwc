import { defineConfig } from "vite";
import * as path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "GHWC",
      fileName: (format) => `ghwc.${format}.js`,
    },
  },
});
