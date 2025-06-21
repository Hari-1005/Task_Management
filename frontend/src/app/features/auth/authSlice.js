import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name : "auth",
    initialState : {
        user : null,
        isAuthenticated : false
    },
    reducers : {
        setCredentials : (state, action) => {
            state.user = action.payload,
            state.isAuthenticated = true
        },
        clearAuth : (state) => {
            state.user = null,
            state.isAuthenticated = false
        }
    }
})

export const {setCredentials, clearAuth} = authSlice.actions;
export default authSlice.reducer;