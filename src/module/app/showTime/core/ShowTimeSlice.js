import {createSlice} from "@reduxjs/toolkit";

const ShowTimeSlice = createSlice({
    name: "showTimeList",
    initialState: {
        ShowTimeList: [],
        movieDetail: null,
        timeDetail : null,
    },
    reducers: {
        setShowTime: (state, action) => {
            state.ShowTimeList = action.payload;
        },
        setMovieDetail: (state, action) => {
            state.movieDetail = action.payload;
        },
        setTimeDetail: (state, action) => {
            state.timeDetail = action.payload;
        },

    },
});
export const {setShowTime,setMovieDetail,setTimeDetail} = ShowTimeSlice.actions;
export default ShowTimeSlice.reducer;