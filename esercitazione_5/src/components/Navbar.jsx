// src/components/Navbar.js
import React from 'react';

function Navbar({ user, onLogout }) {
    return (
        <nav className="navbar">
            <h1>Poligram</h1>
            {user && (
                <div>
                    <span>Ciao, {user.username}!</span>
                    <button onClick={onLogout} style={{ marginLeft: '15px' }}>Logout</button>
                </div>
            )}
        </nav>
    );
}

export default Navbar;