
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const EditPost = () => {
 
  const location = useLocation();
  
  
  const post = location.state?.post;

  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!post) {
      // Set an error if no post is found
      setError("No post data found.");
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setError("Title and content are required.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/posts/${post?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      const data = await response.text();

      if (!response.ok) {
        throw new Error(data || "Failed to update post");
      }

      console.log("Post updated successfully.");
      setSuccess(true); // This willSet success to true when the update is successful

    } catch (error) {
      console.error("Error updating post:", error);
      setError(error.message || "There was an error updating your post.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Edit Post</h1>
      
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {success && <p style={{ color: "green", textAlign: "center" }}>Post updated successfully!</p>}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post Title"
          required
          style={{
            padding: "10px",
            marginBottom: "20px",
            fontSize: "18px",
            width: "100%",
            maxWidth: "600px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Post Content"
          required
          style={{
            padding: "10px",
            fontSize: "18px",
            width: "100%",
            height: "300px",
            maxWidth: "600px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginBottom: "20px",
          }}
        ></textarea>

        <button 
          type="submit" 
          style={{
            padding: "10px 20px",
            fontSize: "18px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            maxWidth: "600px",
          }}
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
