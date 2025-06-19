// routes/doctorRoutes.js
const express = require('express');
const router = express.Router();
const userAuth = require('../middleware/authMiddleware');
const {
  addDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor
} = require('../controllers/doctorController');

// Add a new doctor (Authenticated users only)
router.post('/', userAuth, addDoctor);

// Retrieve all doctors (Public or Authenticated)
router.get('/', getAllDoctors);

// Get a specific doctor by ID
router.get('/:id', getDoctorById);

// Update doctor details (Authenticated users only)
router.put('/:id', userAuth, updateDoctor);

// Delete a doctor record (Authenticated users only)
router.delete('/:id', userAuth, deleteDoctor);

module.exports = router;
