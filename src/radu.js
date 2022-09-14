/* global shadowDOMSearch  */

let KEY_STR = '';
let TIMER_ID;
let RELOAD_ID;

document.onkeypress = (e) => {
  e = e || window.event;
  console.log(e.keyCode);
  if (e.key === '`') {
    KEY_STR += e.key;
    if (KEY_STR.startsWith('`') && KEY_STR.length === 3) {
      let timerId = setTimeout(submitVideo, 1000);

      KEY_STR = '';
      console.log(
        `❗ SUBMITTING IN 15 MINUTES, AT ${new Date(
          new Date().getTime() + 60 * 1000 * 15
        )}\n ⚠ PRESS 'C' TO CANCEL.`
      );
    }
  } else if (e.key === 'c' || e.key === 'C') {
    console.log(
      `🪥 Cleaning up\n TIMER_ID = ${TIMER_ID} RELOAD_ID = R-${RELOAD_ID} 🫧`
    );
    clearTimeout(TIMER_ID);
    clearTimeout(RELOAD_ID);
    TIMER_ID = null;
    RELOAD_ID = null;
  }
};

let submitVideo = () => {
  let submitBtn = shadowDOMSearch('div.actions > tcs-button.submit-button')[0];
  submitBtn.click();
};
