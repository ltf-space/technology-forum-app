module.exports = {
  // configureWebpack: {
    devServer: {
      port: 9000,
      proxy: {
        '/api': { //访问路径，可以自己设置，
          target: 'http://zinchon.com:25578/api', //代理接口，即后端运行所在的端口
          // target: 'http://yyp.asia:8888/api', //代理接口，即后端运行所在的端口
          changeOrigin: true, //设置是否跨域
          ws: true,
          pathRewrite: { //访问路径重写
            '^/api': '/'
          }
        }
      }
    }
  // }
}