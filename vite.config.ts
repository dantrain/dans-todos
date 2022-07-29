import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    VitePWA({
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
  },
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
  ssr: command === "build" ? { noExternal: /^react-relay$/ } : {},
}));
