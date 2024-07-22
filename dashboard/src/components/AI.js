import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    addMessage, setPreviewMessage, clearChat,
    updateLastAIMessage, clearChatHistory, addToChatHistory
} from "../store/chatSlice"
import { GoogleGenerativeAI } from "@google/generative-ai";
import { changeNavItems } from '../store/navSlice';



const APIKEY = process.env.REACT_APP_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(APIKEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function AI() {
    const dispatch = useDispatch();
    const messages = useSelector(state => state.chat.messages);
    const previewMessage = useSelector(state => state.chat.previewMessage); //boolean
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const chatHistory = useSelector((state) => state.chat.chatHistory)

    dispatch(changeNavItems({ currentItem: "AI" }))


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const formatAIResponse = (text) => {
        const paragraphs = text.split('\n\n');
        return paragraphs.map((paragraph, index) => {
            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return <h5 key={index} className="mt-3 mb-2">{paragraph.slice(2, -2)}</h5>;
            }
            if (paragraph.startsWith("##")) {
                return <h5 key={index} className='mt-3 mb-2'>{paragraph.slice(2).trim()}</h5>;
            }
            if (paragraph.includes('\n* ')) {
                const listItems = paragraph.split('\n* ').filter(item => item.trim() !== '');
                return (
                    <ul key={index} className="list-group list-group-flush mt-2">
                        {listItems.map((item, i) => (
                            <li key={i} className="list-group-item">{item}</li>
                        ))}
                    </ul>
                );
            }
            return <p key={index} className="mb-2">{paragraph}</p>;
        });
    };

    const handleSubmit = async (textMessage) => {
        // setSpinner(true)
        dispatch(setPreviewMessage(false)); //setting preview message false
        const userMessage = { text: textMessage, sender: 'user' }; //
        dispatch(addMessage(userMessage)); //adding user input to the message array in the store
        dispatch(addToChatHistory({ role: "user", text: textMessage })) //adding user message to the chat history
        setLoading(true);
        setInput('');

        try {
            //creating a new instance and starting the chat with the chat history
            // (this always  ensures that the model gives response according to the chat history)
            const chat = model.startChat({ history: chatHistory });
            const result = await chat.sendMessageStream(textMessage) //sending the real time user input to the model
            let aiResponse = "";
            const aiMessage = { text: aiResponse, sender: 'ai' };
            dispatch(addMessage(aiMessage)); ////adding ai message to the chat history

            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                aiResponse += chunkText;
                dispatch(updateLastAIMessage(aiResponse));// updating last ai message ()
            }
            dispatch(addToChatHistory({ role: "model", text: aiResponse }));
        } catch (error) {
            console.error("Error fetching data:", error);
            dispatch(addMessage({ text: "Sorry, I encountered an error. Please try again.", sender: 'ai' }));
        } finally {
            setLoading(false);
        }
    };

    const handlePreviewOptionClick = (text) => {
        handleSubmit(text);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        handleSubmit(input);
    };


    const handleChatClear = () => {
        dispatch(clearChat());
        dispatch(clearChatHistory())
        setInput("");
        setLoading(false);
    }

    return (
        <div className='container' style={{ maxWidth: "850px", height: "550px" }}>
            <div className="row justify-content-center h-100">
                <div className="col-12 h-100">
                    <div className="card border-0 shadow-sm h-100" style={{ fontFamily: "sans-serif", borderRadius: "20px", overflow: "hidden" }}>
                        <div className="card-header text-white py-2" style={{ backgroundColor: "#294eb3" }}>
                            <h5 className="mb-0">TradeIntel AI</h5>
                        </div>
                        <div className="card-body bg-light" style={{ height: 'calc(100% - 130px)', overflowY: 'auto' }}>
                            {previewMessage ? (
                                <div className="d-flex justify-content-center align-items-center h-100">
                                    <div className="text-center">
                                        <h5 className='text-muted mb-4'>
                                            Welcome to TradeIntel AI ChatBot
                                            <i className="fa-solid fa-wand-sparkles text-muted" style={{ marginLeft: "8px" }}></i>
                                        </h5>
                                        <h6 className='text-muted mb-4'>Start by clicking...</h6>
                                        <div>
                                            <button
                                                className='btn rounded-pill w-90 mb-3 py-2 '
                                                onClick={(e) => handlePreviewOptionClick(e.currentTarget.textContent)}
                                            >
                                                Quick guide: Zerodha Kite basics for efficient trading
                                            </button>
                                            <p className='my-3 text-muted'>or</p>
                                            <button
                                                className='btn rounded-pill w-80 py-2'
                                                onClick={(e) => handlePreviewOptionClick(e.currentTarget.textContent)}
                                            >
                                                5 steps to start investing in stocks efficiently
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                messages.map((message, index) => (
                                    <div key={index} className={`d-flex ${message.sender === 'user' ? 'justify-content-end' : 'justify-content-start'} mb-3`}>
                                        <div className={`rounded-pill py-2 px-3 ${message.sender === 'user' ? 'bg-primary text-white' : 'bg-white shadow-sm'}`} style={{ maxWidth: '80%' }}>
                                            {message.sender === 'user' ? (
                                                <p className="mb-0">{message.text}</p>
                                            ) : (
                                                <div>{formatAIResponse(message.text)}</div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}

                            {loading && (
                                <div className="d-flex justify-content-start mb-3">
                                    <div className="bg-white rounded-pill py-2 px-3 shadow-sm">
                                        <p className="mb-0 font-italic text-muted d-flex align-items-center">
                                            TradeIntel AI is thinking...
                                            <span style={{ marginLeft: '8px' }}>
                                                <span className="spinner-grow spinner-grow-sm text-danger" role="status" aria-hidden="true"></span>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="card-footer bg-light border-0 py-3">
                            <div className="d-flex align-items-center">
                                <button
                                    className="btn rounded-circle d-flex justify-content-center align-items-center mr-3 mb-4"
                                    style={{ width: "30px", height: "40px" }}
                                    title="Clear Context"
                                    onClick={handleChatClear}
                                >
                                    <i className="fa-solid fa-broom"></i>
                                </button>
                                <form onSubmit={handleFormSubmit} className="flex-grow-1">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg border-0 rounded-pill-left mt-2 fs-6"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            placeholder="Ask me anything..."
                                            disabled={loading}
                                            style={{ backgroundColor: "#f8f9fa" }}
                                        />
                                        <div className="input-group-append">
                                            <button
                                                className="btn rounded-circle d-flex justify-content-center align-items-center mr-3 mt-2"
                                                style={{ width: "30px", height: "40px" }}
                                                title="Send Message"
                                            >
                                                <i className="fa-solid fa-arrow-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default AI;
