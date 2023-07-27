const SitemapPlugin = require("sitemap-webpack-plugin").default;

const paths = [
  {
    path: '/',
    priority: 1,
    lastmod: true
  },
  {
    path: '/login',
    priority: 1,
    lastmod: true
  },
  {
    path: '/u/tasks',
    priority: 0.9,
    lastmod: true
  },
  {
    path: '/u/my-tasks',
    priority: 0.9,
    lastmod: true
  }
]


module.exports = {
  configureWebpack: {
    plugins: [
      new SitemapPlugin({
        base: 'https://corporatetasks.com/#/',
        paths,
        options: {
          skipgzip: true
        }
      })
    ],
  },
  devServer: {
    proxy: {
      '^/api/':{
        target: 'http://localhost:8081',
        secure: false,
        changeOrigin: true
      }
    }
  },
}