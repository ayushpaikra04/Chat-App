// 1. Import your CSS so the app looks good
import './index.css'; // or './style.css' depending on what you named it in Week 1

// 2. Import your new components
import Sidebar from './components/Sidebar';
import ChatWindow from './components/chat-window';

export default function App() {
    return (
        // 3. Assemble them inside the main container
        <div className="app">
            <Sidebar />
            <ChatWindow />
        </div>
    );
}