const SET_TIMECLOCKS = (state, clocks) => {
    state.clocks = clocks
}
const SET_TIMECLOCK_STATUS = (state, clockStatus) => {
    state.clockStatus = clockStatus
    console.log(state.clockStatus)
}
export default {
    SET_TIMECLOCKS: SET_TIMECLOCKS,
    SET_TIMECLOCK_STATUS: SET_TIMECLOCK_STATUS
}
