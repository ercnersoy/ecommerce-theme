const path = require('path')
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPluginPartials = require('html-webpack-partials-plugin');

module.exports = {
    entry: {
        app: [
          './src/js/plugins/jquery.mobilemenu.js',
          './src/app.js',
          './src/app.scss'
        ]
    },
    externals: {
      jquery: 'jQuery',
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false
            },
            parallel: true
          }
        })
      ]
    },
    output: {
      //filename: '[name].[chunkhash].js',
      // [chunkhash]: her build işleminde benzersiz bir çıktı üretmek için kullanılır.
      filename: 'main.min.js',
      path: __dirname + '/dist'
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: false,
      port: 1907
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/pages/index.html',
            inject: 'head',
            favicon: ''
            // inject: true => Otomatik olarak build dosyasını script tag'ı olarak eklemeyi sağlar.
          }), 
          new HtmlWebpackPlugin({
            filename: 'blogList.html',
            template: './src/pages/blogList.html',
            inject: 'head',
            favicon: ''
            // inject: true => Otomatik olarak build dosyasını script tag'ı olarak eklemeyi sağlar.
          }), 
          new HtmlWebpackPlugin({
            filename: 'blogDetail.html',
            template: './src/pages/blogDetail.html',
            inject: 'head',
            favicon: ''
            // inject: true => Otomatik olarak build dosyasını script tag'ı olarak eklemeyi sağlar.
          }), 
          new HtmlWebpackPlugin({
            filename: 'productDetail.html',
            template: './src/pages/productDetail.html',
            inject: 'head',
            favicon: ''
            // inject: true => Otomatik olarak build dosyasını script tag'ı olarak eklemeyi sağlar.
          }), 
          new HtmlWebpackPlugin({
            filename: 'contact.html',
            template: './src/pages/contact.html',
            inject: 'head',
            favicon: ''
            // inject: true => Otomatik olarak build dosyasını script tag'ı olarak eklemeyi sağlar.
          }), 
          new HtmlWebpackPlugin({
            filename: 'cart.html',
            template: './src/pages/cart.html',
            inject: 'head',
            favicon: ''
            // inject: true => Otomatik olarak build dosyasını script tag'ı olarak eklemeyi sağlar.
          }), 
          new HtmlWebpackPlugin({
            filename: 'searchResult.html',
            template: './src/pages/searchResult.html',
            inject: 'head',
            favicon: ''
            // inject: true => Otomatik olarak build dosyasını script tag'ı olarak eklemeyi sağlar.
          }), 
          new HtmlWebpackPlugin({
            filename: 'resetPassword.html',
            template: './src/pages/resetPassword.html',
            inject: 'head',
            favicon: ''
            // inject: true => Otomatik olarak build dosyasını script tag'ı olarak eklemeyi sağlar.
          }), 
          new MiniCssExtractPlugin({
            filename: 'main.min.css'
          }),
          new CopyPlugin({
            patterns: [
              { from: 'src/assets', to: 'assets', noErrorOnMissing: true }
            ],
          }),
          new HtmlWebpackPluginPartials({
            path: path.join(__dirname, './src/partials/_mobilemenu.html'),
            location:'mobilemenu',
            template_filename:['index.html','blogList.html','blogDetail.html','productDetail.html','contact.html','cart.html','searchResult.html','resetPassword.html']
          }),
          new HtmlWebpackPluginPartials({
            path: path.join(__dirname, './src/partials/_header.html'),
            location:'header',
            template_filename:['index.html','blogList.html','blogDetail.html','productDetail.html','contact.html','cart.html','searchResult.html','resetPassword.html']
          }),
          new HtmlWebpackPluginPartials({
            path: path.join(__dirname, './src/partials/_footer.html'),
            location:'footer',
            template_filename:['index.html','blogList.html','blogDetail.html','productDetail.html','contact.html','cart.html','searchResult.html','resetPassword.html']
          }),
      ],
      module: {
        rules: [
          {
            test: [/.js$/], // test => Hangi dosya tiplerinin işlemden geçeceğini belirttiğimiz property
            exclude: /(node_modules)/, // exclude => Hangi klasörlerin işlemden geçmeyeceğini belirttiğimiz property
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
          {
            test: [/.css$|.scss$|.sass$/],
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
          },
          {
            test: /(\.(woff2?|ttf|eot|otf)$|font.*\.svg$)/,
            use: [
              {
                loader: 'file-loader',
                options: { 
                  name: "[name].[ext]",
                  outputPath: 'assets/fonts'
                } 
              },
            ],
          },
          {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
              { 
                loader: "file-loader", 
                options: { 
                  name: "[name].[ext]",
                  outputPath: 'assets/images'
                } 
              }
          ]
          },
          {
            test: /\.svg/,
            use: {
              loader: "svg-url-loader",
              options: {
                // make all svg images to work in IE
                iesafe: true,
                outputPath: 'assets/images/svg'
              },
            },
          }
          /*{ 
            test: /\.html$/i,
            include: path.join(__dirname, 'src/include'),
            use: {
              loader: 'html-loader',
              options: {
                interpolate: true
              }
            }
          },*/
        ]
      },
      resolve: {
        alias: {
          '@node_modules': path.resolve(__dirname, 'node_modules'),
          '@base': path.resolve(__dirname, 'src/scss/base'),
          '@functions': path.resolve(__dirname, 'src/scss/functions'),
          '@atoms': path.resolve(__dirname, 'src/scss/atoms'),
          '@organisms': path.resolve(__dirname, 'src/scss/organisms'),
          '@pages': path.resolve(__dirname, 'src/scss/pages'),
          '@fonts': path.resolve(__dirname, 'src/assets/fonts'),
          '@images': path.resolve(__dirname, 'src/assets/images')
        }
      }
  }