// webpackConfig
// https://github.com/alb123pal/WebpackConfig/blob/master/webpack.config.js

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: path.join(__dirname + '/src/js/main.jsx'),
        home: path.join(__dirname + '/src/js/home.jsx'),
        about: path.join(__dirname + '/src/js/about.jsx'),
        contact: path.join(__dirname + '/src/js/contact.jsx')
    },
    devServer: {
        contentBase: './dist'
    },
    output: {
        path: path.join(__dirname + '/dist'),
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: [' ', '.js', '.jsx']
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            beautify: true,
            comments: false
        }),
        new ExtractTextPlugin({
            filename: '[name].bundle.css'
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: 'body',
            filename: 'index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/, // js lub jsx
                include: path.join(__dirname, 'src/js'),
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.scss$/,
                include: path.join(__dirname, 'src/css'),
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },

        ]
    }
}