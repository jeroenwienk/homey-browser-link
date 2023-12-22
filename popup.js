document.addEventListener('DOMContentLoaded', function () {
  const sendMessageButton = document.getElementById('sendMessage');

  sendMessageButton.addEventListener('click', function () {
    // Connect to the WebSocket server
    const socket = new WebSocket('ws://192.168.178.192:3106');

    socket.onopen = function () {
      console.log('WebSocket connection opened');
      // Send a sample message to the server
      socket.send('Hello from Chrome Extension!');
    };

    socket.onmessage = function (event) {
      console.log('Received from server:', event.data);
      // Handle the response from the server
    };

    socket.onclose = function () {
      console.log('WebSocket connection closed');
    };
  });
});
