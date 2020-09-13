module.exports = {
  modifyWebpackConfig: ({ env, webpackConfig }) => {
    if (env.target === "node") {
      const rules = webpackConfig.module.rules;
      rules[rules.length - 1].use[0].options.modules.localIdentName =
        "[name]__[local]___[hash:base64:5]";
    }

    return webpackConfig;
  },
};
