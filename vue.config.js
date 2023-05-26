const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({

  // devServer: {
  //   proxy: { 
  //     '/api': {
  //       /* 目标代理服务器地址 */
  //       target: "http://192.168.106.63:8080",
  //       /* 允许跨域 */
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api':''
  //       },
  //     },
  //   },
  // },
})


function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // eslint-disable-next-line no-undef
        '@': resolve('src'),
      },
    },
  },
}

