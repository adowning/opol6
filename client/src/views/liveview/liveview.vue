<template>
<div>
     <LiveView></LiveView>
     <mapbox></mapbox>
</div>
</template>

<script>
import LiveView from "../../components/liveview/LiveView"
import Mapbox from '../../components/liveview/Mapbox.vue'

export default {
  components: {
    LiveView, Mapbox
  }
};
</script>
