const { NODE_ENV, JWT_SECRET } = process.env;

const TOKEN_ENCRYPT_KEY = NODE_ENV === 'production' ? JWT_SECRET : '3411375c14aa8e81755ab81967a48326';

module.exports = TOKEN_ENCRYPT_KEY;
