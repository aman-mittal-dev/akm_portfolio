// const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
// const morgan = require('morgan');
// require('dotenv').config();

// const portfolioRoutes = require('./routes/portfolio');
// const authRoutes = require('./routes/auth');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Security middleware
// app.use(helmet({
//   contentSecurityPolicy: {
//     directives: {
//       defaultSrc: ["'self'"],
//       styleSrc: ["'self'", "'unsafe-inline'"],
//       scriptSrc: ["'self'"],
//       imgSrc: ["'self'", "data:", "https:"],
//     },
//   },
// }));

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
//   message: 'Too many requests from this IP, please try again later.'
// });
// app.use('/api/', limiter);

// // CORS configuration
// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:3000',
//   credentials: true
// }));

// // Body parsing middleware
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // Logging
// app.use(morgan('combined'));

// // Routes
// app.use('/api/portfolio', portfolioRoutes);
// app.use('/api/auth', authRoutes);

// // Health check endpoint
// app.get('/api/health', (req, res) => {
//   res.json({ status: 'OK', message: 'Server is running' });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.status || 500).json({
//     message: err.message || 'Internal Server Error',
//     ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
//   });
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
// });


const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

// Routes
const portfolioRoutes = require('./routes/portfolio');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

/* ======================
   Security Middleware
====================== */
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'", 'https:'],
      },
    },
  })
);

/* ======================
   Rate Limiting
====================== */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.',
});
app.use('/api', limiter);

/* ======================
   CORS
====================== */
app.use(
  cors({
    origin: process.env.FRONTEND_URL || true, // same-domain in production
    credentials: true,
  })
);

/* ======================
   Body Parsers
====================== */
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

/* ======================
   Logging
====================== */
app.use(morgan('combined'));

/* ======================
   API Routes
====================== */
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

/* ======================
   Serve React Frontend
====================== */
if (process.env.NODE_ENV === 'production') {
  app.use(
    express.static(path.join(__dirname, '../frontend/build'))
  );

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../frontend/build', 'index.html')
    );
  });
}

/* ======================
   API 404 Handler
====================== */
app.use('/api', (req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

/* ======================
   Error Handler
====================== */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

/* ======================
   Start Server
====================== */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
