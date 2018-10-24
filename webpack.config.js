module.exports = {
  entry: ['babel-polyfill', './client'],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  }
}