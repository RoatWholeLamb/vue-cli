const path = require('path')
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { VueLoaderPlugin } = require('vue-loader')
const { DefinePlugin } = require("webpack");

// 处理样式loader的通用函数
const getStyleLoader = (pre) => {
  return [
    'vue-style-loader','css-loader',{
      // 处理css兼容性
      // 需要配合package.json的browserlist属性来决定兼容性
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['postcss-preset-env']
        }
      }
    },
    pre
  ].filter(Boolean)
}


module.exports = {
  // 入口
  entry: './src/main.js',

  // 输出
  output: {
    path: undefined, // 开发环境不需要打包，可以设置路径为undefined
    filename: 'static/js/[name].js', // 指定bundle资源的路径以及命名
    chunkFilename: 'static/js/[name].chunk.js', // 一般是动态导入的一些资源
    assetModuleFilename: 'static/media/[hash:10][ext][query]', // 一些静态资源如图片等
  },

  // 存放loader的module
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/i, // 以css结尾的文件
        use: getStyleLoader()
      },
      {
        test: /\.less$/i, // 以less结尾的文件
        use:getStyleLoader('less-loader')
      },
      {
        test: /\.s[ac]ss$/i, // 以sass/scss结尾的文件
        use:getStyleLoader('sass-loader')
      },
      {
        test: /\.styl$/i, // 以styl结尾的文件
        use:getStyleLoader('stylus-loader')
      },
      // 处理图片资源
      {
        test: /\.(jpe?g|png|webp|svg|gif)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 当图片小于10kb时转为base64
          }
        }
      },
      // 处理其他资源
      {
        test: /\.(woff2?|ttf|mp3|mp4)$/,
        type: 'asset/resource'
      },
      // babel处理js资源
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          cacheCompression: false          
        },
      }
    ]
  },

  // 需要加载的插件plugins
  plugins: [
    new ESLintWebpackPlugin({
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules",
      cache: true,
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    // new ReactRefreshWebpackPlugin()
    new VueLoaderPlugin(),
    // 解决页面警告
    new DefinePlugin({
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true",
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__ : false,
    })
  ],

  // 关于压缩的配置项
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
  },
  resolve: {
    extensions: [".vue", ".js", ".json"], // 自动补全文件扩展名，让vue可以使用
  },
  devServer: {
    open: true,
    host: "localhost",
    port: 3000,
    hot: true,
    historyApiFallback: true, // 解决vue-router刷新404问题
  
},

  // 开发模式mode
  mode: 'development',
  devtool: "cheap-module-source-map"
}
