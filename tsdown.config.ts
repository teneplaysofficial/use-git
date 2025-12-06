import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: ["./src/index.ts"],
    format: ["esm", "cjs"],
    minify: true,
    dts: true,
    exports: {
      customExports(pkg) {
        delete pkg["./package.json"];
        return pkg;
      },
    },
  },
]);
