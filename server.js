const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

// Loading the config data from the config file
dotenv.config({ path: "./config.env" });

// Getting the DB connection string
const DB_URL = process.env.DB_BASE_URL.replace(
  "<PASSWORD>",
  process.env.DB_PASS
).replace("<DBNAME>", process.env.DB_NAME);

// Connecting with the mongodb atlas server
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Db Connection successful");
  });

// Starting the node server on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
