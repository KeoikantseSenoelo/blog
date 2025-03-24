import React from "react";
import './about.css';

const About = () => {
  return (
    <div className="about-container">
      <section className="intro-section">
        <h1>About My Blog</h1>
        <p>Welcome to My Blog, where creativity meets insight. Our platform is dedicated to sharing compelling stories, thought-provoking ideas, and valuable tips to inspire our readers.</p>
      </section>

      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>Our mission is to empower individuals through knowledge and creativity. We aim to create a supportive community where ideas flourish and innovation thrives.</p>
      </section>

      <section className="team-section">
        <h2>Meet the Team</h2>
        <p>We are a passionate group of writers, designers, and creators who believe in the power of storytelling to connect and inspire.</p>
      </section>

      <section className="vision-section">
        <h2>Our Vision</h2>
        <p>We envision a world where everyone has access to quality content that educates, entertains, and empowers.</p>
      </section>
    </div>
  );
};

export default About;
  