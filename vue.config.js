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

  }
}
