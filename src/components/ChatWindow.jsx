import { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

export default function ChatWindow() {
    // State to hold our chat history
    const [messages, setMessages] = useState([
        { text: "Hello", isSent: false },
        { text: "Hii", isSent: true }
    ]);

    const messagesEndRef = useRef(null);

    // Function to add a new message to the state
    const handleSendMessage = (newText) => {
        const newMessage = { text: newText, isSent: true };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    // Auto-scroll to the bottom whenever messages update
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="chat">
            <div className="chat-header">Soham</div>
            
            <div className="messages">
                {/* Loop through the array and render a bubble for each message */}
                {messages.map((msg, index) => (
                    <MessageBubble 
                        key={index} 
                        text={msg.text} 
                        isSent={msg.isSent} 
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>

            <MessageInput onSendMessage={handleSendMessage} />
        </div>
    );
}