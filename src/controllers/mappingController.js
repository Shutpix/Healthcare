// controllers/mappingController.js
const Mapping = require('../models/Mapping');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

// Assign a doctor to a patient
exports.assignDoctor = async (req, res) => {
  try {
    const { patientId, doctorId } = req.body;

    // Optional: Validate existence of patient and doctor
    const patient = await Patient.findById(patientId);
    const doctor = await Doctor.findById(doctorId);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    const mapping = new Mapping({ patientId, doctorId });
    await mapping.save();

    res.status(201).json({ message: "Doctor assigned to patient", mapping });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all mappings
exports.getAllMappings = async (req, res) => {
  try {
    const mappings = await Mapping.find().populate('patientId doctorId');
    res.json(mappings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all doctors assigned to a specific patient
exports.getMappingsByPatient = async (req, res) => {
  try {
    const patientId = req.params.patientId;

    const mappings = await Mapping.find({ patientId }).populate('doctorId');

    if (!mappings.length) {
      return res.status(404).json({ error: "No doctors assigned to this patient" });
    }

    res.json(mappings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove a doctor-patient mapping
exports.removeMapping = async (req, res) => {
  try {
    const mapping = await Mapping.findByIdAndDelete(req.params.id);

    if (!mapping) {
      return res.status(404).json({ error: "Mapping not found" });
    }

    res.json({ message: "Doctor removed from patient" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
