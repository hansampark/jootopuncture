const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    console.log('[auth 1]');
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(' ')[1];
  console.log('[auth token]', token);
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'jootopuncture web app');
  } catch (err) {
    console.log('[auth catch err]', err);
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    console.log('[auth !decodedTotken]');
    req.isAuth = false;
    return next();
  }

  console.log('[auth decodedTotken]', decodedToken);

  req.userId = decodedToken.userId;
  req.isAuth = true;
  console.log('[auth 2]');
  next();
};
