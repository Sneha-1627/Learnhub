import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showLockIcon, setShowLockIcon] = useState(true);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (name === 'password') setShowLockIcon(value.length === 0);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', form);
      localStorage.setItem('token', res.data.token);
      const type = res.data.user.type;
      if (type === 'admin') navigate('/admin');
      else if (type === 'teacher') navigate('/teacher');
      else navigate('/student');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="full-page-container">
      <div className="form-section">
        <div className="form-container">
          <h2>Login</h2>
          <p>Please enter your credentials</p>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
            </div>

            <div className="input-wrapper">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
              {showLockIcon && <FontAwesomeIcon icon={faLock} className="input-icon" />}
            </div>

            <button type="submit" className="btn">Login</button>
          </form>
        </div>
      </div>

      <div className="image-section"></div>
    </div>
  );
}

export default Login;
