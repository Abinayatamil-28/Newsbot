"use client";
import { useState } from 'react';

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    setMessages([...messages, { role: 'user', content: userInput }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userInput, isFirstInteraction: messages.length === 0 }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const { response } = await res.json();
      setMessages((prevMessages) => [...prevMessages, { role: 'bot', content: response }]);
    } catch (error) {
      console.error('Fetch error:', error);
    }

    setUserInput('');
  };

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      padding: '15px',
      height: '500px',
      width: '400px',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f9f9f9',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{
        flex: 1,
        overflowY: 'auto',
        marginBottom: '15px',
      }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-start' : 'flex-end',
              margin: '10px 0',
            }}
          >
            <div
              style={{
                maxWidth: '75%',
                padding: '10px',
                borderRadius: '15px',
                backgroundColor: msg.role === 'user' ? '#e0ffe0' : '#d0d0ff',
                color: msg.role === 'user' ? '#000' : '#000',
                textAlign: msg.role === 'user' ? 'left' : 'right',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong> {msg.content}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '20px',
            border: '1px solid #ccc',
            marginRight: '10px',
            fontSize: '14px',
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: '10px 15px',
            borderRadius: '20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatInterface;
