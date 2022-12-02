require('dotenv').config();
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const express = require('express');
const cookieParser = require('cookie-parser');
const { limiter } = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const verifyOrigin = require('./middlewares/verifyOrigin');

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/moviesdb');

app.use(requestLogger);

app.use(verifyOrigin);

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(limiter);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
