import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
// Relative asset paths allow deployment at a GitHub Pages repository subpath.
export default defineConfig({ plugins: [react(), tailwindcss()], base: './' });
