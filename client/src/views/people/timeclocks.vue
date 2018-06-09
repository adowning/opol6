<template>
	<TimeClocks></TimeClocks>
</template>

<script>
import TimeClocks from "../../components/TimeClocks";
// import axios from 'axios'
// import moment from 'moment'

export default {
  // async fetch({ store, pars }) {
  // async asyncData(context) {
  //   console.log(
  //     context.store.state.auth.user.attributes['custom:humanityLogin'].split(
  //       ','
  //     )
  //   )
  //   var paramString = context.store.state.auth.user.attributes[ 'custom:humanityLogin' ].split(',')
  //   var start_date = moment()
  //     .subtract(4, 'w')
  //     .startOf('week')
  //     .format('YYYY-MM-DD')
  //   var end_date = moment()
  //     .endOf('week')
  //     .format('YYYY-MM-DD')
  //   var username = paramString[0]
  //   var userId = paramString[2]
  //   var token = context.store.state.auth.htoken
  //   if (!context.store.state.timeClocks.clocks) {
  //     let { data } = await axios.post(
  //       // let { data } = axios.post(
  //       '/api/users/gethumanitytimeclocks',
  //       {
  //         start_date: start_date,
  //         end_date: end_date,
  //         employee: username,
  //         token: token
  //       }
  //     )
  //     if (data) {
  //       // store.dispatch('modules/TimeClockStore/setTimeClocks', data)
  //       context.store.dispatch('timeClocks/setTimeClocks', data)
  //     }
  //   }
  //   if (!context.store.state.timeClocks.timeClockStatus) {
  //     console.log('start')
  //     let data2 = await axios.post(
  //       // let data2 = axios.post(
  //       '/api/users/gethumanitytimeclockstatus',
  //       { userId: userId, token: token }
  //     )
  //     console.log(data2)
  //     if (data2) {
  //       console.log(data2)
  //       // store.dispatch('modules/TimeClockStore/setEmployeeTimeClockStatus', data2)
  //       context.store.dispatch('timeClocks/setTimeClockStatus', data2.data)
  //     }
  //   }
  // },

  components: {
    TimeClocks
  }
};
</script>
