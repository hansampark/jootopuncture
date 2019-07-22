const { Router } = require('express');
const { check } = require('express-validator');
const auth = require('../middleware/auth');
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
  const { values, chart } = req.body;
  const { firstName, lastName, middleName, email, dob, phone, sex } = values;
  const { height, weight, temp, bp, heart, rhythm, lung, sound } = chart;

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
    console.log('[patient]', patient);

    if (!Object.values(chart).every(val => val === null || val === '')) {
      const newChart = new Chart({
        height,
        weight,
        temp,
        bp,
        heart,
        rhythm,
        lung,
        sound,
        patientId: patient._id
      });
      console.log('[newChart]', newChart);

      await newChart.save();
      patient.charts.push(newChart);
    }

    await patient.save();

    res.status(201).json({ message: 'Success', patient });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getChartsByPatientId = async (req, res, next) => {
  const { patientId } = req.params;
  console.log('[req.params]', req.params);
  try {
    const charts = await Chart.find({ patientId });
    console.log('[charts]', charts);
    res.status(200).json({ message: 'Success', charts });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createChart = async (req, res, next) => {
  const {
    height,
    weight,
    temp,
    BarProp,
    heart,
    rhythm,
    lung,
    sound
  } = req.body;
  const { patientId } = req.params;

  try {
    const chart = new Chart({
      height,
      weight,
      temp,
      BarProp,
      heart,
      rhythm,
      lung,
      sound
    });
    await Chart.save();
    res.status(201).json({ message: 'Success', chart });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
