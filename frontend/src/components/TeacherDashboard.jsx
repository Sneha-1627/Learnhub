import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/TeacherDashboard.css';

function TeacherDashboard() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    C_title: '',
    C_description: '',
    C_educator: '',
    C_categories: '',
    C_price: ''
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/courses');
      setCourses(res.data);
    } catch (err) {
      alert('Error loading courses');
    }
  };

  const addCourse = async () => {
    const { C_title, C_description, C_educator, C_categories, C_price } = form;
    if (!C_title || !C_description || !C_educator || !C_categories || C_price === '') {
      return alert('Please fill all fields');
    }

    try {
      await axios.post(
        'http://localhost:5000/api/courses/create',
        {
          ...form,
          C_price: parseFloat(C_price),
          C_categories: [C_categories]
        },
        { headers: { Authorization: token } }
      );
      setForm({ C_title: '', C_description: '', C_educator: '', C_categories: '', C_price: '' });
      fetchCourses();
    } catch (err) {
      alert('Failed to add course');
    }
  };

  const deleteCourse = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`, {
        headers: { Authorization: token }
      });
      fetchCourses();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete course');
    }
  };

  return (
    <div className="teacher-dashboard">
      <div className="left-panel">
        <h2 className="dashboard-title">Teacher Dashboard</h2>
        <div className="form-container">
          <input value={form.C_title} placeholder="Course Title" onChange={e => setForm({ ...form, C_title: e.target.value })} />
          <input value={form.C_description} placeholder="Description" onChange={e => setForm({ ...form, C_description: e.target.value })} />
          <input value={form.C_educator} placeholder="Educator Name" onChange={e => setForm({ ...form, C_educator: e.target.value })} />
          <input value={form.C_categories} placeholder="Category" onChange={e => setForm({ ...form, C_categories: e.target.value })} />
          <input value={form.C_price} type="number" placeholder="Price" onChange={e => setForm({ ...form, C_price: e.target.value })} />
          <button onClick={addCourse}>Add Course</button>
        </div>
      </div>

      <div className="course-list">
        {courses.length === 0 && <p>No courses yet.</p>}
        {courses.map(course => (
          <div key={course._id} className="course-card">
            <h4>{course.C_title}</h4>
            <p>{course.C_description}</p>
            <p><strong>Educator:</strong> {course.C_educator}</p>
            <p><strong>Category:</strong> {course.C_categories?.join(', ')}</p>
            <p><strong>Price:</strong> ₹{course.C_price}</p>
            <p><strong>Students Enrolled:</strong></p>
            <ul>
              {course.enrolled.length > 0
                ? course.enrolled.map(student => (
                    <li key={student._id}>{student.name} ({student.email})</li>
                  ))
                : <li>No students enrolled</li>}
            </ul>
            <button onClick={() => deleteCourse(course._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeacherDashboard;