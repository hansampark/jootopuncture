const { Router } = require('express');
const auth = require('../middleware/auth');
const Patient = require('../models/patient');

const router = Router();

router.get('/', auth, async (req, res, next) => {
  console.log('[req.userId', req.userId);
  try {
    const patients = await Patient.find();

    res.status(200).json({ message: 'Success', patients });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

router.post('/', auth, async (req, res, next) => {
  const { firstName, lastName, email } = req.body;

  const patient = new Patient({
    firstName,
    lastName,
    email
  });

  try {
    await patient.save();
    res.status(201).json({ message: 'Success', patient });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

module.exports = router;
