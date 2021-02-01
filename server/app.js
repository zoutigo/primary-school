var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var dotenv = require("dotenv");
var cors = require("cors");

const handleErrors = require("./middlewares/handleErrors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var rubricsRouter = require("./routes/rubrics");
var papersRouter = require("./routes/papers");
var classroomsRouter = require("./routes/classrooms");
var articlesRouter = require("./routes/articles");
var eventsRouter = require("./routes/events");
var studentsRouter = require("./routes/students");
var commentsRouter = require("./routes/comments");

dotenv.config();

var app = express();

// Database connexion
mongoose
  .connect(process.env.MONGO_URI || process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Connexion établie à la base de donnée"))
  .catch((err) => console.log(err));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(
  cors({
    exposedHeaders: ["x-access-token"],
  })
);
app.all("", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  //Auth Each API Request created by user.
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/rubrics", rubricsRouter);
app.use("/papers", papersRouter);
// app.use("/classrooms", classroomsRouter);
// app.use("/articles", articlesRouter);
// app.use("/comments", commentsRouter);
// app.use("/students", studentsRouter);
// app.use("/events", eventsRouter);

// Heroku definition
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'))
// }

app.use(handleErrors);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;
