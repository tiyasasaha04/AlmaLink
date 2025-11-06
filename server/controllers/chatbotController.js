const { processChatQuery } = require('../services/ragService');

// @desc    Process a chatbot query
// @route   POST /api/chatbot/query
exports.handleChatQuery = async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ msg: 'Query is required' });
  }

  try {
    const responseText = await processChatQuery(query);
    res.json({ response: responseText });
  } catch (err)
  {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};