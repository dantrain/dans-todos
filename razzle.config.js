module.exports = {
  modify: require("razzle-heroku"),
  plugins: [
    {
      name: "workbox",
      options: {
        additionalManifestEntries: [],
        navigateFallback: undefined,
        runtimeCaching: [
          {
            urlPattern: /^(?:(?!google\.com|graphql|tokensignin|onetaptokensignin|signout).)+$/,
            handler: "StaleWhileRevalidate",
          },
        ],
      },
    },
  ],
};
