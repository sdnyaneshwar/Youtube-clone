// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     status: false,
//     userData: {
//         name:"dany"
//     }
// }

// const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         login: (state, action) => {
//             state.status = true
//             state.userData = action.payload.userData
//         },
//         logout: (state) => {
//             state.status = false
//             state.userData = null
//         }
//     }

// })


// export const { login , logout } = authSlice.actions;

// export default authSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: {}
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.userData = {};
        }
     }
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;