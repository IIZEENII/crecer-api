/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import tsConfigPaths from 'vite-tsconfig-paths';
import swc from 'unplugin-swc';

export default defineConfig({
  plugins: [tsConfigPaths(), swc.vite()],
  test: {
    environment: 'node',
    globals: true
  },
})