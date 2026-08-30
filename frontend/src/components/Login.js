import React, { useState } from 'react';
import { Building, Lock, Mail, User, ArrowRight } from 'lucide-react';

export default function Login({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (isSignUp && !formData.name) {
      setError('Please enter your full name.');
      return;
    }

    // Pass user data to parent component (Dashboard)
    onLogin({
      name: isSignUp ? formData.name : 'System Admin',
      email: formData.email
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Building size={32} color="#818cf8" />
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>EMS Portal</h2>
        </div>

        <h3 style={{ margin: '0 0 6px 0', fontSize: '1.25rem' }}>
          {isSignUp ? 'Create Admin Account' : 'Welcome Back'}
        </h3>
        <p style={{ margin: '0 0 24px 0', color: '#94a3b8', fontSize: '0.9rem' }}>
          {isSignUp ? 'Sign up to manage employee records' : 'Log in to access your dashboard'}
        </p>

        {error && (
          <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '10px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {isSignUp && (
            <div style={{ position: 'relative' }}>
              <User size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '26px' }} />
              <input
                type="text"
                placeholder="Full Name"
                style={{ paddingLeft: '40px' }}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          )}

          <div style={{ position: 'relative' }}>
            <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '26px' }} />
            <input
              type="email"
              placeholder="Admin Email"
              style={{ paddingLeft: '40px' }}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '26px' }} />
            <input
              type="password"
              placeholder="Password"
              style={{ paddingLeft: '40px' }}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button type="submit" style={{ display: 'flex', alignItems: 'center', justifyCenter: 'center', gap: '8px', marginTop: '10px' }}>
            {isSignUp ? 'Create Account' : 'Sign In'} <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem', color: '#94a3b8' }}>
          {isSignUp ? 'Already have an admin account?' : "Don't have an account?"}{' '}
          <span
            onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
            style={{ color: '#818cf8', cursor: 'pointer', fontWeight: 600, textDecoration: 'underline' }}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </span>
        </div>
      </div>
    </div>
  );
}