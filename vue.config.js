module.exports = {
  chainWebpack: config => {
    // remove the prefetch plugin
    config.plugins.delete('prefetch');
    config.plugins.delete('preload');

    config.plugin('html').tap(args => {
      const argumentwebpack = args;
      argumentwebpack[0].scriptLoading = 'defer';
      argumentwebpack[0].hash = true;
      return argumentwebpack;
    });
  },
  devServer: {
    port: 3200,
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/vue3-pokemon-search/' : '/',
};
