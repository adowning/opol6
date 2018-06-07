module.exports = {
  configureWebpack: {
    devtool: 'sourcemap'
  },
    devServer: {
      proxy: {
        "/gists": {
          target: "https://api.github.com",
          secure: false
        },
        "/api": {
          target: "https://opol.mybluemix.net/",
          pathRewrite: {"^/api" : ""},
          secure: false
        },
        "/iss": {
          target: "http://api.open-notify.org/iss-now.json",
          pathRewrite: {"^/iss" : ""},
          secure: false
        }
      }
    }
  };