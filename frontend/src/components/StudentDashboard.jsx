import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/StudentDashboard.css';

function StudentDashboard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/courses')
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));
  }, []);

  const enroll = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.put(
        `http://localhost:5000/api/courses/enroll/${id}`,
        {},
        { headers: { Authorization: token } }
      );
      alert(res.data.msg || 'Enrolled successfully!');
    } catch (error) {
      alert(error.response?.data?.msg || 'Failed to enroll in course');
    }
  };

  return (
    <div className="dashboard">
      <h2>Student Dashboard</h2>
      <div className="stu-course-list">
        {courses.map(course => (
          <div key={course._id} className="course-card">
            <h4>{course.C_title}</h4>
            <p>{course.C_description}</p>
            <p><strong>Educator:</strong> {course.C_educator}</p>
            <p><strong>Price:</strong> {course.C_price > 0 ? `₹${course.C_price}` : 'Free'}</p>
            <button onClick={() => enroll(course._id)}>Enroll</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentDashboard;
