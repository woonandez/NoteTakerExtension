var path = require('path');

module.exports = {

  entry: './src/index.js',

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src')

          ],
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  }
};

