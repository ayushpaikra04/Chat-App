import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";

import { collection, query, onSnapshot, orderBy, limit } from "firebase/firestore"; 


function ContactItem({ contact, currentUser, onSelectUser }) {
  const [lastMessage, setLastMessage] = useState("");

  useEffect(() => {
    
    const roomId = [currentUser.uid, contact.uid].sort().join("_");

    
    const q = query(
      collection(db, "chats", roomId, "messages"),
      orderBy("createdAt", "desc"),
      limit(1)
    );

   
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setLastMessage(snapshot.docs[0].data().text);
      } else {
        setLastMessage("No messages yet..."); 
      }
    });

    return () => unsubscribe();
  }, [contact.uid, currentUser.uid]);

  return (
    <div 
      className="contact"
      onClick={() => onSelectUser(contact)} 
      style={{ cursor: 'pointer', paddingBottom: '10px', borderBottom: '1px solid #444', marginBottom: '10px' }}
    >
      <div style={{ fontWeight: 'bold' }}>{contact.name}</div>
      
     
      <div style={{ 
        fontSize: '0.8rem', 
        opacity: 0.6, 
        whiteSpace: 'nowrap', 
        overflow: 'hidden', 
        textOverflow: 'ellipsis',
        marginTop: '3px'
      }}>
        {lastMessage}
      </div>
    </div>
  );
}


export default function Sidebar({ onSelectUser }) {
  const { user } = useAuth(); 
  const [users, setUsers] = useState([]);

  const handleLogout = () => {
    signOut(auth); 
  };

  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedUsers = [];
      snapshot.forEach((doc) => {
        if (doc.data().uid !== user.uid) {
          fetchedUsers.push(doc.data());
        }
      });
      setUsers(fetchedUsers);
    });
    return () => unsubscribe();
  }, [user.uid]);

  return (
    <div className="sidebar">
      <div className="user-profile" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <img
          src={user.photoURL}
          alt="Profile"
          style={{ width: '40px', height: '40px', borderRadius: '50%' }}
        />
        <h3 style={{ margin: 0 }}>{user.displayName}</h3>
        <button onClick={handleLogout} style={{ marginLeft: 'auto' }} className="logout-btn">
          Logout
        </button>
      </div>

      <h2>Chats</h2>
      <input type="text" placeholder="search" style={{ marginBottom: '15px' }} />
      
     
      {users.map((contact) => (
        <ContactItem 
          key={contact.uid} 
          contact={contact} 
          currentUser={user} 
          onSelectUser={onSelectUser} 
        />
      ))}
     
    </div>
  );
}