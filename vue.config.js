const path= require("path")
const fs = require("fs")
module.exports = {
  lintOnSave: false,
  publicPath: "/asura-site",
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
     {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', () => {
         const content = fs.readFileSync(path.join(__dirname, "./dist/index.html"), "utf-8")
         fs.writeFileSync(path.join(__dirname, "./dist/404.html"), content)
        });
     }
    }
    ]
  }
}
