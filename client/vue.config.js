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
          target: "http://192.168.1.6:1880/",
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