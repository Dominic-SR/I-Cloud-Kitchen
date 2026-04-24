// Main Routes
// Central route aggregation file

const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');

// API routes
router.use('/api/users', userRoutes);

// Health check
router.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
