import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import compression from 'vite-plugin-compression';
import viteImagemin from 'vite-plugin-imagemin';
import eslintPlugin from 'vite-plugin-eslint';
import { VitePwa } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react(),
      visualizer({
        open: mode === 'production',
      }),
      compression(),
      viteImagemin({
        gifsicle: { optimizationLevel: 7, interlaced: false },
        optipng: { optimizationLevel: 7 },
        mozjpeg: { quality: 20 },
        pngquant: { quality: [0.8, 0.9], speed: 4 },
        svgo: { plugins: [{ name: 'removeViewBox' }] },
      }),
      eslintPlugin({
        cache: false,
        include: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx'],
      }),
      VitePwa({
        registerType: 'autoUpdate',
        manifest: {
          name: 'Мій Проект',
          short_name: 'Проект',
          start_url: '/',
          display: 'standalone',
          background_color: '#ffffff',
          icons: [
            {
              src: '/icons/icon-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/icons/icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      }),
    ],
    build: {
      cacheDir: './node_modules/.vite_cache',
      sourcemap: mode === 'development',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react')) return 'react';
              if (id.includes('redux')) return 'redux';
              if (id.includes('@mui')) return 'mui';
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          },
        },
        plugins: [visualizer()],
      },
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production',
        },
      },
      chunkSizeWarningLimit: 1000,
      manifest: true,
    },
    optimizeDeps: {
      include: ['react', 'react-dom', '@mui/material'],
      exclude: ['some-large-lib'],
    },
    define: {
      'process.env': {
        NODE_ENV: JSON.stringify(env.NODE_ENV || 'development'),
        VITE_API_URL: JSON.stringify(env.VITE_API_URL || 'https://api.example.com'),
        VITE_SENTRY_DSN: JSON.stringify(env.VITE_SENTRY_DSN || ''),
      },
    },
    server: {
      port: env.PORT || 3000,
      open: true,
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`,
        },
      },
      postcss: {
        plugins: [
          require('autoprefixer')(),
          require('postcss-preset-env')({
            stage: 3,
            browsers: 'last 2 versions',
          }),
        ],
      },
    },
  };
});