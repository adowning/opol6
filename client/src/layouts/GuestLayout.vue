<template>
  <v-app>
    <v-content>
      <router-view/>
    </v-content>
    <!-- <v-footer :fixed="fixed" app>
      <span>Guest Layout     {{$_isAuthenticated}}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
export default {
  name: "Guest",
  data() {
    return {
      fixed: false
    };
  }
};
</script>
