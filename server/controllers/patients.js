const Patient = require('../models/patient');
const Chart = require('../models/chart');

exports.getPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find().populate('charts');
    // sort charts by recent date
    patients.map(patient => {
      patient.charts.sort((a, b) => new Date(b.date) - new Date(a.date));
    });

    res.status(200).json(patients);
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

exports.updatePatient = async (req, res, next) => {
  const { patientId } = req.params;
  const { patient } = req.body;

  try {
    const updatedPatient = await Patient.findOneAndUpdate(
      { _id: patientId },
      { ...patient },
      { new: true }
    ).populate('charts');
    // sort charts by recent date
    updatedPatient.charts.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json(updatedPatient);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deletePatient = async (res, req, next) => {
  const { patientId } = req.params;

  try {
    const patient = await Patient.findById(patientId);

    if (!patient) {
      const error = new Error('Could not find patient.');
      error.statusCode = 404;
      next(error);
    }

    await Patient.findByIdAndRemove(patientId);

    // const charts = await Chart.find({ patientId });
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

exports.updateChart = async (req, res, next) => {
  const { chartId } = req.params;
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
    // Mongoose findOneAndUpdate method takes 4 args, [condition]: Object, [update]: Object, [options]: Object,
    // [callback]: Function
    const updatedChart = await Chart.findOneAndUpdate(
      { _id: chartId },
      {
        ...vitals,
        complaints,
        illnesses,
        info,
        questionaire,
        review,
        women,
        tongue,
        pulse,
        diagnosis
      },
      { new: true } // when true, returns modified data rather than original
    );

    await updatedChart.save();

    res.status(201).json(updatedChart);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
