const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const authMiddleware = require("../middleware/authMiddleware");

// Get all posts (Including author details)
router.get("/", async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: { author: { select: { id: true, name: true, email: true } } },
    });
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Error fetching posts", details: error.message });
  }
});

// Create a new post (Authenticated Users Only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.userId; // Extract user ID from JWT

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    console.log("Creating new post by user:", userId); 

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId: userId,
      },
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error); 
    res.status(500).json({ error: "Error creating post", details: error.message });
  }
});

// Update a post (Authenticated Users Only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId; // To Extract user ID from JWT
    const postId = req.params.id;
    const { title, content, image } = req.body; // It is judt to Include image if provided

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    // Find the post to be updated
    const existingPost = await prisma.post.findUnique({ where: { id: postId } });
    if (!existingPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the user is the author of the post
    if (existingPost.authorId !== userId) {
      return res.status(403).json({ error: "You can only edit your own posts" });
    }

    // Update the post
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        content,
        image,
      },
    });

    res.json(updatedPost); //   To Return the updated post
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Error updating post", details: error.message });
  }
});

// Delete a post (but Only the owner can delete)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const postId = req.params.id;

    if (!postId) return res.status(400).json({ error: "Invalid post ID" });

    const existingPost = await prisma.post.findUnique({ where: { id: postId } });
    if (!existingPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (existingPost.authorId !== userId) {
      return res.status(403).json({ error: "You can only delete your own posts" });
    }

    await prisma.post.delete({ where: { id: postId } });
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Error deleting post", details: error.message });
  }
});

module.exports = router;
