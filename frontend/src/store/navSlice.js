import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    menuState:false
}

const navSlice = createSlice({
    name:"nav",
    initialState,
    reducers:{
        setMenuhandle:(state)=>{
            state.menuState=!state.menuState;
        }
    }
        
    
})

export const {setMenuhandle} = navSlice.actions;

export default navSlice.reducer;