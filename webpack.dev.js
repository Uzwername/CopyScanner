const path = require("path");
const { merge } = require("webpack-merge");
const webpackCommonConfig = require("./webpack.common.js");

module.exports = env => {
  return merge(webpackCommonConfig(env), {
    /**
     * Somewhy detected .browserslistrc will
     * break devServer functionality
     * @see {@link https://github.com/webpack/webpack-dev-server/issues/2758#issuecomment-710086019}
     */
    target: "web",
    devtool: "inline-source-map",
    devServer: {
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
    },
  });
}