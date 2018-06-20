<template>
<div>
<notifications position="bottom right" group="assets" />
  <Consumables></Consumables>
</div>
</template>
<script>
import Consumables from '../../components/assets/Consumables'

export default {

    components: {
        Consumables: Consumables
    }
}
</script>
