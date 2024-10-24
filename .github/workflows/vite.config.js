import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true, // автоматично відкриє звіт після збірки
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Автоматично розбиває бібліотеки з node_modules на окремі частини
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
      plugins: [visualizer()], // Додаємо плагін для візуалізації розміру бандла
    },
    chunkSizeWarningLimit: 1000, // Підвищуємо обмеження для попередження про великі частини до 1MB
  },
});
