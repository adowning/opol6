<template>
  <v-footer
    flat
    dense
    dark
    style="max-height: 18px;"
    app>
    <!-- <v-toolbar
      color="primary"
      style="max-height: 24px;"
      dense
      dark > -->
      <v-spacer/>
      <!-- <v-badge
        color="red"
        overlap>
        <i class="material-icons orange600">dialpad</i>

      </v-badge> -->
      <v-spacer/>
      <!-- <v-tooltip bottom>s -->

      <!-- <v-btn slot="activator" icon @click.stop="rightDrawer = !rightDrawer"> -->
      <!-- <v-btn  
          icon class="pr-4">
        <v-badge
          overlap>
          <span v-if="chatMessages" slot="badge"></span>
         
        </v-badge>
      </v-btn> -->
      <!-- </v-btn> -->
      <!-- <span>2 unread notifications</span> -->
      <!-- </v-tooltip> -->
      <!-- <v-menu
        bottom
        left>
        <v-btn
          slot="activator"
          icon>
          <!-- <v-avatar> <img
            :src="src"
            alt="avatar"></v-avatar> 
          <v-avatar class="white" >
            <v-icon color="primary">person</v-icon>
          </v-avatar>
        </v-btn>
        <v-list class="pa-0">
          <v-list-tile

            to="/timeclocks">
            <v-list-tile-action>
              <v-icon>person</v-icon>

            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Time Clock</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider/>
          <v-list-tile
            to="/profile">
            <v-list-tile-action>
              <v-icon>person</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Profile</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider/>

          <v-list-tile
            key="lock_open"
            @click="logOut">
            <v-list-tile-action>
              <v-icon>lock_open</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu> -->
    <!-- </v-toolbar> -->
     <i class="material-icons dark">tag_faces</i>
  </v-footer>

</template>
<script>
import { Auth } from "aws-amplify";
export default {
  name: "AFooter",
  data: () => ({
    rightDrawer: false,
    src: "../assets/logo.png",
    chatMessages: ""
  }),
  computed: {},
  watch: {},
  mounted() {
    this.getPhoto();
  },
  methods: {
    async logOut() {
      try {
        const data = await Auth.signOut();
        console.log(data);
        this.$store.dispatch("auth/end", null);
        // this.$store.dispatch("auth/setUser", null);
        // this.$store.dispatch("auth/setUserId", null);
        // this.$store.dispatch("profile/setProfile", null)
        // this.$store.dispatch('timeclocks/setClocks', null)
        this.$router.replace("/auth/signIn");
      } catch (err) {
        this.setError(err);
        console.log(err);
        this.fireAuthNotify(this.error);
      }
    },
    // logOut(err) {
    // 		this.$router.replace("/Auth/SignOut")
    // 	},
    setError(err) {
      this.error = err.message || err;
    },
    // signOut: function() {
    //   Auth.signOut()
    //     .then(() => {
    //       logger.debug('sign out success')
    //       this.$router.push('/signIn')
    //     })
    //     .catch(err => this.setError(err))
    // },
    getPhoto: function() {
      // Storage.get("avatars/" + this.user.username + ".jpg").then(url => {
      // Storage.get("avatars/" + this.user.username + ".png").then(url => {
      // Storage.get("avatars/logo.png").then(url => {
      //   this.src = url
      //   console.log(this.src)
      // })
      // console.log(this.src)
    }
  }
};
</script>
<style style="stylus">
.footer {
  position: absolute;
  right: 0;
  min-height: 18px;
  bottom: 0;
  left: 0;
  padding: 1rem;
  background-color: #0092db !important;
  text-align: center;
}
</style>
