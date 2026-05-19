const path = require("path");
const fs = require("fs");
const PrerenderSPAPlugin = require("prerender-spa-plugin");
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

module.exports = {
  lintOnSave: false,
  publicPath: "/",
  productionSourceMap: false,
  configureWebpack: (config) => {
    config.optimization.splitChunks = {
      minSize: 10000,
      maxSize: 250000,
    };

    config.plugins.push({
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
    });

    if (process.env.NODE_ENV === "production") {
      config.plugins.push(
        new PrerenderSPAPlugin({
          staticDir: path.join(__dirname, "dist"),
          routes: ["/"],
          renderer: new Renderer({
            headless: true,
            renderAfterDocumentEvent: "app-rendered",
          }),
        })
      );
    }
  },
};
