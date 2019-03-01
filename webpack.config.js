const path = require('path'); // for different operating systems
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  context: path.join(__dirname, 'src'), // for './'
  entry: {
    app: './app/app.js', // key: file name ('app'), value: path to bundle
    about: './about/about.js'
  }, 
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js' // [name] grabbed from the entry key
  },
  module: {
    // use babel to compile es6 to es5
    rules: [
      {
        test: /\.js$/, // regex
        include: /src/, // or path.join(__dirname, 'src')
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    inline: true // dont run my app inside the webpack iframe
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      inject: 'body', // this is the default, not needed
      hash: true,
      chunks: ['app'] // name of the bundle, determined by the key in line 6. add only this bundle
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      hash: true,
      filename: 'about.html',
      chunks: ['about']
      // excludechunks: ['app']
    })
  ]
};