const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();
const http = require('http'); // Import http
const { Server } = require('socket.io'); // Import socket.io

const app = express();
const server = http.createServer(app); // Create HTTP server from Express app

// --- Socket.IO Setup ---
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5000', // Your React app's URL
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // Join a room based on conversationId
  socket.on('joinRoom', (conversationId) => {
    socket.join(conversationId);
    console.log(`User ${socket.id} joined room ${conversationId}`);
  });

  // Listen for a new message
  socket.on('sendMessage', (data) => {
    const { conversationId, sender, text } = data;
    
    // In a real app, we save this message to the DB here
    // Then, we emit it to the room
    
    // For now, just emit it. We'll save via REST API.
    // The 'newMessage' event will be sent to all clients in the room
    io.to(conversationId).emit('newMessage', {
      conversationId,
      sender, // This should be the full sender user object
      text,
      createdAt: new Date(),
    });
  });

  socket.on('disconnect', () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});
// --- End Socket.IO Setup ---

// Connect Database
connectDB();

// Init Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Define Routes
app.get('/', (req, res) => res.send('ALMALINK API Running'));

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/directory', require('./routes/api/directory'));
app.use('/api/chatbot', require('./routes/api/chatbot'));
app.use('/api/jobs', require('./routes/api/jobs'));     // <-- ADD THIS
app.use('/api/posts', require('./routes/api/posts'));   // <-- ADD THIS


// --- Add new chat routes ---
app.use('/api/conversations', require('./routes/api/conversations'));
app.use('/api/messages',require('./routes/api/messages'));

const PORT = process.env.PORT || 5000;

// Change app.listen to server.listen
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));