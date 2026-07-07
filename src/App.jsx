
import './index.css'; 


import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
    return (
        <ProtectedRoute>
        <div className="app">
            <Sidebar />
            <ChatWindow />
        </div>
        </ProtectedRoute>
    );
}