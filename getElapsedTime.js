/* global chrome formatTime */
let timesArray = [];

let getTimes = {
  elapsed: () => {
    chrome.storage.sync.get(['elapsedTimes'], function (result) {
      timesArray = result.elapsedTimes;
    });
    setTimeout(() => {
      console.log(timesArray.map((x) => formatTime(x)));
    }, 1000);
  },
  longest: () => {
    chrome.storage.sync.get(['elapsedTimes'], function (result) {
      timesArray = result.elapsedTimes;
    });
    setTimeout(() => {
      console.log(timesArray.filter((x) => x > 600).map((x) => formatTime(x)));
    }, 1000);
  },
};
