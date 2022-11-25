const { NODE_ENV, JWT_SECRET } = process.env;

const TOKEN_ENCRYPT_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'cdff8a7919967465c3bb7153ec3870c9';

module.exports = TOKEN_ENCRYPT_KEY;
