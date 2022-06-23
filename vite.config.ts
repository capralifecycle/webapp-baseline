import react from "@vitejs/plugin-react";
import fs from "fs";
import { GitRevisionPlugin } from "git-revision-webpack-plugin";
import path from "path";
import { defineConfig } from "vite";
import packageJson from "./package.json";
import checker from "vite-plugin-checker";

const inDocker = fs.existsSync("/.dockerenv");

const commitHash =
  new GitRevisionPlugin({
    commithashCommand: "rev-parse --short HEAD",
  }).commithash() ?? "unknown";

export default (env: { mode?: string }) => {
  const isProd = env.mode === "production";

  return defineConfig({
    plugins: [
      react(),
      checker({
        typescript: true,
        eslint: { lintCommand: "eslint ." },
        overlay: { initialIsOpen: false },
      }),
    ],
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
  });
};
