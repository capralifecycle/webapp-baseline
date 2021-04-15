/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
const path = require("path");
const fs = require("fs");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const webpack = require("webpack");

const packageJson = require("./package.json");

const inDocker = fs.existsSync("/.dockerenv");

const smp = new SpeedMeasurePlugin({
  disable: !process.env.MEASURE,
});

module.exports = (env) => {
  const isProd = env && env.production;

  const commitHash = new GitRevisionPlugin({
    commithashCommand: "rev-parse --short HEAD",
  }).commithash();

  const config = {
    entry: "./src/index.tsx",
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: [
            !isProd && {
              loader: "babel-loader",
              options: {
                plugins: ["react-refresh/babel"],
              },
            },
            {
              loader: "ts-loader",
            },
          ].filter(Boolean),
          use: "ts-loader",
          include: path.resolve(__dirname, "src"),
        },
        {
          test: /\.(svg|png)$/i,
          use: "url-loader",
        },
        {
          test: /(?<!\.module)\.css$/,
          include: path.resolve(__dirname, "src"),
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.module\.css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: {
                  localIdentName: "[name]__[local]__[contenthash:base64:5]",
                },
              },
            },
            "postcss-loader",
          ],
        },
      ],
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx"],
    },
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "build"),
    },
    optimization: {
      splitChunks: {
        chunks: "all",
        automaticNameDelimiter: "-",
      },
      runtimeChunk: {
        name: "manifest",
      },
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      new webpack.DefinePlugin({
        __BUILD_INFO__: JSON.stringify({
          appName: packageJson.name,
          appBuildTime: new Date().toISOString(),
          appVersion: `${new Date()
            .toISOString()
            .split("T")[0]
            .replace(/-/g, "")}-${commitHash}`,
          commitHash,
        }),
      }),
    ],
  };

  if (isProd) {
    return smp.wrap({
      ...config,
      mode: "production",
      devtool: "hidden-source-map",
      performance: {
        // https://web.dev/your-first-performance-budget/#budget-for-quantity-based-metrics
        hints: "warning",
        maxEntrypointSize: 170 * 1024,
        maxAssetSize: 450 * 1024,
      },
      plugins: [
        ...config.plugins,
        process.env.ANALYZE &&
          new BundleAnalyzerPlugin({
            defaultSizes: "gzip",
            generateStatsFile: true,
            analyzerMode: "static",
            openAnalyzer: false,
            // Paths are relative to output directory
            reportFilename: "../bundle-analyze-report.html",
            statsFilename: "../stats.json",
          }),
      ].filter(Boolean),
    });
  }

  // Configuration specific to developing locally
  return smp.wrap({
    ...config,
    mode: "development",
    // https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/e6774d935d11410a7928cb499b384fb7b592a162/docs/TROUBLESHOOTING.md#webpack-5-compatibility-issues-with-webpack-dev-server3
    target: "web",
    cache: true,
    devtool: "eval-source-map",
    devServer: {
      host: inDocker ? "0.0.0.0" : "127.0.0.1",
      disableHostCheck:
        process.env.DANGEROUSLY_DISABLE_HOST_CHECK === "true" ? true : false,
      contentBase: "./build",
      port: 3000,
      historyApiFallback: true,
      hot: true,
    },
    module: {
      rules: [
        ...config.module.rules,
        {
          enforce: "pre",
          test: /\.*js$/,
          loader: "source-map-loader",
        },
      ],
    },
    plugins: [...config.plugins, new ReactRefreshPlugin()],
    ignoreWarnings: [
      {
        message: /Failed to parse source map/,
      },
    ],
  });
};
