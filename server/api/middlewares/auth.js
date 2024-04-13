const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // get token from header
  const token = req.headers.authorization;

  // check if not token
  if (!token) {
    return res.status(401).json({ message: 'Not Authorized' });
  }

  // verify token
  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is invalid' });
  }
};
