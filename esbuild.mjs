// @ts-check
import * as esbuild from "esbuild";

/**
 * @type {import('esbuild').BuildOptions}
 */
const buildOption = {
    entryPoints: ["src/index.ts"],
    treeShaking: true,
    platform: "node",
    format: "esm",
    outfile: "dist/index.js",
};

esbuild.buildSync(buildOption);
