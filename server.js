const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./src/config/dbConnect");
const cors = require("cors");
const { startEmailScheduler } = require('./src/services/emailScheduler');

dotenv.config();
dbConnect();

const app = express();

// Enhanced CORS configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:3000', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174', 'http://127.0.0.1:5175'],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Request body:', req.body);
  next();
});

// Test route
app.get('/api/test', (req, res) => {
  console.log('Test endpoint hit');
  res.json({ message: 'API is working!', timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/users", require("./src/routes/userRoutes"));
app.use("/api", require("./src/routes/appointmentRoutes"));
app.use("/api", require("./src/routes/notificationRoutes"));
app.use("/api/feedback", require("./src/routes/feedbackRoutes"));
app.use("/api/medical-records", require("./src/routes/medicalRecordRoutes"));
app.use("/api/reports", require("./src/routes/reportRoutes"));
app.use("/api/prescriptions", require("./src/routes/prescriptionRoutes"));
app.use("/api/doctor", require("./src/routes/doctor/prescriptionRoutes"));
app.use("/api/availability", require("./src/routes/doctorAvailabilityRoutes"));

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ 
    message: 'Internal server error', 
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong' 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

const PORT = process.env.PORT || 7001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/test`);
  
  // Start email scheduler
  startEmailScheduler();
});
