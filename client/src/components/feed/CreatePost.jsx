import React, { useState } from 'react';
import { createPost } from '../../services/postService';
import './Feed.css'; // Create this file

const CreatePost = () => {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      await createPost(text);
      setText('');
      // We'll need a way to refresh the feed, e.g., using context or state
      window.location.reload(); // Simple solution for now
    } catch (err) {
      console.error('Failed to create post', err);
    }
  };

  return (
    <div className="create-post-card">
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreatePost;