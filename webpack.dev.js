const path = require("path");
const { merge } = require("webpack-merge");
const webpackCommonConfig = require("./webpack.common.js");

module.exports = merge(webpackCommonConfig, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    publicPath: path.resolve(__dirname, "/build"),
    compress: true,
    port: 9000,
  },
});