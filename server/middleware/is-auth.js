const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'jootopuncture web app');
  } catch (err) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    console.log('[!decodedTotken]');
    req.isAuth = false;
    return next();
  }

  console.log('[!decodedTotken]', decodedToken);

  req.userId = decodedToken.userId;
  req.isAuth = true;
  console.log('[1]');
  next();
};
