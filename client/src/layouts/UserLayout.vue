<template>
<div>
  <sidenav app/>
      <v-content>


        <v-container fluid>


      <router-view />

        </v-container>
      </v-content>

          <notifications group="auth" />


 <coms-panel right-drawer="true"/>

  <a-footer app/>
</div>
</template>

<script>
import SideNav from '../components/layout/SideNav'
import AFooter from '../components/layout/AFooter'
import ComsPanel from '../components/layout/ComsPanel'
import StatusWidget from '../components/layout/StatusWidget'

export default {
    name: 'App',
    components: {
        'sidenav': SideNav,
        'a-footer': AFooter,
        'coms-panel': ComsPanel,
        'status-widget': StatusWidget
    // "dev-footer": DevFooter
    },
    data: function() {
        return {}
    }
}
</script>
