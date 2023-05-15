import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    VitePWA({
      manifest: {
        short_name: "Dan's Todos",
        name: "Dan's Todos",
        icons: [
          {
            src: "/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        theme_color: "#115293",
        background_color: "#fafafa",
      },
      injectRegister: "script",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        runtimeCaching: [
          {
            urlPattern:
              /^(?:(?!google\.com|graphql|tokensignin|signin|signout).)*$/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheableResponse: {
                statuses: [200],
              },
            },
          },
        ],
      },
    }),
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["relay", "@emotion/babel-plugin", "babel-plugin-macros"],
      },
    }),
  ],
  build: {
    rollupOptions: {
      input: "/src/entry-client.tsx",
    },
    chunkSizeWarningLimit: 800,
    sourcemap: true,
  },
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
  ssr:
    command === "build"
      ? { noExternal: /(relay|react-use|react-error-boundary)/ }
      : {},
}));
