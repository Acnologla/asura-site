module.exports = {
  lintOnSave: false,
  publicPath: "/asura-site",
  chainWebpack: (config) => {
    config.plugin('html').tap((opts) => {
      opts[0].filename = './404.html';
      return opts;
    });

  }
}
