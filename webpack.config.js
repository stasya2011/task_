const path = require('path')

//* don't use this plagins while you don't create elements with them
const HtmlWebpackPlugin = require('html-webpack-plugin') // ! получаем класс плогина
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const WebpackNotifierPlugin = require('webpack-notifier')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const webpackConfig = require('./webpack.config')

module.exports = (env, oprions = {}) => {
  const { mode = 'development' } = oprions
  //console.log(env, options.mode);
  const isProd = mode === 'production'
  const isDev = mode === 'development'

  const getStyleLoader = () => {
    return [
      isProd ? MiniCssExtractPlugin.loader : 'style-loader', // в зависимомте от режима будем использовать соответствующий лоадер
      'css-loader',
    ]
  }

  const getPlagins = () => {
    const plugins = [
      new HtmlWebpackPlugin({
        title: 'React',
        buildTime: new Date(),
        template: 'public/index.html',
      }),
    ]

    if (isProd) {
      plugins.push(
        new MiniCssExtractPlugin({
          filename: 'main.css',
        })
      )
    }

    return plugins
  }

  return {
    mode: isProd ? 'production' : isDev && 'development', // production  'development'
    entry: './src/index.js', // вход
    output: {
      // выход
      path: path.resolve(__dirname, './dist'),
      filename: '[name].bundle.js',
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/, // это исключение, говорим что не распространять на файлы из данной папки
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },

        // loadings imgs rules
        {
          test: /\.(png|jpe?g|gif|ico|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'images',
                name: '[name].[ext]',
              },
            },
          ],
        },

        {
          test: /\.svg/,
          use: {
              loader: 'svg-url-loader'
          }
        },

        {
          test: /\.(ttf|otf|eot|woff|woff2)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'images',
                name: '[name].[ext]',
              },
            },
          ],
        },

        {
          test: /\.(mp3|wave?)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'images',
                name: '[name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(css)$/,
          use: getStyleLoader(),
        },

        // loading SASS/SCSS
        // MiniCssExtractPlugin.loader удобно использовать для продакшен
        // style-loader для разработки
        {
          test: /\.(s[ca]ss)$/,
          use: [...getStyleLoader(), 'sass-loader'],
        },
      ],
    },

    plugins: getPlagins(),

    devServer: {
      open: true, // автоматически открывает браузер
    },
  }
}
