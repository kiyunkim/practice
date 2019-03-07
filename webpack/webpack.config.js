const path = require('path'); // for different operating systems
const HtmlWebpackPlugin = require('html-webpack-plugin'); // webpack only knows js, so add plugin to read html
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // to convert into css file

// environment set in cli through scripts
const isDev = process.env.NODE_DEV === 'dev';

const config = {
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
  resolve: {
    extensions: ['.js','.scss']
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
      },
      {
        test: /\.scss$/,
        include: /src/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    inline: true, // dont run my app inside the webpack iframe 
    stats: 'errors-only',
    port: 8000, // number doesnt matter
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'custom title',
      text: 'some text',
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
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
}

if (isDev) {
  config.mode = 'development';
  config.plugins.push(
    // new plugin only for dev environment
  )
} else {
  config.mode = 'production';
}

console.log('environment: '+ config.mode); // logged in cli
module.exports = config;