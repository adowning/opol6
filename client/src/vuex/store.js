import Vue from "vue";
import Vuex from "vuex";
import authModule from "./modules/auth/auth";
import assetsModule from "./modules/assets/assets";
import timeModule from "./modules/timeclocks";
// import memberModule from "./modules/member/member";
import mqttModule from "./modules/mqtt/mqtt";
import cognitoModule from "./modules/cognito/cognito";
// import getAsyncModule from "@liqueflies/vuex-async-module";
// import axios from "axios";
// import productsModule from './modules/products';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
     auth: authModule,
    timeclocks: timeModule,
    //  member: memberModule,
    mqtt: mqttModule,
    cognito: cognitoModule,
    assets: assetsModule
  }

});