import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx"],
  format: ["esm"],
  target: "node18",
  outDir: "dist",
  clean: true,
  // Keep dependencies external (they'll be installed from package.json)
  external: ["react", "ink", "ink-big-text", "ink-gradient", "ink-spinner"],
  // Don't split chunks
  splitting: false,
  // Enable tree shaking
  treeshake: true,
});
