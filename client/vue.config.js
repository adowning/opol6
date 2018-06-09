module.exports = {
  lintOnSave: true,
  configureWebpack: {
    // output: {
    //   path: __dirname + "../app/public/"
    // },
    devtool: 'sourcemap',
   
  },
    devServer: {
      proxy: {
        "/gists": {
          target: "https://api.github.com",
          secure: false
        },
        "/api": {
          target: "https://opol-fred.mybluemix.net/",
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