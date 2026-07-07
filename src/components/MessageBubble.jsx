export default function MessageBubble({ text, isSent }) {
    
    const bubbleClass = isSent ? "message sent" : "message received";
    
    return (
        <div className={bubbleClass}>
            {text}
        </div>
    );
}