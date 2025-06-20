// routes/mappingRoutes.js
const express = require('express');
const router = express.Router();
const userAuth = require('../middleware/authMiddleware');
const {
  assignDoctor,
  getAllMappings,
  getMappingsByPatient,
  removeMapping
} = require('../controllers/mappingController');

// Assign a doctor to a patient (Authenticated)
//router.post('/', userAuth, assignDoctor);
router.post('/', userAuth, assignDoctor);


// Get all patient-doctor mappings (Authenticated)
router.get('/', userAuth, getAllMappings);

// Get all doctors assigned to a specific patient (Authenticated)
router.get('/:patientId', userAuth, getMappingsByPatient);

// Remove a doctor from a patient (Authenticated)
router.delete('/:id', userAuth, removeMapping);

module.exports = router;
