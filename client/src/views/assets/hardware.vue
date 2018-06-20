<template>
<div>
<notifications position="bottom right" group="assets" />
  <Hardware></Hardware>
</div>
</template>
<script>
import Hardware from '../../components/assets/Hardware'

export default {

    components: {
        Hardware: Hardware
    }
}
</script>
