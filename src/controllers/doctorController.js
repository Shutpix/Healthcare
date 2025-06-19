const bcrypt = require("bcrypt");
const Doctor = require("../models/Doctor");

exports.addDoctor = async (req, res) => {
  try {
    const { name, email, password, specialization } = req.body;

    if (!name || !email || !password || !specialization) {
      return res.status(400).json({ error: "Missing Credentials" });
    }

    const findDoctor = await Doctor.findOne({ email: email });
    if (findDoctor) {
      return res.status(409).json({ error: "Doctor already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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
    const { specialization, password } = req.body;

    // Build update object
    const update = {};

    if (specialization) update.specialization = specialization;
    if (password) update.password = await bcrypt.hash(password, 10);

    if (req.body.name || req.body.email) {
      return res.status(400).json({ error: "Name and email cannot be updated" });
    }

    if (Object.keys(update).length === 0) {
      return res.status(400).json({ error: "Nothing to update" });
    }

    const doctor = await Doctor.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });

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
    const { id } = req.params;

    const deletedDoctor = await Doctor.findByIdAndDelete(id);

    if (!deletedDoctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

