var path = require('path');

module.exports = {

  entry: './src/app.js',

  output: {
    path: path.join(__dirname, 'www'),
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

