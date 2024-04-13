module.exports = function (req, res, next) {
  try {
    if (req.user.systemRole === 'ADMIN') {
      req.admin = true;
      next();
    } else {
      return res.status(401).json({ message: 'Not Authorized' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
