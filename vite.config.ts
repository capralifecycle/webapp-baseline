/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import {defineConfig} from 'vite'
import packageJson from './package.json'
import * as child from 'child_process'
import {execSync} from 'child_process'
import checker from 'vite-plugin-checker'

type Env = {
  mode?: string
}

export default (env: Env) => {
  const inDocker = fs.existsSync('/.dockerenv')

  const isProd = env.mode === 'production'
  console.log(`Running in ${isProd ? 'production' : 'development'} mode`)

  const commitHash = child
    .execSync('git rev-parse --short HEAD')
    .toString()
    .trim()
  execSync(`echo ${commitHash} > public/version.txt`)

  return defineConfig({
    plugins: [
      react(),
      checker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint src',
          useFlatConfig: true,
        },
        overlay: {
          initialIsOpen: true,
        },
      }),
    ],
    publicDir: './public',
    define: {
      __BUILD_INFO__: JSON.stringify({
        appName: packageJson.name,
        appBuildTime: new Date().toISOString(),
        appVersion: `${new Date()
          .toISOString()
          .split('T')[0]
          ?.replace(/-/g, '')}-${commitHash}`,
        commitHash,
      }),
    },
    build: {
      outDir: path.resolve(__dirname, 'build'),
      sourcemap: 'hidden',
    },
    server: {
      host: inDocker ? '0.0.0.0' : '127.0.0.1',
      port: 3000,
    },
    preview: {
      host: inDocker ? '0.0.0.0' : '127.0.0.1',
      port: 3000,
    },
    test: {
      coverage: {
        provider: 'istanbul',
      },
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/.{idea,git,cache,output,temp}/**',
        '**/{vite,vitest,build}.config.*',
        'tests/components/*',
        'tests/e2e/*',
      ],
    },
    resolve: {
      alias: [{find: '~', replacement: '/src'}],
    },
  })
}
