const Post = require('../models/Post');

// @desc    Create a new post
// @route   POST /api/posts
exports.createPost = async (req, res) => {
  try {
    const newPost = new Post({
      text: req.body.text,
      author: req.user.id
    });

    const savedPost = await newPost.save();
    const populatedPost = await savedPost.populate('author', 'fullName headline profilePicture');
    res.status(201).json(populatedPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all posts for the feed
// @route   GET /api/posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
                            .populate('author', 'fullName headline profilePicture')
                            .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Like/Unlike a post
// @route   PUT /api/posts/like/:id
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    // Check if already liked
    if (post.likes.includes(req.user.id)) {
      // Unlike
      post.likes = post.likes.filter(userId => userId.toString() !== req.user.id);
    } else {
      // Like
      post.likes.push(req.user.id);
    }
    
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};