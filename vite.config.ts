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
            src: "/android-chrome-192x192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "/android-chrome-512x512.png",
            type: "image/png",
            sizes: "512x512",
          },
          {
            src: "/maskable_icon.png",
            type: "image/png",
            purpose: "maskable",
            sizes: "731x731",
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
      babel: {
        plugins: [
          "relay",
          "babel-plugin-macros",
          [
            "@emotion/babel-plugin-jsx-pragmatic",
            {
              export: "jsx",
              import: "__cssprop",
              module: "@emotion/react",
            },
          ],
          [
            "@babel/plugin-transform-react-jsx",
            { pragma: "__cssprop" },
            "twin.macro",
          ],
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      input: "/src/entry-client.tsx",
    },
    chunkSizeWarningLimit: 800,
  },
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
  ssr: command === "build" ? { noExternal: /(relay|react-use)/ } : {},
}));
