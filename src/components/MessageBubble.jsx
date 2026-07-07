export default function MessageBubble({ text, isSent, timestamp }) { 
    
  const bubbleClass = isSent ? "message sent" : "message received";

  
  const formatTime = (timeObj) => {
   
    if (!timeObj) return ""; 
    
    
    return timeObj.toDate().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={bubbleClass}>
      {text}
      
     
      <div style={{ 
        fontSize: '0.7rem', 
        opacity: 0.7, 
        marginTop: '5px', 
        textAlign: 'right' 
      }}>
        {formatTime(timestamp)}
      </div>
    </div>
  );
}