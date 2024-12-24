import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../auth/core/authSlice";
import ShowTimeSlice from "../app/showTime/core/ShowTimeSlice";
import TheaterSlice from "../app/cinema/core/TheaterSlice";
export const storeApp = configureStore({
  reducer: {
    auth: authSlice,
    showTimeList: ShowTimeSlice,
    TheaterList: TheaterSlice
  },
  middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false, // Disable serializable check
      }),
});
