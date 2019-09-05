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
    decodedToken = jwt.verify(token, process.env.SECRET);

    if (!decodedToken) {
      req.isAuth = false;
      next();
    } else {
      req.userId = decodedToken.userId;
      req.isAuth = true;

      next();
    }
  } catch (err) {
    err.statusCode = 401;
    req.isAuth = false;
    next(err);
  }
};
