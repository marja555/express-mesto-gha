const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-word');
  } catch (err) {
    return new AuthorizationError('Необходима авторизация');
  }
  req.user = payload;

  return next();
};
