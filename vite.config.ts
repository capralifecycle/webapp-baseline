/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import { defineConfig } from "vite";
import packageJson from "./package.json";
import checker from "vite-plugin-checker";
import * as child from "child_process";
import autoprefixer from "autoprefixer";

const inDocker = fs.existsSync("/.dockerenv");

export default (env: { mode?: string }) => {
  const isProd = env.mode === "production";
  const commitHash = child.execSync("git rev-parse --short HEAD").toString();

  return defineConfig({
    plugins: [
      react(),
      checker({
        typescript: true,
        eslint: { lintCommand: "eslint src" },
        overlay: { initialIsOpen: false },
      }),
    ],
    css:{
      postcss:{
        plugins:[
          autoprefixer({})
        ]
      }
    },
    define: {
      __BUILD_INFO__: JSON.stringify({
        appName: packageJson.name,
        appBuildTime: new Date().toISOString(),
        appVersion: `${new Date()
          .toISOString()
          .split("T")[0]
          .replace(/-/g, "")}-${commitHash}`,
        commitHash,
      }),
    },
    build: {
      outDir: path.resolve(__dirname, "build"),
      sourcemap: "hidden",
    },
    server: {
      host: inDocker ? "0.0.0.0" : "127.0.0.1",
      port: 3000,
    },
    preview: {
      host: inDocker ? "0.0.0.0" : "127.0.0.1",
      port: 3000,
    },
    test: {
      coverage: {
        provider: 'istanbul'
      },
    },
  });
};
