import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../auth/core/authSlice";
import ShowTimeSlice from "../app/showTime/core/ShowTimeSlice";
import HomeSlice from "../app/Home/core/HomeSlice";
import TheaterSlice from "../app/cinema/core/TheaterSlice";
export const storeApp = configureStore({
  reducer: {
    auth: authSlice,
    movieList:HomeSlice,
    showTimeList: ShowTimeSlice,
    TheaterList: TheaterSlice
  },
});
