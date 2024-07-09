import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "./authSlice"
import { dataReducer } from "./dataSlice";
import chatReducer from "./chatSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        data: dataReducer,
        chat: chatReducer
    }
});

export default store;