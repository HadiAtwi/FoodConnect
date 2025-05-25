// LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // Initialize navigation
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLogin = (e) => {
      e.preventDefault();
      
      fetch('http://localhost:8090/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Login failed');
          }
          return res.json();
        })
        .then((data) => {
          console.log('Fetched data:', data);
          //setUser(data);
          //setIsLoggedIn(true); // Set login state to true
          localStorage.setItem("user", JSON.stringify(data));
           // Redirect user based on their role
           if (data.role === 'ROLE_NGO') {
            navigate('/ngo'); // Navigate to NGO Portal
        } else if (data.role === 'ROLE_DONOR') {
            navigate('/donor'); // Navigate to Donor Portal
        }
        })

        .catch((error) => {
          console.error('Login failed:', error);
          alert('Invalid credentials');
        });
    };
    //if (isLoggedIn) {
    //    return <HomePage />;
    //  }
    return (
      <div className="login-container">
        <h1>Food Connect</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
  
  export default Login;
  

  