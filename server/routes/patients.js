const { Router } = require('express');
const auth = require('../middleware/auth');
const {
  getPatients,
  createPatient,
  getChartsByPatientId,
  createChart
} = require('../controllers/patients');

const router = Router();

router.get('/', auth, getPatients);

router.post('/', auth, createPatient);

router.get('/:patientId/charts', auth, getChartsByPatientId);

router.post('/:patientId/charts', auth, createChart);

module.exports = router;
