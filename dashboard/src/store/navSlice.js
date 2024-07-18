import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentItem: null
}


const navSlice = createSlice({
    name: "navItems",
    initialState,
    reducers: {
        changeNavItems: (state, action) => {
            state.currentItem = action.payload.currentItem
        }
    }
});


export const { changeNavItems } = navSlice.actions;

export default navSlice.reducer;