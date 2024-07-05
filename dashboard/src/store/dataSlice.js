import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
    holdings: []
}

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload.orders
        },
        setHoldings: (state, action) => {
            state.holdings = action.payload.holdings
        }
    }
});


export const { setOrders, setHoldings } = dataSlice.actions;

export const dataReducer = dataSlice.reducer;
