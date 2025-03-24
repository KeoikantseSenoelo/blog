import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";  
import Blogs from "./pages/Blogs";
import About from "./pages/About";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost"; 
import EditPost from "./pages/EditPost"; 
import ErrorBoundary from "./components/ErrorBoundary"; 

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />  {/*Render Home Component */}
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-post" element={<CreatePost />} /> {/* Add Create Post Page */}
          <Route path="/edit-post/:id" element={<EditPost />} /> {/* Add Edit Post Page */}
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
