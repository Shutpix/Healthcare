const mongoose = require('mongoose');
const mappingSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }
});
module.exports = mongoose.model('Mapping', mappingSchema);
