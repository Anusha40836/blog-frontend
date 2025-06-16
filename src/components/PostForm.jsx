// client/src/components/PostForm.jsx
import { useEffect, useState } from "react";

export default function PostForm({ onSubmit, editingPost, setEditingPost }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setContent(editingPost.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [editingPost]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = {
      title,
      content,
    };

    // If editing, include _id
    if (editingPost) {
      postData._id = editingPost._id;
    }

    onSubmit(postData);

    // Reset form
    setTitle("");
    setContent("");
    setEditingPost(null);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h4>{editingPost ? "Edit Post" : "New Post"}</h4>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <textarea
          className="form-control"
          placeholder="Post content"
          rows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary">
        {editingPost ? "Update" : "Create"}
      </button>
      {editingPost && (
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => setEditingPost(null)}
        >
          Cancel
        </button>
      )}
    </form>
  );
}
