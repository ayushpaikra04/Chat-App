import { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

export default function ChatWindow() {
    
    const [messages, setMessages] = useState([
        { text: "Hello", isSent: false },
        { text: "Hii", isSent: true }
    ]);

    const messagesEndRef = useRef(null);

    
    const handleSendMessage = (newText) => {
        const newMessage = { text: newText, isSent: true };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="chat">
            <div className="chat-header">Soham</div>
            
            <div className="messages">
                
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