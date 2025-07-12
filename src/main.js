const express = require("express");
const { PORT } = require("./config/appConfig");
const connect = require("./database/connection");
const bodyParser = require("body-parser");
const routes = require("./routes/v1/routes");
const errorHandler = require("./middlewares/errorHandler.middleware");
const { Server } = require("socket.io");
const http = require("http");
const handleConnections = require("./socket/mediasoup.handler");
const { initiateMediasoup } = require("./services/mediasoup.service");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET"],
  })
);

//initiates media soup instance
initiateMediasoup();

io.on("connection", (socket) => {
  console.log("A user connected")
  handleConnections(socket);
});

app.use(bodyParser.json()); //middleware to parse body

//middleware for routes
app.use("/api/v1", routes);

connect(); // method to connect to database

app.use(errorHandler); //middleware to handle all errors

server.listen(PORT, () => {
  console.log("Server started at port:", PORT);
});
