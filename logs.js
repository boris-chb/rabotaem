function getVideoLogsObj() {
  let now = new Date();
  let queueInfo = getQueueInfo();
  let entityID = queueInfo.entityID;
  let elapsedTime = `${Math.floor(getTimeElapsed() / 60)}:${
    getTimeElapsed() % 60
  }`;
  let submissionTime = new Date().toGMTString();
  let allocatedStartTime = new Date(
    shadowDOMSearch('yurt-review-root')[0].__allocateStartTime
  ).toGMTString();
  let timeRunning =
    (new Date() -
      new Date(shadowDOMSearch('yurt-review-root')[0].__allocateStartTime)) /
    1000;

  timeRunning = `${Math.floor(timeRunning / 60)}:${Math.floor(
    timeRunning % 60
  )}`;

  return {
    entityID,
    allocatedStartTime,
    submissionTime,
    elapsedTime,
    timeRunning,
  };
}

let videosArr;

function getLogData(obj) {
  let videosArr = JSON.parse(localStorage.getItem('videosArr'));
  let data = new Blob([JSON.stringify(obj, null, 2)], { type: 'text/plain' });

  // If we are replacing a previously generated file we need to
  // manually revoke the object URL to avoid memory leaks.
  if (videoLogs !== null) {
    window.URL.revokeObjectURL(videoLogs);
  }

  let videoLogs = window.URL.createObjectURL(data);

  // returns a URL you can use as a href
  return videoLogs;
}
