<template>
  <v-container grid-list-md class="mt-3">
    <v-layout row wrap justify-center>
      <v-flex xl6 lg10 md10 sm12 xs10>
        <v-card class="pa-2 ml-4 mr-2">
          <v-layout row justify-center >

            <v-layout column align-center>
              <transition appear name="fadeout">
                <img class="aws-logo" style="width:140px;height:140px" src="../assets/logo.png">
              </transition>
              <h2 class="subtitle">
                ANDREWS ADMINISTRATION
                <br>
              </h2>
              <h3>{{version}}</h3>
            </v-layout>
            <v-flex xl6 lg6 md6 sm6>
              <transition appear name="fadeout">
                <v-card class="elevation-0">
                  <div :style="theme.error" v-if="error">
      {{ error }}
    </div>
                  <v-card-text>
                    <v-progress-circular v-if="loading" :size="90" :width="9" indeterminate color="primary"></v-progress-circular>
                    <div v-if="!confirmView && !loading && !newPasswordView">

                      <v-text-field v-model="username" label="Username" required/>
                      <v-text-field v-model="password" :append-icon="hidepw ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (hidepw = !hidepw)"
                        :type="hidepw ? 'password' : 'text'" label="Password" hint="At least 6 characters" required/>
                      <v-btn color="#9c27b0" v-on:click="triggerSignIn">
                        Sign In
                      </v-btn>
                    </div>

                    <div v-if="confirmView">
                      <div :style="theme.inputRow">
                        <input :style="theme.input" v-model="code" placeholder="Code" v-on:keyup.enter="confirm" />
                      </div>
                      <div :style="theme.actionRow">
                        <button :style="theme.action" v-on:click="confirm" :disabled="!code">Confirm</button>
                      </div>
                    </div>
                    <div v-if="newPasswordView">
                      
                      <div :style="theme.inputRow">
                            
                            <v-text-field v-model="newpass" :append-icon="hidepw ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (hidepw = !hidepw)"
                        :type="hidepw ? 'newpass' : 'text'" label="New Password" hint="At least 6 characters" required/>
                      </div>
                      <div :style="theme.actionRow">
                        <button :style="theme.action" v-on:click="newPassword" :disabled="!newpass">Confirm</button>
                      </div>
                    </div>
                    <div :style="theme.footer">
              
                    </div>
                  </v-card-text>
                </v-card>
              </transition>
            </v-flex>
          </v-layout>
          <v-layout>
          </v-layout>
        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { Auth, JS, Logger } from "aws-amplify";
import AmplifyTheme from "./AmplifyTheme";
  import { mapActions } from 'vuex'

var pjson = require("../../package.json");

export default {
  name: "SignIn",
  computed: {
    version() {
      return pjson.version;
    },

  },
  data() {
    return {
      username: "",
      password: "asdfasdf",
      // showerr: false,
      hidepw: true,
      newpass: null,
       newPasswordView: false,
      error: "",
      loading: false,
      user: null,
      ap: null,
      confirmView: false,
      code: "",
      theme: AmplifyTheme
    };
  },
  
  methods: {

       triggerSignIn() {
        this.signIn({username: this.username, pass: "asdfasdf"}).then(() => {
          console.log('going to home now')
          this.$router.push({name: 'Home'})
        }, () => {
          console.log('there was an error')
          alert('there was an error')
        })
      },
      
      ...mapActions('cognito', {
        signIn: 'signIn'
      }),
//     async signIn () {
//        var authenticationData = {
//             username:  'ash',
//             password: this.password
//     };
//        const user = await Auth.signIn(this.username, this.password).catch(err =>{
//        console.log(err)   
//        this.fireNotify(err, 'auth')})
//       try{
//        if (user.challengeName === 'NEW_PASSWORD_REQUIRED' || user.challengeName === 'PASSWORD_VERIFIER') {
//          Auth.completeNewPassword(user, this.password).then(user => {
//         // this.$store.dispatch('auth/setUser', user)
//         // this.$store.dispatch('cognito/signIn', authenticationData.username, authenticationData.password)

//             // this.$router.push('/')
//             return
//          })
//        }else{
//           // this.$store.dispatch('auth/setUser', user)
//         // this.$store.dispatch('cognito/signIn', authenticationData.username, authenticationData.password)
//   this.signIn({username: this.usernameC, pass: this.pass}).then(() => {
//           console.log('going to home now')
//           this.$router.push({name: 'Home'})
//         }, () => {
//           console.log('there was an error')
//           alert('there was an error')
//         })
// this.$router.push('/')
//        }
//       }catch(err){
//        this.fireNotify(err, 'auth')

//       }
//     },

    async checkUser() {
      const user = this.user;
      if (user) return;
      try {
        const data = await Auth.verifiedContact(user);
        this.$store.dispatch("setVerification", data);
        if (!JS.isEmpty(data.verified)) {
          this.$router.replace("/people/Profile");
        } else {
          this.$router.replace("/AuthStore/VerifyContact");
        }
      } catch (err) {
        console.log(err);
      }
    },
    async confirm() {
      try {
        await Auth.confirmSignIn(this.user, this.code);
        this.$router.replace("/people/Profile");
      } catch (err) {
        this.setError(err);
        this.fireAuthNotify(this.error);
      }
    },
    // forgot() {
    //   this.$router.replace('/Auth/forgotPassword')
    // },
    // signUp() {
    //   this.$router.replace('/Auth/SignUp')
    // },
    setError: function(err) {
      this.error = err.message || err;
    }
  }
};
</script>
<style scoped>
.subtitle {
  font-weight: 300;
  font-size: 18px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
