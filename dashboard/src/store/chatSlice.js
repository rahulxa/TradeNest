// src/features/chatSlice.js
import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [],
        previewMessage: true,
    },
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