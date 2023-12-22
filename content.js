// (async () => {
//   const response = await chrome.runtime.sendMessage({ greeting: 'hello' });
//   // do something with response here, not outside the function
//   console.log(response);
// })();

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log('Received message from service worker:', message.data);
  const video = document.getElementsByTagName('video')[0];

  switch (message.data) {
    case 'increase volume': {
      let nextVolume = video.volume + 0.1;
      if (nextVolume > 1) nextVolume = 1;
      video.volume = nextVolume;
      break;
    }
    case 'decrease volume': {
      let nextVolume = video.volume - 0.1;
      if (nextVolume < 0) nextVolume = 0;

      video.volume = nextVolume;
      break;
    }
    case 'pause': {
      video.pause();
      break;
    }
    case 'play': {
      video.play();
      break;
    }
  }
});
