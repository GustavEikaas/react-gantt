import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/gantt/index.ts",
      formats: ["es"],
      fileName(format, entryName) {
        return `${entryName}_${format}.js`;
      },
    },
    rollupOptions: {
      output: {
        preserveModules: true,
        esModule: true,
      },
    },
  },
});
