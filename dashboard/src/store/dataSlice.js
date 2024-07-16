import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
    holdings: [],
    finalProfitLoss: null,
    finalProfitLossPercentage: null,
    finalCurrentValue: null,
    finalInvestment: null,
    totalHoldings: null
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
        },
        setFinalData: (state, action) => {
            Object.assign(state, action.payload)
        },
        clearData: (state, action) => {
            Object.keys(initialState).forEach(key => {
                state[key] = null;
            })
        }
    }
});

export const {
    setOrders,
    setHoldings,
    setFinalData
} = dataSlice.actions;

export const dataReducer = dataSlice.reducer;