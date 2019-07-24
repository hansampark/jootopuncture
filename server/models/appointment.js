const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  title: { type: String, required: true },
  allDay: { type: Boolean },
  start: { type: String, required: true },
  end: { type: String, required: true },
  patientId: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
