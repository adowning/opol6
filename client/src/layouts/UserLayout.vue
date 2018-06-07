<template>
<v-app>
  <sidenav app/>
      <v-content>
        <v-container fluid>
      <router-view/>
        </v-container>
          <notifications group="auth" />
      </v-content>
 <coms-panel right-drawer="false"/>
  <a-footer app/>
   <!-- <dev-footer
      v-if="$_isAuthenticated"
      app/>      -->
</v-app>
</template>

<script>
import SideNav from "../components/SideNav";
import AFooter from "../components/AFooter";
import ComsPanel from "../components/ComsPanel";

export default {
  name: "App",
  components: {
    sidenav: SideNav,
    "a-footer": AFooter,
    "coms-panel": ComsPanel
    // "dev-footer": DevFooter
  },
  data() {
    return {};
  }
};
</script>
