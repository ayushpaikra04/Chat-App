import { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import { db } from '../firebase'; 
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

export default function ChatWindow({ selectedUser }) { // <-- Catch the selected user prop
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const { user } = useAuth();

  // --- Real-time Listener for Private Rooms ---
  useEffect(() => {
    // If the user hasn't clicked on a contact yet, don't set up a database listener
    if (!selectedUser) return;

    // Generate a unique, sorted room ID for this pair of users
    const roomId = [user.uid, selectedUser.uid].sort().join("_");

    // Point to the messages subcollection inside that specific private room
    const q = query(
      collection(db, "chats", roomId, "messages"), 
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [selectedUser, user.uid]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  if (!selectedUser) {
    return (
      <div className="chat" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#888' }}>
        <h2>Select a contact to start chatting</h2>
      </div>
    );
  }

  
  const roomId = [user.uid, selectedUser.uid].sort().join("_");

  return (
    <div className="chat">
     
      <div className="chat-header">{selectedUser.name}</div>
      
      <div className="messages">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            text={msg.text}
            isSent={msg.uid === user.uid} 
            timestamp={msg.createdAt}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      
      <MessageInput roomId={roomId} /> 
    </div>
  );
}