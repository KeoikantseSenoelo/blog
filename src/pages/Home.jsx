import React from "react"; 
import { Link } from "react-router-dom";
import "./Home.css"; 

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Welcome to My Blog</h1>
        <p>
          Discover thought-provoking articles, insightful tips, and engaging stories.
          Stay updated with fresh content curated just for you.
        </p>
        <Link to="/blogs" className="explore-btn">Explore Blogs</Link>
      </section>

      <section className="about">
        <h2>About Our Blog</h2>
        <p>
          At <span className="highlight">My Blog</span>, we believe in the power of stories.
          Whether you're looking for productivity tips, relationship advice, or lifestyle inspiration,
          we have something for everyone. Our mission is to provide high-quality content that educates, 
          inspires, and entertains our readers.
        </p>
      </section>

      <section className="featured">
        {[1, 2, 3].map((id) => (
          <div key={id} className="post-card">
            <img
              src={`https://source.unsplash.com/600x400/?writing,books,${id}`}
              alt="Blog Cover"
            />
            <h3>Blog Post Title {id}</h3>
            <p>
              This is a short description of the blog post. Click below to read more.
            </p>
            <Link to="/blogs" className="read-more">Read More →</Link>
          </div>
        ))}
      </section>

      <section className="newsletter">
        <h2>Stay Updated</h2>
        <p>Subscribe to our newsletter and never miss an update.</p>
        <input type="email" placeholder="Enter your email" />
        <button>Subscribe</button>
      </section>

      <footer>
        © {new Date().getFullYear()} My Blog | All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
