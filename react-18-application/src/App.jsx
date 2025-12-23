import React, { useState } from 'react'
import UserList from './components/UserList'
import './App.css'

function App() {
  const [isMounted, setIsMounted] = useState(true);

  const handleRemount = () => {
    setIsMounted(false);
    setTimeout(() => {
      setIsMounted(true);
    }, 100); // Brief delay to ensure complete unmount
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>User Management System</h1>
        <p className="subtitle">React 18 Application</p>
        <button 
          onClick={handleRemount}
          className="remount-button"
          style={{
            marginTop: '10px',
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Unmount & Remount Component
        </button>
      </header>
      <main className="app-main">
        {isMounted && <UserList />}
      </main>
    </div>
  )
}

export default App
