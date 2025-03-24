import React from "react";
import { useEffect, useState } from "react";
import "./Blog.css";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // ToFetch posts from the backend
  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/posts");
      if (!response.ok) {
        const errorData = await response.json(); // To Capture error message
        throw new Error(errorData.error || "Failed to fetch posts");
      }

      const data = await response.json();
      console.log("Fetched posts:", data);
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle deleting a post
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Data:", errorData);
        throw new Error(errorData.error || "Failed to delete post");
      }

      // Re-fetch posts after successful deletion
      fetchPosts();

      console.log(`Post ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Handle editing a post
  const handleEdit = (post) => {
    // Passing post data to the EditPost page
    navigate(`/edit-post/${post.id}`, { state: { post } });
  };

  return (
    <div className="blog-container">
      <header className="blog-header">
        <h1>Our Blog</h1>
        <p>Discover insights and tips from the tech world.</p>
      </header>

      {/* Display Posts */}
      <section className="posts">
        {posts.length === 0 ? (
          <p>No posts available</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              <img src={post.image || "default-image.jpg"} alt={post.title} />
              <h2>{post.title}</h2>
              <p>{post.content}</p>

              {/* Edit and Delete buttons */}
              <div className="post-actions">
                <button onClick={() => handleEdit(post)} className="edit-btn">
                  🖋️ Edit
                </button>
                <button onClick={() => handleDelete(post.id)} className="delete-btn">
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      <footer className="blog-footer">
        <p>© {new Date().getFullYear()} My Blog. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Blogs;
