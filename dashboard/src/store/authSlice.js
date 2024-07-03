import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
    userAccessToken: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData
            state.userAccessToken = action.payload.userAccessToken
        },
        logout: (state, action) => {
            state.status = false;
            state.userData = null
            state.userAccessToken = null
        }
    }
})


export const { login, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;