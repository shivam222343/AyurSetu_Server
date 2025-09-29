const express = require('express');
const { submitFeedback, getFeedbackByAppointment, getPractitionerFeedback } = require('../controllers/feedbackController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Submit feedback
router.post('/', authenticateToken, submitFeedback);

// Get feedback by appointment ID
router.get('/appointment/:appointmentId', authenticateToken, getFeedbackByAppointment);

// Get practitioner feedback (for current doctor)
router.get('/practitioner', authenticateToken, getPractitionerFeedback);

module.exports = router;