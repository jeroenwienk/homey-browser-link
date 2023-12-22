'use strict';

const Homey = require('homey');
const WebSocket = require('ws');
const http = require('http');

const server = http.createServer({});
const wsServer = new WebSocket.Server({ server });

let activeSocket = null;

// WebSocket connection handling
wsServer.on('connection', (socket) => {
  console.log('WebSocket connection opened');
  activeSocket = socket;

  // Handle incoming messages from the WebSocket client
  socket.on('message', (message) => {
    console.log('Received:', message.toString());
    // Send a response back to the WebSocket client
    // socket.send('Message received by the server.');
  });

  // Handle WebSocket connection close
  socket.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

const PORT = 3106;

// Start the HTTP server on the specified port
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

class App extends Homey.App {
  async onInit() {
    this.log('App has been initialized');

    this.homey.flow
      .getActionCard('test')
      .registerRunListener(async (args, state) => {
        this.log(args);
        this.log(state);

        if (activeSocket) {
          activeSocket.send(args.command);
        }
      });
  }
}

module.exports = App;
