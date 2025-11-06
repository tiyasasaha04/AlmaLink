const User = require('../models/User');
// --- NEW IMPORTS ---
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config(); // Makes sure .env variables are loaded

// --- Step 1: The "Parser" ---
// (This function remains unchanged)
const parseQueryToMongo = (query) => {
  const filter = { status: 'Approved' };
  const lowerQuery = query.toLowerCase();

  // Keyword for mentors
  if (lowerQuery.includes('mentor') || lowerQuery.includes('help')) {
    filter.isMentor = true;
  }

  // Simple location/industry parsing
  // In a real app, you might use a lightweight NLP library here.
  if (lowerQuery.includes('bangalore')) filter.city = { $regex: 'Bangalore', $options: 'i' };
  if (lowerQuery.includes('san francisco')) filter.city = { $regex: 'San Francisco', $options: 'i' };
  if (lowerQuery.includes('bay area')) filter.city = { $regex: 'San Francisco', $options: 'i' };
  
  if (lowerQuery.includes('tech')) filter.industry = { $regex: 'Technology', $options: 'i' };
  if (lowerQuery.includes('finance')) filter.industry = { $regex: 'Finance', $options: 'i' };
  if (lowerQuery.includes('healthcare')) filter.industry = { $regex: 'Healthcare', $options: 'i' };

  // Simple skills parsing
  if (lowerQuery.includes('ai') || lowerQuery.includes('ml')) {
    filter.expertise = { $in: [/AI/i, /ML/i] };
  }
  if (lowerQuery.includes('product')) {
    filter.expertise = { $in: [/Product Management/i] };
  }

  return filter;
};

// --- Step 2: The "Formatter" ---
// (This function remains unchanged)
const formatResultsForAI = (users) => {
  if (users.length === 0) {
    return 'I could not find any alumni matching that query.';
  }

  return users.map(user => {
    return `* Name: ${user.fullName}, Graduated: ${user.graduationYear}, Role: ${user.headline || user.currentRole || 'Alumni'}, Location: ${user.city || 'N/A'}. ${user.isMentor ? '(Open to Mentoring)' : ''}`;
  }).join('\n');
};

// --- Step 3: The "Generator" (This is now the REAL version) ---
// This function now makes a real call to the Google AI (Gemini) API.
const generateResponse = async (prompt) => {
  try {
    // 1. Initialize the Google AI client
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // 2. Add safety settings (optional, but recommended)
    const safetySettings = [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
    ];

    // 3. Send the prompt to Gemini
    console.log('--- SENDING PROMPT TO GEMINI ---');
    console.log(prompt);
    console.log('---------------------------------');

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      safetySettings,
    });
    
    // 4. Get the response text
    const response = result.response;
    const aiText = response.text();
    
    return aiText;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error.response && error.response.promptFeedback) {
      console.error("Prompt Feedback:", error.response.promptFeedback);
    }
    return "I'm sorry, I'm having trouble connecting to my brain right now. Please try again in a moment.";
  }
};


// --- The Main Orchestrator Function ---
// (This function remains unchanged)
exports.processChatQuery = async (query) => {
  try {
    // 1. Parse Query & Retrieve (The "R")
    const mongoFilter = parseQueryToMongo(query);
    const foundAlumni = await User.find(mongoFilter)
                                  .select('fullName graduationYear headline currentRole city isMentor')
                                  .limit(5); // Limit to 5 results

    // 2. Format Data (The "A" - Augment)
    const formattedData = formatResultsForAI(foundAlumni);

    // 3. Build the AI Prompt
    const systemPrompt = `You are a helpful assistant for the ALMALINK college alumni portal.
A user asked for help finding alumni. I have already searched the database and found the following results.
Your task: Present these results to the user in a friendly, conversational way. Do not repeat the user's original question.
Just present the data I've provided. If no data was found, be helpful.

Here is the data I found:
${formattedData}
`;

    // 4. Generate Response (The "G")
    const aiResponse = await generateResponse(systemPrompt);
    
    return aiResponse;

  } catch (err) {
    console.error('Error in RAG service:', err);
    return "I'm sorry, I encountered an error while searching. Please try again.";
  }
};