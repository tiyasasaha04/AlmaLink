import React from 'react';
import { Link } from 'react-router-dom';
import { likePost } from '../../services/postService';
import { useAuth } from '../../hooks/useAuth';
import './Feed.css';

const PostItem = ({ post }) => {
  const { user } = useAuth();
  const [likes, setLikes] = useState(post.likes);

  const hasLiked = likes.includes(user._id);

  const handleLike = async () => {
    try {
      const { data } = await likePost(post._id);
      setLikes(data); // Update likes from server response
    } catch (err) {
      console.error('Failed to like post', err);
    }
  };

  return (
    <div className="post-card">
      <div className="post-author">
        <img src={post.author.profilePicture || '/default_avatar.png'} alt={post.author.fullName} />
        <div>
          <Link to={`/profile/${post.author._id}`}>
            <h4>{post.author.fullName}</h4>
          </Link>
          <p>{post.author.headline || 'Alumnus'}</p>
        </div>
      </div>
      <div className="post-content">
        <p>{post.text}</p>
      </div>
      <div className="post-actions">
        <button onClick={handleLike} className={hasLiked ? 'liked' : ''}>
          Like ({likes.length})
        </button>
        <button>Comment (0)</button>
      </div>
    </div>
  );
};

export default PostItem;