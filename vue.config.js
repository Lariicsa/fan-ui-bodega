const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
  productionSourceMap: false,
  chainWebpack(config) {
    config.plugins.delete("prefetch");
    config.plugin("CompressionPlugin").use(CompressionPlugin);

    if (process.env.NODE_ENV !== "test") {
      config.optimization.splitChunks().clear();
    } else {
      config.module.rule("vue").uses.delete("cache-loader");
      config.module.rule("js").uses.delete("cache-loader");
      config.module.rule("ts").uses.delete("cache-loader");
      config.module.rule("tsx").uses.delete("cache-loader");
    }
  },
};
