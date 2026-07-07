import { useState } from 'react'; // <-- NEW: Import useState
import './index.css';

import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  // --- NEW: The Switchboard Memory ---
  // Starts as 'null' because no one is selected when you first log in
  const [selectedUser, setSelectedUser] = useState(null); 

  return (
    <ProtectedRoute>
      <div className="app">
        {/* We give the Sidebar the ability to CHANGE the selected user */}
        <Sidebar onSelectUser={setSelectedUser} />
        
        {/* We give the ChatWindow the exact user data that was selected */}
        <ChatWindow selectedUser={selectedUser} />
      </div>
    </ProtectedRoute>
  );
}