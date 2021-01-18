const path = require('path');

module.exports = {
  entry: './gulpfile.js',
  target: 'node',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};