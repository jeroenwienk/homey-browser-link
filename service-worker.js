const TEN_SECONDS_MS = 10 * 1000;

// Connect to the WebSocket server
const socket = new WebSocket('ws://192.168.178.192:3106');

socket.onopen = function () {
  console.log('WebSocket connection opened');
  // Send a sample message to the server
  socket.send('Hello from Chrome Extension!');
  keepAlive();
};

socket.onmessage = function (event) {
  console.log('Received from server:', event.data);
  // Handle the response from the server
  // chrome.runtime.sendMessage({ data: event.data }).catch(error => {
  //   console.log(error);
  // });

  (async () => {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    const response = await chrome.tabs.sendMessage(tab.id, { data: event.data });
    // do something with response here, not outside the function
    console.log(response);
  })();
};

socket.onclose = function () {
  console.log('WebSocket connection closed');
};

function keepAlive() {
  const keepAliveIntervalId = setInterval(
    () => {
      if (socket) {
        console.log('ping');
        socket.send('ping');
      } else {
        clearInterval(keepAliveIntervalId);
      }
    },
    // It's important to pick an interval that's shorter than 30s, to
    // avoid that the service worker becomes inactive.
    TEN_SECONDS_MS
  );
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension');
  if (request.greeting === 'hello') sendResponse({ farewell: 'goodbye' });
});
