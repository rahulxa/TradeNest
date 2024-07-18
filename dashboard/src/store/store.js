import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "./authSlice"
import { dataReducer } from "./dataSlice";
import chatReducer from "./chatSlice"
import navReducer from "./navSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        data: dataReducer,
        chat: chatReducer,
        navItems: navReducer
    }
});

export default store;