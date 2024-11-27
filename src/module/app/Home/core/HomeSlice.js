import {createSlice} from "@reduxjs/toolkit";

const HomeSlice = createSlice({
    name: "movies",
    initialState: {
        movieList: [],
    },
    reducers: {
        setMovies: (state, action) => {
            state.movieList = action.payload;
        },
    },
})
export const {setMovies} = HomeSlice.actions;
export default HomeSlice.reducer