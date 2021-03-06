const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = ({ development }) => {
  const isDevEnv = Boolean(development);
  
  return {
    entry: {
      background: path.resolve(__dirname, "src/app/background/index.ts"),
      contentScript: path.resolve(__dirname, "src/app/content-script/index.ts"),
      defaultPopup: path.resolve(__dirname, "src/views/default-popup/index.tsx"),
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "build"),
    },
    resolve: {
      extensions: [".js", ".ts", ".json", ".jsx", ".tsx"],
      alias: {
        "@": path.resolve(__dirname, "src"),
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        chunks: ["defaultPopup"],
        filename: "./default-popup.html",
      }),
      new CleanWebpackPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            // Transpile code with Babel
            {
              loader: "babel-loader",
              options: {
                configFile: false,
                presets: [
                  ["@babel/preset-env", {
                    corejs: 3,
                    useBuiltIns: "usage",
                  }],
                  "@babel/preset-react",
                ],
                plugins: [
                  "@babel/plugin-transform-runtime",
                  ["babel-plugin-styled-components", {
                    displayName: isDevEnv,
                  }],
                ]
              },
            },
            // Compile TypeScript
            {
              loader: "ts-loader",
            }
          ]
        },
      ],
    },
  };
};