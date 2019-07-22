const { Router } = require('express');
const auth = require('../middleware/auth');
const {
  getPatients,
  createPatient,
  getChartsByPatientId,
  createChart
} = require('../controllers/patients');
const Patient = require('../models/patient');

const router = Router();

// router.get('/', auth, async (req, res, next) => {
//   try {
//     const patients = await Patient.find();

//     res.status(200).json({ message: 'Success', patients });
//   } catch (err) {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// });

// router.post('/', auth, async (req, res, next) => {
//   const { firstName, lastName, middleName, email, dob, phone, sex } = req.body;

//   const patient = new Patient({
//     firstName,
//     lastName,
//     middleName,
//     email,
//     dob,
//     phone,
//     sex
//   });

//   try {
//     await patient.save();
//     res.status(201).json({ message: 'Success', patient });
//   } catch (err) {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// });

router.get('/', auth, getPatients);

router.post('/', auth, createPatient);

router.get('/:patientId/charts', auth, getChartsByPatientId);

router.post('/:patientId/charts', auth, createChart);

module.exports = router;
