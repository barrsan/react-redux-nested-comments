/* eslint-disable no-console */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.js');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
  stats: { colors: true },
}).listen(8080, 'localhost', (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:8080');
});
