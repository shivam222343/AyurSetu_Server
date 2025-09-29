const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const {
  createPrescription,
  getPatientPrescriptions,
  getDoctorPrescriptions,
  getPrescription,
  updatePrescription,
  updateMedicationStatus,
  addPatientNotes,
  getActiveMedications,
  getLifestylePrescriptions
} = require('../controllers/prescriptionController');

// Create new prescription (doctors only)
router.post('/', authenticateToken, createPrescription);

// Get prescriptions for current patient
router.get('/patient', authenticateToken, getPatientPrescriptions);

// Get prescriptions for specific patient (doctors/admins only)
router.get('/patient/:patientId', authenticateToken, getPatientPrescriptions);

// Get prescriptions created by current doctor
router.get('/doctor', authenticateToken, getDoctorPrescriptions);

// Get active medications for current patient
router.get('/medications/active', authenticateToken, getActiveMedications);

// Get active medications for specific patient
router.get('/medications/active/:patientId', authenticateToken, getActiveMedications);

// Get lifestyle prescriptions for current patient
router.get('/lifestyle', authenticateToken, getLifestylePrescriptions);

// Get lifestyle prescriptions for specific patient
router.get('/lifestyle/:patientId', authenticateToken, getLifestylePrescriptions);

// Get single prescription
router.get('/:id', authenticateToken, getPrescription);

// Update prescription (doctors only)
router.put('/:id', authenticateToken, updatePrescription);

// Update medication status (patients only)
router.patch('/:id/medication-status', authenticateToken, updateMedicationStatus);

// Add patient notes
router.patch('/:id/notes', authenticateToken, addPatientNotes);

module.exports = router;
