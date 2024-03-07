import React, { useState } from 'react';
import FactsViewer from './FactsViewer';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const dummyUser = { username: "kerem", password: "teklifimgelsin" };
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    if (username === dummyUser.username && password === dummyUser.password) {
      setIsSignedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsSignedIn(false);
    setUsername('');
    setPassword('');
  };

  return (
    <div className="App">
      {isSignedIn ? (
        <>
          <FactsViewer />
          <button className="logoutButton" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <div className="login">
        <div className="loginForm">
        <img src="teklifimgelsin_logo.png" alt="TeklifimGelsin Logo" className="logo" />
          <form onSubmit={handleSignIn}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Sign In</button>
          </form>
        </div>
        </div>
      )}
    </div>
  );
}

export default App;
