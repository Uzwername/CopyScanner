const { merge } = require("webpack-merge");
const webpackCommonConfig = require('./webpack.common.js');

module.exports = merge(webpackCommonConfig, {
  mode: "production",
});