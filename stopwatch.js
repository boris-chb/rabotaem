function addStopwatch() {
  let stopwatchElement = shadowDOMSearch('#stopwatch');
  if (stopwatchElement) {
    return;
  }
  const stopwatchDiv = document.createElement('div');
  const headerTitle = shadowDOMSearch(
    'yurt-core-plugin-header > div > tcs-view'
  )[0];
  stopwatchDiv.innerHTML = `<div id="stopwatch">
                              <div class="stopwatch-display">
                                <span id="mainminute">00</span> :
                                <span id="mainsecond">00</span>
                              </div>
                            </div>`;
  stopwatchDiv.style =
    'white-space: nowrap; -webkit-box-direction: normal; display: flex; color: var(--yt-text-primary); font-family: Roboto, Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 400; line-height: 28px; overflow: hidden; margin-left: 30px';

  headerTitle.appendChild(stopwatchDiv);
}

// class Stopwatch {
//   constructor() {
//     this.addToDOM();
//     this.STOPWATCH_ID = 0;
//     this.seconds = 0;
//     this.minutes = 0;
//     // this.DISPLAY = shadowDOMSearch('.stopwatch-display')[0];
//   }

//   addToDOM() {
//     // let stopwatchElement = shadowDOMSearch('#stopwatch');
//     // if (stopwatchElement) {
//     //   return;
//     // }
//     const stopwatchDiv = document.createElement('div');
//     // const headerTitle = shadowDOMSearch(
//     //   'yurt-core-plugin-header > div > tcs-view'
//     // )[0];
//     stopwatchDiv.innerHTML = `<div id="stopwatch">
//                                 <div class="stopwatch-display">
//                                   <span id="mainminute">00</span> :
//                                   <span id="mainsecond">00</span>
//                                 </div>
//                               </div>`;
//     stopwatchDiv.style =
//       'white-space: nowrap; -webkit-box-direction: normal; display: flex; color: var(--yt-text-primary); font-family: Roboto, Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 400; line-height: 28px; overflow: hidden; margin-left: 30px';

//     // headerTitle.appendChild(stopwatchDiv);
//   }

//   tick() {
//     this.seconds++;
//     if (this.seconds === 60) {
//       this.seconds = 0;
//       this.minutes++;
//       if (this.minutes === 60) {
//         this.minutes = 0;
//       }
//     }

//     let formattedTime = ` ${
//       this.minutes < 10 ? '0' + this.minutes : this.minutes
//     } : ${this.seconds < 10 ? '0' + this.seconds : this.seconds}`;

//     // this.DISPLAY.innerHTML = formattedTime;
//   }

//   start() {
//     if (this.STOPWATCH_ID) {
//       clearInterval(this.STOPWATCH_ID);
//     }

//     this.STOPWATCH_ID = setInterval(() => this.tick(), 1000);
//     console.log(this.STOPWATCH_ID);
//     return this.STOPWATCH_ID;
//   }

//   reset() {
//     console.log(`cleaning up ${this.STOPWATCH_ID}`);
//     clearInterval(this.STOPWATCH_ID);
//     console.log('⏱ cleaned up the stopwatch', this.STOPWATCH_ID);
//     [this.seconds, this.minutes] = [0, 0];
//     this.DISPLAY.innerHTML = '00 : 00';
//   }

//   reRender() {
//     if (getTimeElapsed() < 2) {
//       console.log('re-rendering stopwatch');
//       this.reset();
//       this.addToDOM();
//       this.start();
//     }
//   }
// }

// let s1 = new Stopwatch();
// s1.start();
// s1.start();
// setTimeout(() => {
//   s1.stop();
//   console.log(s1.STOPWATCH_ID);
// }, 5000);
