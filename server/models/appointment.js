const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  title: { type: String, required: true },
  allDay: { type: Boolean },
  start: { type: Date, required: true, default: Date.now },
  end: { type: Date, required: true, default: Date.now },
  patientId: {
    type: Schema.Types.ObjectId,
    ref: 'Patient'
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
