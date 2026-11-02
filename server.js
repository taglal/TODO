require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const todoRoutes = require('./roots/tasks');
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes


// todo routes
app.use('/api/tasks', todoRoutes);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

