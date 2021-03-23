module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  //publicPath: '/tasks/',
  publicPath: process.env.NODE_ENV === 'production' ? '/superhero/' : '/',
  devServer: {
    proxy: 'http://encobao.com'
  }
}