// src/features/chatSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    messages: [],
    previewMessage: true,
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        setPreviewMessage: (state, action) => {
            state.previewMessage = action.payload;
        },
        clearChat: (state) => {
            state.messages = [];
            state.previewMessage = true;
        },
    },
});

export const { setMessages, addMessage, setPreviewMessage, clearChat } = chatSlice.actions;

export default chatSlice.reducer;