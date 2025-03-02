// App.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BrowserRouter as Router, Route,Routes,  Switch, Redirect } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/LoginForm';
import NGOPortal from './components/NGOPortal';
import DonorPortal from './components/DonorPortal';
import './App.css';
/*
//function App() {
    const [user, setUser] = useState(null);

    const handleLogin = (username, password) => {
        fetch('http://localhost:8090/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Fetched data:', data); // Make sure this logs the correct data
                setUser(data); // Updates the state
                console.log('After setUser, user:', user); // This will still log the old `user` (expected behavior)
            })       
            useEffect(() => {
                console.log('User state updated:', user); // Logs when `user` changes
            }, [user])     
            .catch((error) => {
                console.error('Login failed:', error);
            });
    };

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route path="/login">
                    <LoginForm onLogin={handleLogin} />
                </Route>
                {user && user.role === 'ROLE_NGO' && (
                    <Route path="/ngo">
                        <NgoPage />
                    </Route>
                )}
                {user && user.role === 'ROLE_Donor' && (
                    <Route path="/donor">
                        <DonorPage />
                    </Route>
                )}
                <Redirect to="/" />
            </Switch>
        </Router>
    );
//}

//export default App;
*/


function App() {
  return (
      <Router>
          <Routes>
              {/* Login Route */}
              <Route path="/" element={<Login />} />

              {/* NGO Portal Route */}
              <Route path="/ngo" element={<NGOPortal />} />

              {/* Donor Portal Route */}
              <Route path="/donor" element={<DonorPortal />} />
          </Routes>
      </Router>
  );
}

export default App;