import { useState } from 'react';

export default function MessageInput({ onSendMessage }) {
    const [inputValue, setInputValue] = useState('');

    const handleSend = () => {
        if (inputValue.trim() !== '') {
            onSendMessage(inputValue);
            setInputValue(''); // Clear the input field
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="input-area">
            <input 
                type="text" 
                placeholder="type a message" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
}