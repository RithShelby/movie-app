import {createSlice} from "@reduxjs/toolkit";

const ShowTimeSlice = createSlice({
    name: "showTimeList",
    initialState: {
        ShowTimeList: [],
    },
    reducers: {
        setShowTime: (state, action) => {
            state.ShowTimeList = action.payload;
        },
    },
});
export const {setShowTime} = ShowTimeSlice.actions;
export default ShowTimeSlice.reducer;