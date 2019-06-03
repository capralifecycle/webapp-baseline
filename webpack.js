const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');

const packageJson = require('./package.json');
const configLocalJson = require('./config/local.json');
const configQaJson = require('./config/qa.json');
const configProdJson = require('./config/prod.json');

module.exports = env => {
  const isProd = env && env.production;

  const release = `${
    packageJson.version
  }-${new GitRevisionPlugin().commithash()}`;

  const commonConfig = {
    appName: packageJson.name,
    appVersion: release,
    buildTime: new Date().getTime(),
  };

  function outputConfig(filename, config) {
    return new GenerateJsonPlugin(filename, {
      ...commonConfig,
      ...config,
    });
  }

  const config = {
    entry: './src/index.tsx',
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: 'awesome-typescript-loader',
        },
        {
          enforce: 'pre',
          test: /\.*js$/,
          loader: 'source-map-loader',
        },
        {
          test: /\.svg$/i,
          use: 'url-loader',
        },
        {
          test: /(?<!\.module)\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.module\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
            'postcss-loader',
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
    },
    output: {
      filename: '[name].[contentHash].js',
      path: path.resolve(__dirname, 'build'),
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '-',
      },
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      outputConfig('config.json', configLocalJson),
      outputConfig('config/qa.json', configQaJson),
      outputConfig('config/prod.json', configProdJson),
    ],
  };

  if (isProd) {
    return {
      ...config,
      mode: 'production',
      devtool: 'source-map',
    };
  }

  return {
    ...config,
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './build',
      port: 3000,
    },
  };
};
