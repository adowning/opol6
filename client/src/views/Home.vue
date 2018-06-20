<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
<router-link v-if="!$_isAuthenticated" to="auth/signin" class="button--grey">Sign In</router-link>
<router-link v-if="!$_isAuthenticated" to="Auth/SignUp" class="button--grey">Sign Up</router-link>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
export default {
    name: 'Home',
    data: function() {
        return {
            options: { readOnly: false },
        }
    },
    methods: {

    },
    created: function() {
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
