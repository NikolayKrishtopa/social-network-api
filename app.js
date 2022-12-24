require("dotenv").config();
const mongoose = require("mongoose");
const helmet = require("helmet");
const { errors } = require("celebrate");
const express = require("express");
const cookieParser = require("cookie-parser");
const { limiter } = require("./middlewares/limiter");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const router = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");
const verifyOrigin = require("./middlewares/verifyOrigin");
const DB_ADDRESS = require("./utils/DB_ADDRESS");

const { PORT = 3001, mongo = DB_ADDRESS } = process.env;

const app = express();

mongoose.connect(mongo);

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
