const rateLimit = require('express-rate-limit');

module.exports.limiter = rateLimit({
  windowMs: 6000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
