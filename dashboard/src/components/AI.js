import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyATJ_AfiXUTU4YVYG7soBWa7SfvV7K1Sjw");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

function AI() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);


    const formatAIResponse = (text) => {
        // Split the text into paragraphs
        const paragraphs = text.split('\n\n');

        return paragraphs.map((paragraph, index) => {
            // Check if the paragraph is a header (starts with **)
            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return <h5 key={index} className="mt-3 mb-2">{paragraph.slice(2, -2)}</h5>;
            }

            // Check if the paragraph is a list
            if (paragraph.includes('\n* ')) {
                const listItems = paragraph.split('\n* ');
                return (
                    <ul key={index} className="list-group list-group-flush mt-2">
                        {listItems.map((item, i) => (
                            <li key={i} className="list-group-item">{item.trim()}</li>
                        ))}
                    </ul>
                );
            }

            // Regular paragraph
            return <p key={index} className="mb-2">{paragraph}</p>;
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const r = await model.generateContent(input);
            const responseText = r.response.text();
            const aiMessage = { text: responseText, sender: 'ai' };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error fetching data:", error);
            setMessages(prev => [...prev, { text: "Sorry, I encountered an error. Please try again.", sender: 'ai' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">AI Chat</h5>
                        </div>
                        <div className="card-body" style={{ height: '500px', overflowY: 'auto' }}>
                            {messages.map((message, index) => (
                                <div key={index} className={`d-flex ${message.sender === 'user' ? 'justify-content-end' : 'justify-content-start'} mb-3`}>
                                    <div className={`card ${message.sender === 'user' ? 'bg-primary text-white' : 'bg-light'}`} style={{ maxWidth: '80%' }}>
                                        <div className="card-body py-2 px-3">
                                            {message.sender === 'user' ? (
                                                <p className="mb-0">{message.text}</p>
                                            ) : (
                                                <div>{formatAIResponse(message.text)}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="d-flex justify-content-start mb-3">
                                    <div className="card bg-light" style={{ maxWidth: '80%' }}>
                                        <div className="card-body py-2 px-3">
                                            <p className="mb-0 font-italic text-muted">AI is thinking...</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="card-footer">
                            <form onSubmit={handleSubmit}>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Ask me anything..."
                                        disabled={loading}
                                    />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="submit" disabled={loading}>
                                            Send
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default AI;