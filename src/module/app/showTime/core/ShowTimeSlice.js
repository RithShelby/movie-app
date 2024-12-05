import {createSlice} from "@reduxjs/toolkit";

const ShowTimeSlice = createSlice({
    name: "showTimeList",
    initialState: {
        ShowTimeList: [],
        movieDetail: null,
        theaterDetail : null,
    },
    reducers: {
        setShowTime: (state, action) => {
            state.ShowTimeList = action.payload;
        },
        setMovieDetail: (state, action) => {
            state.movieDetail = action.payload;
        },
        setTheaterDetail: (state, action) => {
            state.theaterDetail = action.payload;
        },

    },
});
export const {setShowTime,setMovieDetail,setTheaterDetail} = ShowTimeSlice.actions;
export default ShowTimeSlice.reducer;