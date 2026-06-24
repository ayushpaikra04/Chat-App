export default function MessageBubble({ text, isSent }) {
    // Dynamically assign the CSS class based on the isSent prop
    const bubbleClass = isSent ? "message sent" : "message received";
    
    return (
        <div className={bubbleClass}>
            {text}
        </div>
    );
}