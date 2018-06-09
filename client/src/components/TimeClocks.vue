
<template>
  <v-container grid-list-md >
    <v-layout row wrap>
      <v-flex xs4 >
        <v-card  class="px-0">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>{{date}}</v-toolbar-title>
            <v-spacer></v-spacer>
      
          </v-toolbar>
          <template v-if="loading">
            <!-- <v-progress-circular indeterminate :size="70" :width="7" color="primary"></v-progress-circular> -->
            <v-progress-linear :indeterminate="true"></v-progress-linear>
          </template>
          <template v-if="!loading">
            <v-list>
              <template v-if="clockStatus == 'out'">
                <v-layout row my-4>
                  <v-flex xs4 offset-xs1>
                    <v-btn block color="info" dark @click.native="employeeClock()">Clock In</v-btn>
                  </v-flex>
                </v-layout>
              </template>
              <template v-if="clockStatus == 'in'">
                <v-layout row mt-1>
                  <v-flex xs7 offset-xs1>
                    <v-text-field name="input-1" label="Note" id="testing"></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-btn flat color="info" dark @click.native="addNote()">Add Note</v-btn>
                  </v-flex>
                </v-layout>
                <v-layout row mb-4>
                  <v-flex xs4 offset-xs1>
                    <v-btn block color="error" dark @click.native="employeeClock()">Clock Out</v-btn>
                  </v-flex>
                </v-layout>
              </template>
            </v-list>
          </template>
        </v-card>
      </v-flex>
      <v-flex xs8>
        <v-card  class="px-0">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Timesheets</v-toolbar-title>
            <v-spacer>
            </v-spacer>
            <v-menu offset-y>
              <v-btn outline white slot="activator">This Week</v-btn>
              <v-list>
                <v-list-tile v-for="week in weeks" :key="week.title" @click="changeWeek(week.amount)">
                  <v-list-tile-title>{{ week.title }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-toolbar>
          <template v-if="loading">
            <!-- <v-progress-circular indeterminate :size="70" :width="7" color="primary"></v-progress-circular> -->
            <v-progress-linear :indeterminate="true"></v-progress-linear>
          </template>
          <v-data-table v-if="!loading" :headers="headers" :items="clocks" hide-actions class="elevation-1">
            <template slot="items" slot-scope="props">
              <td  v-if="props.item.out_time.time"> <span v-if="props.item.current_length.hours > 0">{{props.item.current_length.hours}}h, </span>  {{ props.item.length.mins }}m</td>
              <td  v-else><span v-if="props.item.current_length.hours > 0">{{props.item.current_length.hours}}h,</span> {{props.item.current_length.mins}}m </td>

              <td class="text-xs-right" >{{ props.item.in_time.time }}, {{props.item.in_time.day}}</td>

              <td class="text-xs-right" v-if="props.item.out_time.time">{{ props.item.out_time.time }}, {{ props.item.out_time.day }}</td>
              <td class="text-xs-right" v-else>Current Clock</td>

            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from "moment";
import axios from "axios";
import Vue from "vue";
export default {
  name: "timeclocks",
  data() {
    return {
      loading: false,
      clockStatus: "",
      clocks: [],
      weeks: [
        { title: "This Week", amount: 0 },
        { title: "Last Week", amount: 1 },
        { title: "Two Weeks Ago", amount: 2 }
      ],
      week: null,
      date: moment().format("LLL"),
      serverPagination: {
        page: 1
      },
      headers: [
        {
          text: "Length",
          value: "length",
          align: "left"
        },
        {
          text: "Clock in",
          value: "in_time",
          align: "in_time"
        },
        {
          text: "Clock out",
          align: "left",
          value: "out_time"
        }
      ],
      items: [{ in_time: "1", out_time: "2", current_length: "2" }]
    };
  },
  async created() {
    this.getClockStatus()

  },
  methods: {
    async getClocks() {
      console.log('getting clocks')
      var _start_date = moment()
        .subtract(6, "w")
        .startOf("week")
        .format("LLL");
      const _clocks = await axios.get(
        `/api/employees/timeclocks`,
        {
          params: {
            username: this.$store.state.auth.user.username,
            start_date: _start_date
          }
        }
      );
      this.clocks = _clocks.data.data;
    },
    async getClockStatus() {
      console.log('getting sttaus')
      console.log(this.$_AuthUser.username)
      const _clockStatus = await Vue.http
        .post(`/api/employees/clockstatus`, 
       { username: this.$_AuthUser.username }
        )
        .then(res => {
          return res.body;
        });
      this.clockStatus = _clockStatus.data;
    },
    async employeeClock() {
      const vm = this;
      this.timeFigured = true;
      let { data } = await Vue.http
        .get(`/api/employees/clock`, {
          params: { username: this.$store.state.auth.user.username }
        })
        .then(res => {
          return res.body;
        });

      if (!data.end_timestamp) {
        vm.$set(vm, "clockStatus", "in");
        console.log(vm.clockStatus);
      } else {
        console.log("out");
        vm.$set(vm, "clockStatus", "out");
        console.log(vm.clockStatus);
      }
    }
    // changeWeek(amount) {
    //   this.week = amount;
    //   this.items = [];
    // },
    // addNote() {
    //   this.$http
    //     // eslint-disable-next-line
    //     .get(process.env.LAMBDA_API + "/addNote", {
    //       params: {
    //         id: this.timeSheetID,
    //         token: localStorage.getItem("humanityToken")
    //       }
    //     })
    //     .then(response => {
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     });
    // }
  }
};
</script>
