import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice.js'
import navSlice from './navSlice.js'
import videoSlice from './videoSlice.js'


const store = configureStore(
    {
        reducer: {
            auth: authSlice,
            nav:navSlice,
            video:videoSlice
        }
    }
)

export default store