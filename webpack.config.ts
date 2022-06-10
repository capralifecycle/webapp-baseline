import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import * as fs from "fs";
import { GitRevisionPlugin } from "git-revision-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import SpeedMeasurePlugin from "speed-measure-webpack-plugin";
import * as webpack from "webpack";
// Needed so typings are correct
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as devServer from "webpack-dev-server";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import packageJson from "./package.json";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

// TODO: Don't detect container by reading this file, it does
//  not always exist.
const inDocker = fs.existsSync("/.dockerenv");

const smp = new SpeedMeasurePlugin({
  disable: !process.env.MEASURE,
});

const config = (env: Record<string, unknown>): webpack.Configuration => {
  const isProd = env && env.production;

  const commitHash =
    new GitRevisionPlugin({
      commithashCommand: "rev-parse --short HEAD",
    }).commithash() ?? "unknown";

  const config: webpack.Configuration = {
    entry: "./src/index.tsx",
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: [
            ...(isProd
              ? []
              : [
                  {
                    loader: "babel-loader",
                    options: {
                      plugins: ["react-refresh/babel"],
                    },
                  },
                ]),
            {
              loader: "ts-loader",
            },
          ],
          include: path.resolve(__dirname, "src"),
        },
        {
          test: /\.(svg|png)$/i,
          use: "url-loader",
        },
        {
          test: /(?<!\.module)\.css$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "postcss-loader",
          ],
        },
        {
          test: /\.module\.css$/,
          include: path.resolve(__dirname, "src"),
          use: [
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
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
      publicPath: "/",
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
        template: "src/index.html",
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
        ...(config.plugins ?? []),
        new MiniCssExtractPlugin(),
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
      ].filter((it): it is webpack.WebpackPluginInstance => it != null),
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
      allowedHosts:
        process.env.DANGEROUSLY_DISABLE_HOST_CHECK === "true" ? "all" : "auto",
      static: {
        directory: "./build",
      },
      port: 3000,
      historyApiFallback: true,
      hot: true,
    },
    module: {
      rules: [
        ...(config.module?.rules ?? []),
        {
          enforce: "pre",
          test: /\.*js$/,
          loader: "source-map-loader",
        },
      ],
    },
    plugins: [...(config.plugins ?? []), new ReactRefreshPlugin()],
    ignoreWarnings: [
      {
        message: /Failed to parse source map/,
      },
    ],
  });
};

export default config;
