import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../auth/core/authSlice";
export const storeApp = configureStore({
  reducer: {
    auth: authSlice,
  },
});
