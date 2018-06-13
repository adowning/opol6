// import "@babel/polyfill";
import Vue from "vue";
import "./plugins/vuetify";
import "./plugins/amplify";
import "./plugins/onsip";
import "./plugins/fullcalendar";
// import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./vuex/store";
import "./registerServiceWorker";
import "./plugins/vue-notification";
import "./mixins/";
import VueResource from 'vue-resource'
console.log(process.env.NODE_ENV)
Vue.use(VueResource)
Vue.http.interceptors.push((request, next) => {
  // //console.log(request);
  next();
});


router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.loadUser) {
    // authentication is required
    console.log('must load user')
    store.dispatch('auth/loadUser').then(() => {
     //  store.dispatch('mqtt/startClient')
      next()
    }, (err) => {
      console.log('redirecting to signin...', err)
      next({ name: 'SignIn'})
    })
  } else {
    // authentication not required
    next()
  }
})

router.afterEach((to, from) => {
  // store.dispatch('resetMenuClass')
})


Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
