import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "./authSlice"
import { dataReducer } from "./dataSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        data: dataReducer
    }
});

export default store;