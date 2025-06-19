// routes/patientRoutes.js
const express = require('express');
const router = express.Router();
const userAuth = require('../middleware/authMiddleware');
const {
  addPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient
} = require('../controllers/patientController');

// Add a new patient (Authenticated)
router.post('/', userAuth, addPatient);

// Get all patients created by the authenticated user
router.get('/', userAuth, getAllPatients);

// Get a specific patient by ID
router.get('/:id', userAuth, getPatientById);

// Update a specific patient
router.put('/:id', userAuth, updatePatient);

// Delete a specific patient
router.delete('/:id', userAuth, deletePatient);

module.exports = router;
