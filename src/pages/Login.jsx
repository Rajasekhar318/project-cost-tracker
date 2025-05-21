// File: src/pages/Login.jsx
import React, { useState } from 'react';
import { login } from '../firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.formContainer}>
        <div style={styles.logoContainer}>
          <span style={styles.logoIcon}>📊</span>
          <h1 style={styles.logoText}>CostTracker</h1>
        </div>
        
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Login to manage your projects</p>
        
        {error && <div style={styles.errorAlert}>{error}</div>}
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              placeholder="your@email.com"
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
              placeholder="••••••••"
            />
          </div>
          
          <div style={styles.forgotPasswordContainer}>
            <Link to="/ForgotPassword" style={styles.forgotPassword}>Forgot password?</Link>
          </div>
          
          <button 
            type="submit" 
            style={{
              ...styles.button,
              ...(loading ? styles.buttonLoading : {})
            }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div style={styles.divider}>
          <span style={styles.dividerText}>OR</span>
        </div>
        
        <button style={styles.socialButton}>
          <span style={styles.socialIcon}>G</span>
          Sign in with Google (beta)
        </button>
        
        <p style={styles.signupText}>
          Don't have an account? <Link to="/signup" style={styles.signupLink}>Create account</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fc',
    padding: '20px'
  },
  formContainer: {
    width: '100%',
    maxWidth: '450px',
    padding: '40px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.2s ease',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px'
  },
  logoIcon: {
    fontSize: '28px',
    marginRight: '10px'
  },
  logoText: {
    fontSize: '26px',
    fontWeight: '700',
    color: '#2d3748',
    margin: '0'
  },
  title: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: '8px',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: '14px',
    color: '#718096',
    marginBottom: '32px',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#4a5568'
  },
  input: {
    padding: '12px 16px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box'
  },
  button: {
    padding: '14px',
    backgroundColor: '#4f46e5',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    marginTop: '8px',
    width: '100%'
  },
  buttonLoading: {
    backgroundColor: '#6366f1',
    cursor: 'not-allowed'
  },
  forgotPasswordContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '-8px'
  },
  forgotPassword: {
    fontSize: '14px',
    color: '#4f46e5',
    textDecoration: 'none',
    fontWeight: '500'
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '24px 0',
    position: 'relative'
  },
  dividerText: {
    backgroundColor: '#ffffff',
    color: '#a0aec0',
    fontSize: '14px',
    padding: '0 16px',
    position: 'relative',
    zIndex: '1'
  },
  socialButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    color: '#4a5568',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    gap: '10px'
  },
  socialIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    backgroundColor: '#ea4335',
    color: '#ffffff',
    borderRadius: '50%',
    fontSize: '14px',
    fontWeight: '700'
  },
  signupText: {
    fontSize: '14px',
    color: '#718096',
    textAlign: 'center',
    marginTop: '24px'
  },
  signupLink: {
    color: '#4f46e5',
    textDecoration: 'none',
    fontWeight: '600'
  },
  errorAlert: {
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    marginBottom: '16px',
    border: '1px solid #fecaca'
  }
};

export default Login;