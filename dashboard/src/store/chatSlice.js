// src/features/chatSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    messages: [],
    previewMessage: true,
    chatHistory: []
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
        addToChatHistory: (state, action) => {
            state.chatHistory.push({
                role: action.payload.role,
                parts: [{ text: action.payload.text }]
            });
        },
        clearChatHistory: (state) => {
            state.chatHistory = [];
        },
        clearAllChatData: (state, action) => {
            Object.keys(initialState).forEach(key => {
                state[key] = null
            })
        }
    },
});

export const { setMessages, addMessage, setPreviewMessage, clearChat, updateLastAIMessage, addToChatHistory, clearChatHistory } = chatSlice.actions;

export default chatSlice.reducer;