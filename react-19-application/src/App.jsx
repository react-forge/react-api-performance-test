import React from 'react'
import UserList from './components/UserList'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>User Management System</h1>
        <p className="subtitle">React 19 Application</p>
      </header>
      <main className="app-main">
        <UserList />
      </main>
    </div>
  )
}

export default App
