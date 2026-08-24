import React, { useState } from 'react';
import { Building, Lock, Mail } from 'lucide-react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('admin@ems.com');
  const [password, setPassword] = useState('admin123');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin({ name: 'Admin User', email: email });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#818cf8', marginBottom: '16px' }}>
          <Building size={32} />
          <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>EMS Portal</span>
        </div>
        <h2>Welcome Back</h2>
        <p style={{ color: '#94a3b8', margin: '0 0 20px 0', fontSize: '0.9rem' }}>
          Enter your admin credentials to access system
        </p>

        <form onSubmit={handleSubmit}>
          <div>
            <input 
              type="email" 
              required 
              placeholder="Admin Email (admin@ems.com)" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input 
              type="password" 
              required 
              placeholder="Password (admin123)" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Sign In to Dashboard</button>
        </form>
      </div>
    </div>
  );
}