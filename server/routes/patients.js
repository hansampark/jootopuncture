const { Router } = require('express');
const auth = require('../middleware/auth');
const {
  getPatients,
  createPatient,
  updatePatient,
  getPatient,
  deletePatient,
  getChartsByPatientId,
  createChart,
  updateChart
} = require('../controllers/patients');

const router = Router();

router.get('/', auth, getPatients);

router.post('/', auth, createPatient);

router.get('/:patientId', auth, getPatient);

router.put('/:patientId', auth, updatePatient);

router.delete('/:patientId', auth, deletePatient);

router.get('/:patientId/charts', auth, getChartsByPatientId);

router.post('/:patientId/charts', auth, createChart);

router.put('/:patientId/charts/:chartId', auth, updateChart);

module.exports = router;
