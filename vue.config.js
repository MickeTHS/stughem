module.exports = {
    devServer: {
      open: process.platform === 'win32',
      host: '0.0.0.0',
      port: 8080, // CHANGE YOUR PORT HERE!
      https: true,
      hotOnly: false,
    },
  }