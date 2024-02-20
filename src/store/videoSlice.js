import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    allVideo:{}
}

const videoSlice = new createSlice({
    name:"video",
    initialState,
    reducers:{
        addVideos:(state,action)=>{
            state.allVideo=action.payload
        },
        getallVideos:(state)=>{
            state.allVideoStatus=!state.allVideoStatus
        }
    }
})


export const {addVideos,getallVideos} = videoSlice.actions;

export default videoSlice.reducer;