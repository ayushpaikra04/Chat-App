import { useState } from 'react';
import { db } from "../firebase"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import EmojiPicker from 'emoji-picker-react';

export default function MessageInput({ roomId }) {
  const [inputValue, setInputValue] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const { user } = useAuth();

  const handleSend = async () => {
    if (inputValue.trim() !== '') {
      try {
        const messagesRef = collection(db, "chats", roomId, "messages");
        await addDoc(messagesRef, {
          text: inputValue,
          uid: user.uid,
          name: user.displayName,
          photoURL: user.photoURL,
          createdAt: serverTimestamp(),
        });
        setInputValue(''); 
        setShowPicker(false); 
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    
    <div className="input-area" style={{ position: 'relative', display: 'flex', gap: '10px' }}>
      
    
      {showPicker && (
        <div style={{ position: 'absolute', bottom: '100%', left: '0', marginBottom: '10px' }}>
          <EmojiPicker 
            onEmojiClick={(emojiData) => setInputValue((prev) => prev + emojiData.emoji)}
            searchDisabled={true} 
            skinTonesDisabled={true}
            height={350} 
            width={300}
          />
        </div>
      )}

      
      <button 
        type="button" 
        onClick={() => setShowPicker(!showPicker)}
        style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', padding: '0' }}
      >
        😀
      </button>

      
      <input
        type="text"
        placeholder="type a message"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ flex: 1 }}
      />
      
      <button onClick={handleSend}>Send</button>
    </div>
  );
}