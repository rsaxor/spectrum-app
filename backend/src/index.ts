import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // Import CORS

const userRoutes = require('../api/users/userRoutes');
const app = express();

const PORT = process.env.PORT || 5001;

// Use CORS middleware before defining routes
app.use(cors({
  origin: 'http://localhost:3000' // Allow requests from the frontend
}));

app.use(express.json()); // Middleware to parse JSON requests

// API route for user management
app.use('/api/users', userRoutes);

// Health check for the API
app.get('/api', (req, res) => {
  res.send('API is working. Use /api/users for user routes.');
});

// Root route
app.get('/', (req, res) => {
  res.send('Hello, MERN with TypeScript, Tailwind, and ShadCN!');
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/spectrumdb')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error(err);
  });
