// client/src/components/PostsList.jsx
export default function PostsList({ posts, onEdit, onDelete }) {
  if (posts.length === 0) {
    return <p>No posts found. Start by creating one!</p>;
  }

  return (
    <div className="mt-4">
      {posts.map((post) => (
        <div key={post._id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.content}</p>
            <button
              className="btn btn-sm btn-warning me-2"
              onClick={() => onEdit(post)}
            >
              Edit
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this post?")
                ) {
                  onDelete(post._id);
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
