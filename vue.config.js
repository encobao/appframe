module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  //publicPath: '/tasks/',
  publicPath: process.env.NODE_ENV === 'production' ? '/tasks/' : '/',
  devServer: {
    proxy: 'http://encobao.com'
  }  
}