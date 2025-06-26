const express = require("express");
const { PORT } = require("./config/appConfig");
const connect = require("./database/connection");
const bodyParser = require("body-parser");
const routes = require("./routes/v1/routes")

const app = express();

app.use(bodyParser.json()); //middleware to parse body

//middleware for routes
app.use("/api/v1", routes);

connect(); // method to connect to database

app.listen(PORT, () => {
  console.log("Server started at port:", PORT);
});
