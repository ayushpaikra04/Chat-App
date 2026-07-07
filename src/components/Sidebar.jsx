import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function Sidebar() {
  const { user } = useAuth(); // Grabs logged in Google data

  const handleLogout = () => {
    signOut(auth); // Tells Firebase to end the session
  };

  return (
    <div className="sidebar">
      
      
      <div className="user-profile" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px'  }}>
        <img 
          src={user.photoURL} 
          alt="Profile" 
          style={{ width: '40px', height: '40px', borderRadius: '50%' }} 
        />
        <h3 style={{ margin: 0 }}>{user.displayName}</h3>
        
        <button onClick={handleLogout} style={{ marginLeft: 'auto' }} className="Logout-btn">
          Logout
        </button>
      </div>
      
      <h2>Chats</h2>
      <input type="text" placeholder="search" />
      <div className="contact">Soham</div>
      <div className="contact">Parth</div>
      <div className="contact">Vihaan</div>
      <div className="contact">Vedanga</div>
      
      
    </div>
  );
}