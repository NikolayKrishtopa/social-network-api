const allowedCors = [
  'http://movies.nikolaykrishtopa.nomoredomains.club',
  'https://movies.nikolaykrishtopa.nomoredomains.club',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:8080',
  'https://nikolaykrishtopa.github.io/',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];
  res.header('Access-Control-Allow-Credentials', true);
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};
