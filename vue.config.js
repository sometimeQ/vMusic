// 这个文件是新建的vue.config.js
// 参考配置如下: https://cli.vuejs.org/zh/config/
// configureWebpack
// 重新打包压缩 npm run serve
module.exports = {

  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(html)$/,
          exclude: /node_modules/,
          use: {
            loader: 'html-loader',
            // 压缩
            options: {
              minimize: true
            }
          }
        }
      ]
    }
  },
}
