import {createSlice} from "@reduxjs/toolkit";

const ShowTimeSlice = createSlice({
    name: "showTimeList",
    initialState: {
        ShowTimeList: [],
        movieDetail: null,
    },
    reducers: {
        setShowTime: (state, action) => {
            state.ShowTimeList = action.payload;
        },
        setMovieDetail: (state, action) => {
            state.movieDetail = action.payload;
        },

    },
});
export const {setShowTime,setMovieDetail} = ShowTimeSlice.actions;
export default ShowTimeSlice.reducer;