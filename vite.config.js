import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// Base path : adapte automatiquement pour GitHub Pages en prod, racine en dev.
// Pour changer le nom du repo, édite VITE_BASE ou le fallback ci-dessous.
const base = process.env.VITE_BASE ?? '/projet-naissance/';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? base : '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/icon-192.png', 'icons/icon-512.png'],
      manifest: {
        name: 'Projet de naissance',
        short_name: 'Naissance',
        description: "L'application qui vous accompagne pour construire votre projet de naissance.",
        theme_color: '#6B4E8C',
        background_color: '#F5F0FA',
        display: 'standalone',
        orientation: 'portrait',
        start_url: mode === 'production' ? base : '/',
        scope: mode === 'production' ? base : '/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}']
      }
    })
  ],
  server: {
    host: true,
    port: 5173
  }
}));
