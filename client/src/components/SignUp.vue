<template>
  <div color="black" background-color="green">
    <h1>AWS Chat</h1>
    <form class="container padded" @submit.prevent="triggerSignUp">
      <input type="text" placeholder="xx.name" v-model="username"><br>
      <input type="text" placeholder="email" v-model="email"><br>
      <input type="password" placeholder="asdfasdf" v-model="pass"><br>
      <button type="submit" class="block">Sign Up</button>
    </form>
    <nav class="simple">
      <span>Have an account?</span>
      <router-link to="/signin">Sign In</router-link>
      <br><router-link to="/confirm">Confirm</router-link>
    </nav>
  </div>
</template>
<script>
  import { mapActions } from 'vuex'
  export default {
    data() {
      return {
        username: '',
        email: 'ashdowning+ff.name@gmail.com',
               pass: 'Andrews1',
      }
    },
    methods: {
      triggerSignUp() {
        // this.signUp({username: this.username, email: this.email, pass: this.pass, humanityname: this.humanityname, humanitypass: this.humanitypass, humanityid: this.humanityid}).then(() => {
        this.signUp({username: this.username, pass: this.pass, email: this.email }).then(() => {
          console.log('successfully signed up!')
          this.$router.push({path: '/confirm', query: {username: this.username}})
        }, () => {
          // alert('there was an error')
        })
      },
      ...mapActions('cognito', {
        signUp: 'signUp'
      })
    }
  }
</script>
<style lang="scss" scoped>
  div {
    color: black;
    background-color: green;
  }
  input {
    background-color: white;
  }
  </style>