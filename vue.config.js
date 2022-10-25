module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/portal-front/" : "/",
  devServer: {
    proxy: {
      '^/api/':{
        target: 'http://localhost:8181/',
        secure:false,
        changeOrigin: true
      },
      '^/u/api/':{
        target: 'http://localhost:8181/',
        secure:false,
        changeOrigin: true
      }
    }
  }
}