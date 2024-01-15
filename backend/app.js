const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { handleErrors } = require("./middlewares/handleErrors");
require("dotenv").config();
const Router = require("./routes");
const { requestRateLimiter } = require("./utils/requestRateLimiter");

const { PORT = 3000, URI = "mongodb://localhost:27017/todo-listdb" } =
  process.env;

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(
  cors({
    origin: [
      "https://todolist.nomoredomainsicu.ru",
      "http://api.todolist.nomoredomainsicu.ru",
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(requestLogger);
app.use(requestRateLimiter);
app.use("/", Router);
app.use(errorLogger);
app.use(errors());
app.use(handleErrors);
app.listen(PORT);
