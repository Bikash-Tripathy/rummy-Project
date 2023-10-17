// //mongodb+srv://BIKASH:2NQSqnkWjFq2TWNe@cluster0.bbmcbft.mongodb.net/rummy


// const express = require("express");
// const bodyparser = require("body-parser");
// const mongoose = require("mongoose");
// const route = require("./route/pointTableMasterRoutes");
// const pockerRoute = require("./route/pokerMasterRoutes");
// const rummyPointHistoryRoute = require("./route/rummyPointHistoryRoutes");
// const pockerHistoryRoute = require("./route/pokerHistoryRoutes");
// const rummyDealRoute = require("./route/rummyDealRouter");
// const playerRoute = require("./route/playerRoutes");
// const handRoute = require("./route/handRoutes");
// const gameRoute = require("./route/gameRoutes");
// const lobbyRoute = require("./route/lobbyRoutes");
// const rummyRoutes = require('./route/rummyRoutes');
// const HTTP = require('http');
// const socketIo = require('socket.io');

// const app = express();
// const server = HTTP.createServer(app);
// const io = socketIo(server);

// const cors = require("cors");

// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({ extended: true }));
// app.use(cors());

// mongoose.connect("mongodb+srv://BIKASH:2NQSqnkWjFq2TWNe@cluster0.bbmcbft.mongodb.net/rummy", { useNewUrlParser: true })
//   .then(() => console.log("MongoDB is connected"))
//   .catch((err) => console.log(err.message));

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('chat message', (msg) => {
//     io.emit('chat message', msg); // Broadcast the message to all connected clients
//   });

//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });

// app.use("/", route);
// app.use("/", pockerRoute);
// app.use("/", rummyPointHistoryRoute);
// app.use("/", pockerHistoryRoute);
// app.use("/", rummyDealRoute);
// app.use("/", playerRoute);
// app.use("/", handRoute);
// app.use("/", gameRoute);
// app.use("/", lobbyRoute);
// app.use("/rakesh", rummyRoutes);

// const PORT = process.env.PORT || 3000;

// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const route = require("./route/pointTableMasterRoutes");
const pokerRoute = require("./route/pokerMasterRoutes");
const rummyPointHistoryRoute = require("./route/rummyPointHistoryRoutes");
const pokerHistoryRoute = require("./route/pokerHistoryRoutes");
const rummyDealRoute = require("./route/rummyDealRouter");
const playerRoute = require("./route/playerRoutes");
//const handRoute = require("./route/handRoutes");
const gameRoute = require("./route/gameRoutes");
const lobbyRoute = require("./route/lobbyRoutes");
const rummyRoutes = require('./route/rummyRoutes');
const userRoutes = require('./route/userRoutes');
const http = require('http');
const socketIo = require('socket.io');
const cors = require("cors");


const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect("mongodb+srv://BIKASH:2NQSqnkWjFq2TWNe@cluster0.bbmcbft.mongodb.net/rummy", { useNewUrlParser: true })
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err.message));

io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle custom events
  socket.on('message', (data) => {
    console.log('Received message:', data);
    // Broadcast the message to all connected clients
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.use("/", route);
app.use("/", pokerRoute);
app.use("/", rummyPointHistoryRoute);
app.use("/", pokerHistoryRoute);
app.use("/", rummyDealRoute);
app.use("/", playerRoute);
//app.use("/", handRoute);
app.use("/", gameRoute);
app.use("/", lobbyRoute);
app.use("/rakesh", rummyRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

