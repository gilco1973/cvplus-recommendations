import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: [],
    include: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
    exclude: ['node_modules', 'dist']
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@cvplus/core': resolve(__dirname, '../core/src')
    }
  },
  esbuild: {
    target: 'node18'
  }
});