const path = require("path");
const fs = require("fs");
const PrerenderSPAPlugin = require("prerender-spa-plugin");
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const generatedRoosters = require("./src/generated/roosters.json");

const staticRoutes = [
  "/",
  "/galos",
  "/info",
  "/backgrounds",
  "/pets",
  "/extras",
  "/donate",
  "/terms",
  "/privacy",
  "/galo",
];
const roosterRoutes = (generatedRoosters.roosters || []).map(
  (rooster) => `/galos/${rooster.slug}`,
);

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
          } catch {
            // The primary build output remains usable if an auxiliary file cannot be written.
          }
        });
      },
    });

    if (process.env.NODE_ENV === "production") {
      config.plugins.push(
        new PrerenderSPAPlugin({
          staticDir: path.join(__dirname, "dist"),
          routes: [...staticRoutes, ...roosterRoutes],
          renderer: new Renderer({
            headless: true,
            renderAfterDocumentEvent: "app-rendered",
            navigationOptions: { waitUntil: "domcontentloaded", timeout: 60000 },
            maxConcurrentRoutes: 4,
          }),
        })
      );
    }
  },
};
