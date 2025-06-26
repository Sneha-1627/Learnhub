import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faUserTag } from '@fortawesome/free-solid-svg-icons';
import '../styles/Register.css';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', type: 'student' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/register', form);
      navigate('/');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="full-page-container">
      <div className="form-section">
        <div className="form-container">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>

            <div className="input-wrapper">
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                required
              />
              <FontAwesomeIcon icon={faUser} className="input-icon" />
            </div>

            <div className="input-wrapper">
              <input
                type="email"
                name="email"
                placeholder="Email"
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
                onChange={handleChange}
                required
              />
              <FontAwesomeIcon
                icon={faLock}
                className={`input-icon ${form.password ? 'hide-icon' : ''}`}
              />
            </div>

            <div className="input-wrapper">
              <select name="type" onChange={handleChange} required>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
              <FontAwesomeIcon icon={faUserTag} className="input-icon" />
            </div>

            <button type="submit" className="btn">Register</button>
          </form>
        </div>
      </div>

      <div className="register-image-section"></div>
    </div>
  );
}

export default Register;
