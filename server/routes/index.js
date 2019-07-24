const { Router } = require('express');
const authenticate = require('./authenticate');
const patients = require('./patients');
const appointments = require('./appointment');

const router = Router();

router.use('', authenticate);
router.use('/patients', patients);
router.use('/appointments', appointments);

module.exports = router;
