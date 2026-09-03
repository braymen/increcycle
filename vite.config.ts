import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
    // Served from https://braymen.github.io/project-world/
    base: '/project-world/',
    plugins: [react()],
})
