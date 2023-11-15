// server.js
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/inventory_management', {
  useNewUrlParser: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connected');
});

// Add User Routes
const userRoutes = require('./routes/user');
app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
