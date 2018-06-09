// import { fetchClocks } from "@/api";
// this.getAsyncClocks({ url: "https://ghibliapi.herokuapp.com/films" });
const getTimeClocks = async (context, dates) => {
  // let clocks = await fetchClocks(dates);
  let clocks = [dates];
  context.commit("SET_TIMECLOCKS", clocks);
};

const getTimeClockStatus = async (context, value) => {
  console.log(value);
  context.commit("SET_TIMECLOCK_STATUS", value);
  return value;
};

export default {
  getTimeClocks,
  getTimeClockStatus
};
