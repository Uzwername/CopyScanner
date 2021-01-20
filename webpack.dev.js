const path = require("path");
const { merge } = require("webpack-merge");
const ESLintPlugin = require("eslint-webpack-plugin");
const webpackCommonConfig = require("./webpack.common.js");

module.exports = env => {
  const devConfig = {
    /**
     * Somewhy presence of .browserslistrc will
     * break devServer functionality. To fix it
     * target: "web" setting is needed.
     * @see {@link https://github.com/webpack/webpack-dev-server/issues/2758#issuecomment-710086019}
     */
    target: "web",
    devtool: "inline-source-map",
    plugins: [
      new ESLintPlugin({
        fix: true,
        extensions: ["ts", "tsx", "js", "jsx"],
      }),
    ],
  };
  
  if (env.server) {
    devConfig.devServer = {
      // general
      compress: true,
      // web server
      publicPath: "/",
      port: 9000,
      index: "default-popup.html",
      // watch file changes
      contentBase: path.resolve(__dirname, "src/views"),
      watchContentBase: true,
      // browser
      open: true,
    };
  }
  
  return merge(webpackCommonConfig(env), devConfig);
};