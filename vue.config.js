module.exports = {

  chainWebpack: config => {
    config.module
      .rule('csv')
      .test(/\.csv$/)
      .use('csv-loader')
      .loader('csv-loader')
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/c3-dev-chart/'
    : '/'

}