<template>
<div>
     <!-- <LiveView></LiveView> -->
     <!-- <mapbox></mapbox> -->
     <GoogleMap></GoogleMap>
</div>
</template>

<script>
// import LiveView from "../../components/liveview/LiveView"
// import Mapbox from '../../components/liveview/Mapbox.vue'
import GoogleMap from '../../components/liveview/GoogleMap3.vue'

export default {
    components: {
        GoogleMap: GoogleMap
    }
}
</script>
