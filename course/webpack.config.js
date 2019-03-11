const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = function (env) {
  const isDev = env.dev;
  const isProd = env.prod;

  const baseConfig = {
    entry: './app/app.js',
    output: {
      path: path.resolve(__dirname, 'app/dist'),
      filename: 'app.bundle.js',
      publicPath: '/dist/',
    },
    plugins: [
      new webpack.DefinePlugin({ // define constants
        ENV: JSON.stringify(isDev ? 'development' : 'production')
      }),
      new CleanWebpackPlugin()
    ]
  }

  if (isDev) {
    return merge(baseConfig, {
      mode: 'development',
      devServer: {
        contentBase: path.resolve(__dirname, 'app'),
        watchContentBase: true,
      },
      plugins: [
        { // see config
          apply(compiler) {
            compiler.plugin("done", function() {
              console.log(require('util').inspect(compiler.options))
            })
          }
        }
      ]
    })
  }
  if (isProd) {
    return merge(baseConfig, {
      mode: 'production',
      module: {
        rules: [
          {
            test: /\.js$/,
            include: /app/,
            use: {
              loader: 'babel-loader', // compile js only in prod
              options: {
                presets: [
                  ['@babel/preset-env', {
                    debug: true,
                    targets: {
                      browsers: ['defaults']
                    }
                  }]
                ]
              }
            }
          }
        ]
      }
    })
  }
};