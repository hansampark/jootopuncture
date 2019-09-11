const Patient = require('../models/patient');
const Appointment = require('../models/appointment');

exports.getAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find();

    res.status(200).json(appointments);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

exports.createAppointment = async (req, res, next) => {
  const { event, patient } = req.body;
  const { title, start, end, patientId } = event;

  try {
    if (!patientId) {
      const appointment = new Appointment({
        title: `${patient.lastName}, ${patient.firstName} - ${patient.phone}`,
        start,
        end
      });

      await appointment.save();
      res.status(201).json(appointment);
    } else {
      const appointment = new Appointment({
        title,
        start,
        end,
        patientId
      });
      await appointment.save();

      const existingPatient = await Patient.findById(patientId);
      existingPatient.appointments.push(appointment);
      await existingPatient.save();
      res.status(201).json(appointment);
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.editAppointment = async (req, res, next) => {
  const { appointment, patient } = req.body;

  try {
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteAppointment = async (req, res, next) => {
  const { appointment, patient } = req.body;

  try {
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
