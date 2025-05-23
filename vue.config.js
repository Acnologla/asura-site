const path = require("path");
const fs = require("fs");
module.exports = {
  lintOnSave: false,
  publicPath: "/",
  productionSourceMap: false,
  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      },
    },
    plugins: [
      {
        apply: (compiler) => {
          compiler.hooks.afterEmit.tap("AfterEmitPlugin", () => {
            try {
              const content = fs.readFileSync(
                path.join(__dirname, "./dist/index.html"),
                "utf-8"
              );
              fs.writeFileSync(
                path.join(__dirname, "./dist/404.html"),
                content
              );
              fs.writeFileSync(
                path.join(__dirname, "./dist/CNAME"),
                "asurabot.com.br"
              );
            } catch (_) {}
          });
        },
      },
    ],
  },
};
