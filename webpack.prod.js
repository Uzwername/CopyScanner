const { merge } = require("webpack-merge");
const webpackCommonConfig = require('./webpack.common.js');

module.exports = env => {
  return merge(webpackCommonConfig(env), {});
};