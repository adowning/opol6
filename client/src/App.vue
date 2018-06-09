<template>
  <v-app>
    <notifications position="bottom right" group="all" />
    <v-speed-dial
     v-model="fab"
      :top="top"
      :hover="hover"
      :fixed="fixed"
      :bottom="bottom"
      :right="right"
      :left="left"
      :direction="direction"
      :open-on-hover="hover"
      :transition="transition"
    >
 <v-btn
        slot="activator"
        v-model="fab"
        color="vueblue"
        large
        dark
        fab
      >
        <v-icon>account_circle</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        
        color="green"
      >
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        
        color="indigo"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        
        color="red"
      >
        <v-icon>delete</v-icon>
      </v-btn>
    </v-speed-dial> 
    <user-layout v-if="$_isAuthenticated"/>
    <guest-layout v-if="!$_isAuthenticated"/>
   
 </v-app>
</template>
<script>
import UserLayout from "./layouts/UserLayout";
import GuestLayout from "./layouts/GuestLayout";
// import Fab from 'vue-fab'
// import axios from 'axios'
export default {
  name: "App",
  components: {
    "user-layout": UserLayout,
    "guest-layout": GuestLayout,
    // "fab": Fab
  },
  data() {
    return {
     direction: 'left',
      fab: false,
      fixed: true,
      fling: false,
      hover: true,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition'
    }
  },
   methods: {
       cache(){
          console.log('Cache Cleared');
      },
      alert(){
          alert('Clicked on alert icon');
      }
    }
};
</script>
<style lang="scss" scoped>
.speed-dial--bottom:not(.speed-dial--absolute){
  bottom: 50%;
  right: 5px;
}
.fab {
  bottom: 24px;
  right: 5px;
}
.vue-notification {
  padding: 10px;
  margin: 0 5px 5px;
  width: 100%;
  font-size: 14px;

  color: #ffffff;
  background: #44a4fc;
  border-left: 5px solid #187fe7;

  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }

  &.error {
    background: #e54d42;
    border-left-color: #b82e24;
  }

  &.success {
    background: #68cd86;
    border-left-color: #42a85f;
  } 
}
.fab {
  bottom: 24px;
  right: 5px;
}
.v-container {
  background-color: #F8F8F8;
}
</style>
