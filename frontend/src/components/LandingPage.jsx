import React from 'react';
import '../styles/LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="left-content">
        <div className="auth-box">
          <a href="/login" className="btn">Login</a>
          <a href="/register" className="btn">Register</a>
        </div>

        <h1 className="main-heading">LEARNHUB</h1>

        <div className="intro-text">
          <h2>Your Center for Skill Enhancement</h2>
          <p>LearnHub is an innovative online learning platform designed to make education accessible and flexible for everyone.</p>
          <p>It offers a wide range of courses, from programming languages like C and Java etc. Students can easily browse, enroll, and start learning at their own pace.</p>
          <p>The platform provides both free and paid courses, such as the ₹1600 Designing course, offering in-depth training and certification to boost career opportunities.</p>
          <p>LearnHub features dedicated dashboards for students, educators, and administrators.</p>
        </div>
      </div>
      <div className="right-image"></div>
    </div>
  );
}

export default LandingPage;