#!/usr/bin/env node
require("esbuild")
  .build({
    entryPoints: ["./src/index.js"],
    bundle: true,
    platform: "node",
    target: ["node16"],
    outfile: "./bundle/index.js",
    sourcemap: "external",
    external: ["zlib", "fs", "path", "net"],
    plugins: [
      require("@anatine/esbuild-decorators").esbuildDecorators({
        tsconfig: "./tsconfig.json",
        cwd: "./src",
      }),
    ],
  })
  .catch(() => process.exit(1));
