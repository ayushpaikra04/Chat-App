import { useState } from 'react'; 
import './index.css';

import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
 
  const [selectedUser, setSelectedUser] = useState(null); 

  return (
    <ProtectedRoute>
      <div className="app">
       
        <Sidebar onSelectUser={setSelectedUser} />
        
       
        <ChatWindow selectedUser={selectedUser} />
      </div>
    </ProtectedRoute>
  );
}