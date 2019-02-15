module.exports = {
  publicPath: "/app",
  outputDir: "../public/app",

  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    }
  },

  devServer: {
    host: '0.0.0.0',
    port: '8080',
    public: 'localhost:8989',
    disableHostCheck: true,
    watchOptions: {
      ignored: ['node_modules'],
      aggregateTimeout: 300,
      poll: 1000
    }
  }
}