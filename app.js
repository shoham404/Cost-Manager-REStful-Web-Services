const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users');
const costsRoutes = require('./routes/costs');
const aboutRoutes = require('./routes/about');

const app = express();

// חיבור ל-MongoDB
const MONGO_URI = '<fill your mongo uri details>';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
      console.error('Error connecting to MongoDB:', err);
      process.exit(1); // עצירת השרת אם לא מצליחים להתחבר
    });

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', usersRoutes);
app.use('/api', costsRoutes);
app.use('/api/about', aboutRoutes);

// טיפול בשגיאות
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
