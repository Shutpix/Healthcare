// controllers/mappingController.js
const Mapping = require('../models/mapping');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

// Assign a doctor to a patient
exports.assignDoctor = async (req, res) => {
  try {
    const { patientId, doctorId } = req.body;

    // Check if both patient and doctor exist
    const [patient, doctor] = await Promise.all([
      Patient.findById(patientId),
      Doctor.findById(doctorId),
    ]);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Optional: Prevent duplicate assignments
    const existing = await Mapping.findOne({ patientId, doctorId });
    if (existing) {
      return res.status(409).json({ error: "Doctor already assigned to this patient" });
    }

    const mapping = await Mapping.create({ patientId, doctorId });

    res.status(201).json({
      message: "✅ Doctor assigned to patient successfully",
      mapping,
    });
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
