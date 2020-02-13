const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')

const DEV_SERVER_PORT = 3000
const DEV_SERVER_URL = `http://localhost:${DEV_SERVER_PORT}`

const paths = require('./paths')

const config = {
  entry: paths.appEntry,
  output: {
    path: paths.build,
    filename: '[name].[hash].js'
  },
  devServer: {
    contentBase: paths.build,
    compress: true,
    hot: true,
    inline: true,
    port: DEV_SERVER_PORT
  },
  plugins: [
    new CleanWebpackPlugin(),
    new OpenBrowserPlugin({ url: DEV_SERVER_URL }),
    new HtmlWebpackPlugin({ template: paths.appTemplate })
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              root: paths.appSrc,
              esModule: false
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false
            }
          }
        ]
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png',
              esModule: false
            }
          }
        ]
      }
    ]
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}

module.exports = config
