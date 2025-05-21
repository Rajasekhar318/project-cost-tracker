// src/pages/forgot-password.jsx
import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: call your password-reset API here, e.g.:
    // await api.post('/auth/forgot-password', { email });
    setSubmitted(true);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Forgot Password</h2>

      {!submitted ? (
        <form onSubmit={handleSubmit} style={styles.form}>
          <p style={styles.helperText}>
            Enter your email address below and we will send you a link to reset your password.
          </p>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Send Reset Link
          </button>
        </form>
      ) : (
        <p style={styles.confirmationText}>
          If an account with that email exists, you will receive an email shortly with instructions to reset your password.
        </p>
      )}
    </div>
  );
};

export default ForgotPassword;

const styles = {
  container: {
    maxWidth: '400px',
    margin: '80px auto',
    padding: '24px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    backgroundColor: '#ffffff',
    fontFamily: 'sans-serif',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '16px',
    fontSize: '24px',
    color: '#333333',
  },
  helperText: {
    marginBottom: '12px',
    fontSize: '16px',
    color: '#555555',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  input: {
    padding: '12px',
    marginBottom: '16px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #cccccc',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#ffffff',
    cursor: 'pointer',
  },
  confirmationText: {
    fontSize: '16px',
    color: '#28a745',
  },
};
