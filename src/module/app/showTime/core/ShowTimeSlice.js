import {createSlice} from "@reduxjs/toolkit";

const ShowTimeSlice = createSlice({
    name: "showTimeList",
    initialState: {
        ShowTimeList: [],
        movieDetail: null,
        timeDetail : null,
        seatsTheater : [],
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
        setSeats : (state,action) => {
            state.seatsTheater = action.payload;
        }

    },
});
export const {setShowTime,setMovieDetail,setSeats} = ShowTimeSlice.actions;
export default ShowTimeSlice.reducer;