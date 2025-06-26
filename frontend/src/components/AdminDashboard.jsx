import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css';

function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users/all')
      .then(res => setUsers(res.data))
      .catch(err => {
        console.error('Error fetching users:', err);
        alert('Failed to load users');
      });
  }, []);

  const renderUserTable = (title, filteredUsers) => (
    <div className="user-box">
      <h3>{title}</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Type</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.type}</td>
              <td>{user._id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="user-lists">
        {renderUserTable('Students', users.filter(u => u.type === 'student'))}
        {renderUserTable('Teachers', users.filter(u => u.type === 'teacher'))}
        {renderUserTable('Admins', users.filter(u => u.type === 'admin'))}
      </div>
    </div>
  );
}

export default AdminDashboard;
