require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");

const app = express();


app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true, // Allows cookies & authentication headers
  methods: ["GET", "POST", "PUT", "DELETE"], 
  allowedHeaders: ["Content-Type", "Authorization"] 
}));

app.use(express.json());

// Register API routes
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Blog API is running...");
});

// I am adding global Error Handler to Improve Debugging
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

