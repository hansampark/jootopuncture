const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chartSchema = new Schema({
  height: {
    type: String
  },
  weight: {
    type: String
  },
  temp: String,
  bp: String,
  heart: String,
  rhythm: {
    type: String,
    enum: ['LOW', 'REGULAR', 'HIGH']
  },
  lung: String,
  sound: String,
  patientId: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  }
});

module.exports = mongoose.model('Chart', chartSchema);
