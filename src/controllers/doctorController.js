// controllers/doctorController.js
const bcrypt = require("bcrypt");
const Doctor = require("../models/Doctor");

// Create a new doctor (authenticated users only)
exports.addDoctor = async (req, res) => {
  try {
    const { name, email, password, specialization } = req.body;

    if (!name || !email || !password || !specialization) {
      return res.status(400).json({ error: "Missing Credentials" });
    }

    // ❗ FIX: await the query
    const findDoctor = await Doctor.findOne({ email: email });
    if (findDoctor) {
      return res.status(409).json({ error: "Doctor already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 👇 Assuming doctors are stored in a Doctor model, not User model
    const newDoctor = new Doctor({
      name,
      email,
      password: hashedPassword,
      specialization,
    });

    await newDoctor.save();
    res.status(201).json({ message: "Doctor added successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get doctor by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update doctor details
exports.updateDoctor = async (req, res) => {
  try {
    const { name, specialization } = req.body;

    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { name, specialization },
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.json({ message: "Doctor updated", doctor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete doctor
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.json({ message: "Doctor deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
