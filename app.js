const express = require("express");
const appRouter = require("./routes/appRoutes");

const app = express();

app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", appRouter);
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't found ${req.originalUrl} on this server!`,
  });
  next();
});

module.exports = app;
