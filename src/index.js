require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet =require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to DXA Group API' });
});

// API routes
app.use('/api/services', require('./routes/service'));
app.use('/api/ad-accounts', require('./routes/adAccount'));
app.use('/api/users', require('./routes/user'));
app.use('/api/contacts', require('./routes/contact'));
app.use('/api/portfolio', require('./routes/portfolio'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/auth', require('./routes/auth'));


// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
}); 