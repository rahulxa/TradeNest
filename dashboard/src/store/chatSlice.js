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
        updateLastAIMessage: (state, action) => {
            if (state.messages.length > 0) {
                const lastMessage = state.messages[state.messages.length - 1];
                if (lastMessage.sender === 'ai') {
                    lastMessage.text = action.payload;
                }
            }
        },
    },
});

export const { setMessages, addMessage, setPreviewMessage, clearChat, updateLastAIMessage } = chatSlice.actions;

export default chatSlice.reducer;