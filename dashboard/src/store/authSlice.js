import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: JSON.parse(localStorage.getItem('authStatus')) || false,
    userData: JSON.parse(localStorage.getItem('userData')) || null,
    userAccessToken: localStorage.getItem('userAccessToken') || null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
            state.userAccessToken = action.payload.userAccessToken;
            localStorage.setItem('authStatus', JSON.stringify(true));
            localStorage.setItem('userData', JSON.stringify(action.payload.userData));
            localStorage.setItem('userAccessToken', action.payload.userAccessToken);
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.userAccessToken = null;
            localStorage.removeItem('authStatus');
            localStorage.removeItem('userData');
            localStorage.removeItem('userAccessToken');
        }
    }
})

export const { login, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;