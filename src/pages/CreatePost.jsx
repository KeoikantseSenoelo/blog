import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // To redirect user if needed

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // This Clears previous errors
    setSuccessMessage(""); // Trhis Clears success message
    setLoading(true); // Start loading

    if (!title || !content) {
      setError("Title and content are required.");
      setLoading(false);
      return;
    }

    try {
      // Get JWT token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized: Please log in first.");
        navigate("/login"); // Redirect to login page
        return;
      }

      // Send data to backend with Authorization header
      const response = await axios.post(
        "http://localhost:5000/posts",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle successful posts 
      console.log("Post Published:", response.data);
      setSuccessMessage("Post successfully created!");

      // Clear form fields
      setTitle("");
      setContent("");

     
      setTimeout(() => setSuccessMessage(''), 5000);

    } catch (error) {
      console.error("Error creating post:", error);

      // Handle network error
      if (!error.response) {
        setError("Network error: Please check your connection.");
      } else if (error.response?.status === 401) {
        setError("Session expired. Please log in again.");
        localStorage.removeItem("token"); // Clear invalid token
        navigate("/login"); // This will Redirect to login
      } else {
        setError(
          error.response?.data?.error ||
            "There was an error creating your post. Please try again."
        );
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="create-post-container">
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
          required
        />
        <textarea
          placeholder="Write your content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="textarea-field"
          rows={8}
          required
        ></textarea>
        <button type="submit" className="publish-btn" disabled={loading}>
          {loading ? "Publishing..." : "Publish Post"}
        </button>
      </form>

      {/* Display error or success message */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
};

export default CreatePost;
