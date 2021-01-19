// 配置库打包
module.exports = {
  // 将子模块打包成类库
  configureWebpack: {
    output: {
      library: 'singleVue',
      libraryTarget: 'umd',
    },
    devServer: {
      port: 8089,
      headers: {
        'Access-Control-Allow-Origin': '*', // 主应用获取子应用时跨域响应头
      },
    },
  },
};
