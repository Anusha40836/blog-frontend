// client/src/pages/BlogPage.jsx
import { useEffect, useState } from "react";
import API from "../api"; // 👈 import your centralized API
import Navbar from "../components/Navbar";
import PostForm from "../components/PostForm";
import PostsList from "../components/PostsList";

export default function BlogPage() {
  const bgImageUrl =
    "https://images.pexels.com/photos/3653849/pexels-photo-3653849.jpeg";

  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  const token = localStorage.getItem("token");

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(res.data);
    } catch (error) {
      alert("Error fetching posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreate = async (newPost) => {
    try {
      const res = await API.post("/posts", newPost, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts([...posts, res.data]);
    } catch (error) {
      alert("Failed to create post");
    }
  };

  const handleUpdate = async (updatedPost) => {
    try {
      const res = await API.put(`/posts/${updatedPost._id}`, updatedPost, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPosts(posts.map((p) => (p._id === updatedPost._id ? res.data : p)));
      setEditingPost(null);
    } catch (error) {
      alert("Failed to update post");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(posts.filter((p) => p._id !== id));
    } catch (error) {
      alert("Failed to delete post");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: 24,
        color: "white", // Optional for contrast
        backdropFilter: "brightness(0.7)", // Optional for readability
      }}
    >
      <Navbar />
      <div className="container mt-4">
        <h2 className="mb-4">Blog Posts</h2>

        <PostForm
          onSubmit={editingPost ? handleUpdate : handleCreate}
          editingPost={editingPost}
          setEditingPost={setEditingPost}
        />

        <PostsList
          posts={posts}
          onEdit={setEditingPost}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
