import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // 

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        My Blog
      </Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/blogs">Blogs</Link>
        <Link to="/create-post">Create Post</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;

