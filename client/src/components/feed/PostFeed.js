import React, { useState, useEffect } from 'react';
import { getAllPosts } from '../../services/postService';
import PostItem from './PostItem';
import Spinner from '../common/Spinner';

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await getAllPosts();
        setPosts(data);
      } catch (err) {
        console.error('Failed to fetch posts', err);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="post-feed">
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostFeed;