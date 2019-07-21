const { Router } = require('express');
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const { signup, login } = require('../controllers/authenticates');
const User = require('../models/user');
const { PASSWORD_REGEX } = require('../lib/validators');

const router = Router();

router.post(
  '/signup',
  [
    check('firstName')
      .trim()
      .not()
      .isEmpty(),
    check('lastName')
      .trim()
      .not()
      .isEmpty(),
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom((value, { req }) => {
        return User.findOne({ email: value })
          .then(userDoc => {
            if (userDoc) {
              return Promise.reject('Email already exists.');
            }
          })
          .catch(err => console.log('[email err]', err));
      }),
    check('password')
      .trim()
      .isLength({ min: 8, max: 20 })
      .custom((value, { req }) => {
        const isValidPassword = PASSWORD_REGEX.test(req.body.password);
        if (!isValidPassword) {
          return Promise.reject(
            'Password must be 8-20 characters and contain one uppercase letter, one lowercase letter, one number, and one special character'
          );
        }
        return true;
      })
  ],
  signup
);

router.post('/login', login);

router.delete('/logout', auth, async (req, res, next) => {
  try {
    res.status(200).json({ message: 'Success' });

    // if (!user) {
    //   const error = new Error('Email does not exists.');
    //   error.statusCode = 401;
    //   throw error;
    // }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      next(err);
    }
  }
});

module.exports = router;
