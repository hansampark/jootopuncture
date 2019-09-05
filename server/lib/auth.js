const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { SECRET } = process.env;

exports.createToken = async user => {
  return jwt.sign(
    {
      email: user.email,
      userId: user._id.toString()
    },
    SECRET,
    { expiresIn: '8h' }
  );
};

// TODO: Create refresh token
// exports.createRefreshToken = user => {
//   return jwt.sign(
//     {
//       type: 'refresh'
//     },
//     SECRET,
//     { expiresIn: 60 * 2 }
//   );
// };

exports.validateRefreshToken = refreshToken => {
  if (refreshToken !== '') {
    return jwt.verify(refreshToken, SECRET, err => {
      if (err) {
        err.statusCode = 401;
        throw err;
      } else {
        return refreshToken;
      }
    });
  } else {
    throw 'There is no refresh token to check.';
  }
};
