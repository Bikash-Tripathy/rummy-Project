// const http = require('http');
// const express = require('express');
// const socketIo = require('socket.io');

// function setupServer() {
//   const app = express();
//   const server = http.createServer(app);
//   const io = socketIo(server);

//   //app.use(express.static(__dirname + '/public')); // Serve static files from 'public' directory

//   io.on('connection', (socket) => {
//     console.log('A user connected');

//     // Handle socket events here
//     // socket.on('chat message', (msg) => {
//     //   io.emit('chat message', msg); // Broadcast the message to all connected clients
//     // });

//     socket.on('disconnect', () => {
//       console.log('A user disconnected');
//     });
//   });

//   // Start the server
//   const PORT = process.env.PORT || 3000;
//   server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// }

// module.exports = setupServer;
