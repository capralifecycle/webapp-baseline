const merge = require('webpack-merge');

const commonConfig = reuqire('./webpack.common');

module.exports = merge(commonConfig, {
  mode: 'production',
  devtool: 'source-map'
});
