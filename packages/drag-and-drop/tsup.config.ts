import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entryPoints: ["src/index.ts"],
  format: ["cjs", "esm"],
  sourcemap: true,
  dts: true,
  minify: true,
  minifyWhitespace: true,
  external: ["react"],
  ...options,
}));
