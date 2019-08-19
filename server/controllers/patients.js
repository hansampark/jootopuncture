const Patient = require('../models/patient');
const Chart = require('../models/chart');

exports.getPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find();

    res.status(200).json({ message: 'Success', patients });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createPatient = async (req, res, next) => {
  const { patient, chart } = req.body;
  const { firstName, lastName, middleName, email, dob, phone, sex } = patient;
  const {
    vitals,
    complaints,
    illnesses,
    info,
    questionaire,
    review,
    women,
    tongue,
    pulse,
    diagnosis
  } = chart;

  try {
    const patient = new Patient({
      firstName,
      lastName,
      middleName,
      email,
      dob,
      phone,
      sex
    });

    if (!Object.values(chart).every(val => val === null || val === '')) {
      const newChart = new Chart({
        ...vitals,
        complaints,
        illnesses,
        info,
        questionaire,
        review,
        women,
        tongue,
        pulse,
        diagnosis,
        patientId: patient._id
      });

      await newChart.save();

      patient.charts.push(newChart);
    }

    await patient.save();

    res.status(201).json(patient);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getPatient = async (req, res, next) => {
  const { patientId } = req.params;

  try {
    const patient = await Patient.findById({ _id: patientId }).populate(
      'charts'
    );
    // sort charts by recent date
    patient.charts.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json(patient);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getChartsByPatientId = async (req, res, next) => {
  const { patientId } = req.params;

  try {
    const charts = await Chart.find({ patientId });

    res.status(200).json(charts);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createChart = async (req, res, next) => {
  const { patientId } = req.params;
  const { chart } = req.body;
  const {
    vitals,
    complaints,
    illnesses,
    info,
    questionaire,
    review,
    women,
    tongue,
    pulse,
    diagnosis
  } = chart;

  try {
    const patient = await Patient.findById({ _id: patientId });
    const newChart = new Chart({
      ...vitals,
      complaints,
      illnesses,
      info,
      questionaire,
      review,
      women,
      tongue,
      pulse,
      diagnosis,
      patientId
    });

    await newChart.save();

    patient.charts.push(newChart);
    await patient.save();

    res.status(201).json(newChart);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
