module.exports = {
  devServer: {
    proxy: {
      '^/api/':{
        target: 'http://113.212.87.157:9025/',
        secure: false,
        changeOrigin: true
      },
      '^/u/api/':{
        target: 'http://113.212.87.157:9025/',
        secure: false,
        changeOrigin: true
      }
    }
  },
}