module.exports = {
  modifyWebpackConfig: ({ env, webpackConfig, webpackObject }) =>
    require('razzle-heroku')(webpackConfig, env, webpackObject),
  plugins: [
    {
      name: 'workbox',
      options: {
        additionalManifestEntries: [],
        navigateFallback: undefined,
        runtimeCaching: [
          {
            urlPattern: /^(?:(?!google\.com|graphql|tokensignin|signin|signout).)+$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheableResponse: {
                statuses: [200],
              },
            },
          },
        ],
      },
    },
  ],
};
