import {createSlice} from "@reduxjs/toolkit";

const TheaterSlice = createSlice({
    name : "theaters",
    initialState:{
        TheaterList : [],
    },
    reducers:{
        setTheater: (state,action)=>{
            state.TheaterList = action.payload;
        }
    }
})
export const {setTheater} = TheaterSlice.actions;
export default TheaterSlice.reducer;