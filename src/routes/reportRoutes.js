const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const {
  generateHealthReport,
  exportMedicalRecords,
  generateAppointmentReport
} = require('../controllers/reportController');

// Generate comprehensive health report
// GET /api/reports/health?reportType=comprehensive&dateRange=last-month&format=pdf
router.get('/health', authenticateToken, generateHealthReport);

// Export medical records
// GET /api/reports/medical-records?format=pdf
router.get('/medical-records', authenticateToken, exportMedicalRecords);

// Generate appointment history report
// GET /api/reports/appointments?dateRange=last-month&format=csv
router.get('/appointments', authenticateToken, generateAppointmentReport);

module.exports = router;
