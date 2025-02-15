import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    include: ['src/**/*.test.{js,jsx}', 'src/**/*.spec.{js,jsx}'],
    coverage: {
      provider: 'v8', // Use v8 for coverage
      reporter: ['lcov', 'text'], // Generate lcov report for SonarQube
      include: ['src/**/*.jsx'], // Include all TSX files
    },
  },
})
