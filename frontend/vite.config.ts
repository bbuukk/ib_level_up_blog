/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config https://vitest.dev/config
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/tests/setup',
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html'],
      exclude: ['src/tests'], // We don't need to cover the utils files for tests, like the wrapper
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      clean: false,
      cleanOnRerun: false
      /*       thresholds: {
        global: {
          statements: 90,
          branches: 90,
          functions: 90,
          lines: 90
        }
      } */
    }
  }
});
