<script>
  import Vue from 'vue'
  // import { API_GATEWAY_ENDPOINT } from '../globals/resources'
  const url = 'http://localhost:1880'

  export default {       
    methods: {
      getRegisters() {
        return Vue.http.get(`/api/registersjson`).then((res) => {
          return res.body
        })
      },
    
    }
  }
</script>

