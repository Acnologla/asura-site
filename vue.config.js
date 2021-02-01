const path= require("path")
const fs = require("fs")
module.exports = {
  lintOnSave: false,
  publicPath: "/asura-site",
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === "production"){
      config.plugin('html').tap((opts) => {
        opts[0].filename = './404.html';
        return opts;
      });
    }
  },
  configureWebpack: {
    plugins: [
     {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
         const content = fs.readFileSync(path.join(__dirname, "./dist/404.html"), "utf-8")
         fs.writeFileSync(path.join(__dirname, "./dist/index.html"), content)
        });
     }
    }
    ]
  }
}
