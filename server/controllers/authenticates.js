const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const {
  createToken,
  createRefreshToken,
  validateRefreshToken
} = require('../lib/auth');
const User = require('../models/user');

exports.signup = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    next(error);
  }

  try {
    const hashedPw = await bcrypt.hash(password, 12);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPw
    });
    const result = await user.save();
    res.status(201).json({ message: 'Success', userId: result._id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  let loadedUser;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error('Email does not exists.');
      error.statusCode = 401;
      next(error);
    }

    const validate = await bcrypt.compare(password, user.password);

    if (!validate) {
      const error = new Error('Email or password does not match.');
      error.statusCode = 401;
      error.status = 401;
      next(error);
    } else {
      loadedUser = user;

      const token = await createToken(loadedUser);

      res.status(200).json({
        token: token,
        user: {
          _id: loadedUser._id.toString(),
          firstName: loadedUser.firstName,
          lastName: loadedUser.lastName,
          email: loadedUser.email
        }
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      next(err);
    }
  }
};

// TODO: RefreshToken controller
// exports.refreshToken = async (req, res, next) => {
//   const { user, refreshToken } = req.body;

//   const validate = validateRefreshToken(refreshToken);

//   if (validate) {
//     try {
//       const newToken = await createToken(user);
//       const newRefreshToken = await createRefreshToken(user);

//       res.status(200).json({ token: newToken, refreshToken: newRefreshToken });
//     } catch (err) {
//       if (!err.statusCode) {
//         err.statusCode = 401;
//         next(err);
//       }
//     }
//   }
// };

exports.resetPassword = async (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    next(error);
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error('Email does not exist.');
      error.statusCode = 401;
      next(error);
    }

    const hashedPw = await bcrypt.hash(password, 12);

    const updatedUser = await User.findOneAndUpdate(
      { email: user.email },
      {
        password: hashedPw
      },
      { new: true }
    );

    res.status(201).json({ message: 'Success', userId: updatedUser._id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      next(err);
    }
  }
};
