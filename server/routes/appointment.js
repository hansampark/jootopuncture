const { Router } = require('express');
const auth = require('../middleware/auth');
const {
  getAppointments,
  createAppointment,
  editAppointment,
  deleteAppointment
} = require('../controllers/appointments');

const router = Router();

router.get('/', auth, getAppointments);

router.post('/', auth, createAppointment);

router.put('/:appointmentId', auth, editAppointment);

router.delete('/:appointmentId', auth, deleteAppointment);

module.exports = router;
