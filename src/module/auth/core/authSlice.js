import { createSlice } from "@reduxjs/toolkit";

// Create a slice of the Redux store
const authSlice = createSlice({
  name: "auth",
  initialState: {
    authList: [],
    // userByGoolgle: [],
    error: null,
    status: "",
  },
  reducers: {
    setAuthList: (state, action) => {
      state.authList = action.payload;
    },
  },
});
export const { setAuthList } = authSlice.actions;

export default authSlice.reducer;
