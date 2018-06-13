<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
       
<router-link v-if="!$_isAuthenticated" to="auth/signin" class="button--grey">Sign In</router-link>
<router-link v-if="!$_isAuthenticated" to="Auth/SignUp" class="button--grey">Sign Up</router-link> 
        <!-- <blockquote>
          &#8220;First, solve the problem. Then, write the code.&#8221;
          <footer>
            <small>
              <em>&mdash;John Johnson</em>
            </small>
          </footer>
        </blockquote> -->
          <!-- <formio src="https://kjzdduvppatlaap.form.io/profile" v-on:submit="onSubmitMethod" /> -->

      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
// import { Form } from "vue-formio";
import { Auth } from 'aws-amplify';
import Vue from 'vue'

export default {
  name: "Home",
  // components: { formio: Form },

  data() {
    return {
      options: { readOnly: false },

   
    }
  },
  methods: {
    onSubmitMethod: function(submission) {
      // console.log(submission);
    },
    onChangeMethod: function(change) {
      // console.log(change);
    }

},
created() {
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
