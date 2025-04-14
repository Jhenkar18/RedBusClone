const webpack = require('webpack');

module.exports = {
  // Other webpack configurations...
  resolve: {
    fallback: {
      "zlib": require.resolve("browserify-zlib"),
      "stream": require.resolve("stream-browserify"),
      "path": require.resolve("path-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "util": require.resolve("util/"),
      "url": require.resolve("url/"),
      "os": require.resolve("os-browserify/browser"),
      "buffer": require.resolve("buffer/"),
      "timers": require.resolve("timers-browserify"),
      "querystring": require.resolve("querystring-es3"),
      "fs": false, // fs is not available in the browser environment
      "net": false, // net is not available in the browser environment
      "tls": false, // tls is not available in the browser environment
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
  ],
};
