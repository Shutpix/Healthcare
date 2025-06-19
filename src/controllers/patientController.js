// controllers/patientController.js
const Patient = require('../models/Patient');

// Add a new patient (authenticated users only)
exports.addPatient = async (req, res) => {
  try {
    const { name, age, condition } = req.body;

    // Validate required fields
    if (!name || !age || !condition) {
      return res.status(400).json({
        error: "All fields are required: name, age, condition",
      });
    }

    const newPatient = new Patient({
      name,
      age,
      condition,
      createdBy: req.user._id, // Associate with logged-in user
    });

    await newPatient.save();

    res.status(201).json({
      message: "Patient added successfully",
      patient: newPatient,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get all patients created by the authenticated user
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find({ createdBy: req.user._id });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get details of a specific patient
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Optional: Check ownership
    if (!patient.createdBy.equals(req.user._id)) {
      return res.status(403).json({ error: "Access denied" });
    }

    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update patient details
exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Ensure only creator can update
    if (!patient.createdBy.equals(req.user._id)) {
      return res.status(403).json({ error: "Access denied" });
    }

    const updates = req.body;
    Object.assign(patient, updates);

    await patient.save();
    res.json({ message: "Patient updated", patient });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a patient
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    if (!patient.createdBy.equals(req.user._id)) {
      return res.status(403).json({ error: "Access denied" });
    }

    await patient.remove();
    res.json({ message: "Patient deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
