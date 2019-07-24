const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patientSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  middleName: String,
  email: String,
  dob: String,
  phone: { type: String, required: true },
  sex: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  },
  appointments: [{ type: Schema.Types.ObjectId, ref: 'Appointment' }],
  charts: [{ type: Schema.Types.ObjectId, ref: 'Chart' }]
});

module.exports = mongoose.model('Patient', patientSchema);
