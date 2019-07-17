const { Router } = require('express');
const authenticate = require('./authenticate');
const patients = require('./patients');

const router = Router();

router.use('', authenticate);
router.use('/patients', patients);

module.exports = router;
