/* global shadowDOMSearch getQueueInfo getActionInfoElement */
// eslint-disable no-unused-vars

// Constants
let METRICS_QUEUE = shadowDOMSearch('.queue-info')[0].innerText.includes(
  'Metrics'
);
let VIDEO_PLAYER = shadowDOMSearch('#movie_player')[0];
let TIMER_ID;
let RELOAD_ID;
let KEY_COUNT = 0;
let KEY_STR = '';
let LOOP_COUNT = 0;
const LOCK = shadowDOMSearch('yurt-review-activity-dialog')[0];
const LOCK_INTERVAL = setInterval(removeLock, 1000 * 60);
let QUEUE = getQueue();

// Keypresses
document.onkeypress = (e) => {
  e = e || window.event;
  // console.log(e.keyCode);
  KEY_COUNT += parseInt(e.keyCode, 10);
  if (e.key === '`') {
    KEY_STR += e.key;
    if (KEY_STR.startsWith('`') && KEY_STR.length === 3) {
      let taymerLength = parseInt(KEY_STR.slice(1), 10);
      taymer(taymerLength, true);
      KEY_STR = '';
    }
  }

  switch (e.keyCode) {
    case 99 || 'c':
      if (TIMER_ID || RELOAD_ID) {
        console.log(`🪥 Cleaning up T-${TIMER_ID} R-${RELOAD_ID} 🫧`);
        clearTimeout(TIMER_ID);
        clearTimeout(RELOAD_ID);
        TIMER_ID = null;
        RELOAD_ID = null;
      }
      console.log('✅ No taymer set.');
      break;
    case 60 || '<':
      console.log(`submit rus`);
      submitVid.russian();
      break;
    case 91 || '[':
      submitVid.agnostic();
      break;
    case 93:
      submitVid.blank();
      break;
    case 39:
      submitVid.english();
      break;
    case 96 || '`':
      QUEUE = getQueue();
      if (QUEUE.includes('Comments')) {
        approveComment();
        break;
      }
      let submitBtn = shadowDOMSearch(
        'div.actions > tcs-button.submit-button'
      )[0];
      submitBtn.click();
      break;

    // route
    case 47 || '/':
      route('arabic');
      break;
    case 42 || '*':
      route('gv');
      break;
    case 45 || '-':
      route('adult');
      break;

    default:
      break;
  }
};

// main()
function approveVideo(language, timerMin, submit = false, reload = false) {
  // function myReviews() {
  //   let link = shadowDOMSearch('#mdc-tab-293')[0];

  //   link.click();
  //   // console.log('my Reviews');
  // }

  function addReview() {
    let link = document
      .querySelector('body > yurt-root-app')
      .shadowRoot.querySelector(
        'tcs-view > app-drawer-layout > app-header-layout > yurt-core-router'
      )
      .shadowRoot.querySelector('yurt-review-root')
      .shadowRoot.querySelector('tcs-view > yurt-root-plugin-manager')
      .shadowRoot.querySelector('div > yurt-video-root')
      .shadowRoot.querySelector(
        'yurt-review-layout > tcs-view:nth-child(4) > yurt-video-decision-panel-v2'
      )
      .shadowRoot.querySelector(
        'yurt-core-decision-annotation-tabs > div:nth-child(1) > yurt-core-decsion-add-review'
      )
      .shadowRoot.querySelector('tcs-button');

    link.click();
    console.log('add Review');
  }

  function approvePolicyTag() {
    let policiesNodeList = shadowDOMSearch('yurt-core-policy-selector-item');

    if (!policiesNodeList) {
      console.log('[recursion] looking for 9008 tag');
      setTimeout(approvePolicyTag, 500);
      return;
    }

    let policiesArr = Array.from(policiesNodeList);
    let approvePolicy = policiesArr.filter((p) => p.__policy.id === '9008')[0];

    console.log('approvePolicyTag');
    approvePolicy.click();
    // console.log('approve tag');
  }

  function unrelatedToVEOption(related = false) {
    // console.log('unrelated to VE 1');
    let options = shadowDOMSearch('mwc-formfield');
    let [no, yes, borderline] = options;
    let link = no;
    if (link.label !== 'No, unrelated to VE') {
      console.log('>>?? [recursion] radio button ');
      setTimeout(unrelatedToVEOption, 500);
      return;
    }
    link.click();
    // console.log('unrelated to VE');
  }

  function nextQ() {
    let nextBtnElem = shadowDOMSearch('.next-button');
    if (!nextBtnElem) {
      console.log('[recursion] NEXT btn');
      setTimeout(nextQ, 500);
      return;
    }
    let link = nextBtnElem[0];
    link.click();
    // console.log('next');
  }

  function questionnaireDone() {
    let nodeList = shadowDOMSearch('.submit > tcs-button');

    if (!nodeList) {
      console.log('[recursion] DONE btn');
      setTimeout(questionnaireDone, 500);
      return;
    }

    let link = nodeList[0];

    link.click();
  }

  function languageOption(language) {
    let link;
    let optionsNodeList = shadowDOMSearch('mwc-select > mwc-list-item');

    if (!optionsNodeList) {
      console.log(`[recursion] looking for ${language} option`);
      setTimeout(() => languageOption(language), 500);
      return;
    }

    let optionsArr = Array.from(optionsNodeList).filter(
      (lang) =>
        lang.value.includes('Russian') ||
        lang.value.includes('Language agnostic') ||
        lang.value === 'English'
    );

    let [english, agnostic, russian] = optionsArr;

    switch (language) {
      case 'russian':
        link = russian;
        break;
      case 'english':
        link = english;
        break;
      case 'agnostic':
        link = agnostic;
        break;
      default:
        break;
    }

    link.click();
  }

  function selectTextArea() {
    let link;
    link = shadowDOMSearch('.mdc-text-field__input')[0];

    console.log('text area');
    link.select();
  }

  function saveBtn() {
    let elem = shadowDOMSearch('div.action-buttons > tcs-button.save-button');

    if (!elem) {
      console.log('Save button recursion');
      setTimeout(saveBtn, 500);
      return;
    }

    let btn = elem[0];
    if (btn.disabled === true) {
      console.log('Save Btn disabled, hmm');
      setTimeout(saveBtn, 500);
      return;
    }

    btn.click();
  }

  function submitBtn() {
    let elem = shadowDOMSearch('div.actions > tcs-button.submit-button');
    let timers = [];
    if (!elem) {
      console.log('Submit button recursion');
      setTimeout(submitBtn, 500);
      return;
    }

    let btn = elem[0];
    if (btn.disabled === true) {
      console.log('submitBtn recursion');
      setTimeout(submitBtn, 500);
      return;
    }

    btn.click();
  }

  /////////////////////////////////////////////////

  // main() {}
  // myReviews();
  addReview();
  approvePolicyTag();
  if (!METRICS_QUEUE) {
    // ?
  }
  unrelatedToVEOption();
  nextQ();
  questionnaireDone();
  languageOption(language);
  setTimeout(() => selectTextArea, 2000);
  // saveBtn();
  removeLock();
  KEY_COUNT = 0;
  KEY_STR = '';

  if (submit) {
    // submitBtn();
  }

  ////////////////////////////////////////////////////////////////////
}

function route(targetQ, note) {
  function routeLink() {
    let routeBtn = shadowDOMSearch('.route-button')[0];
    routeBtn.click();
  }

  function selectTarget(targetQ) {
    let target;
    let reason;
    let routeOptions = Array.from(shadowDOMSearch('mwc-list-item'));
    let [adult, gv, hate, arabic] = routeOptions.filter(
      (opt) =>
        opt.innerHTML.includes('Arabic') ||
        opt.innerHTML.includes('Graphic violence - XSource') ||
        opt.innerHTML.includes('Adult') ||
        opt.innerHTML.includes('H&')
    );
    let [lang, greyArea, policyVertical, other] = shadowDOMSearch(
      '.routing-reason'
    )[0].children;

    if (targetQ === 'arabic') {
      target = arabic;
      reason = lang;
    } else if (targetQ === 'gv') {
      target = gv;
      reason = policyVertical;
    } else if (targetQ === 'hate') {
      target = hate;
      reason = policyVertical;
    } else if (targetQ === 'adult') {
      target = adult;
      reason = policyVertical;
    }
    target.click();
    reason.click();
  }

  function addNote(note) {
    // you sure?
    let notesInput = shadowDOMSearch('.notes-input')[0];
    notesInput.__value = note;
  }

  const selectTextArea = () => {
    let textArea = shadowDOMSearch('.mdc-text-field__input')[0];
    textArea.select();
  };

  setTimeout(routeLink, 100);
  setTimeout(() => selectTarget(targetQ), 200);
  setTimeout(selectTextArea, 100);
  // setTimeout(() => addNote(note), 1800);
}

function approveComment() {
  let submitBtn = shadowDOMSearch('div.actions > tcs-button.submit-button')[0];
  let policiesArr = Array.from(
    shadowDOMSearch('yurt-core-policy-selector-item')
  );
  let approvePolicy = policiesArr.filter(
    (policy) => policy.__policy.id === '35265'
  )[0];

  approvePolicy.click();
  setTimeout(() => submitBtn.click(), 300);
}

let comments = {
  approveComment: () => {
    let submitBtn = shadowDOMSearch(
      'div.actions > tcs-button.submit-button'
    )[0];
    let policiesArr = Array.from(
      shadowDOMSearch('yurt-core-policy-selector-item')
    );
    let approvePolicy = policiesArr.filter(
      (policy) => policy.__policy.id === '35265'
    )[0];

    approvePolicy.click();
    setTimeout(() => submitBtn.click(), 300);
  },
  routeComment: (targetQueue) => {
    let routeTargetsArr = Array.from(shadowDOMSearch('mwc-list-item'));
    let hate = routeTargetsArr.filter(
      (target) =>
        target.innerHTML.includes('Hate') &&
        target.innerHTML.includes('English')
    )[0];
    let xlang = routeTargetsArr.filter((target) =>
      target.innerHTML.includes('Xlang')
    )[0];
    let policyVertical = routeTargetsArr.filter((target) =>
      target.innerHTML.includes('policy vertical')
    )[0];
    let routeBtn = shadowDOMSearch('.submit')[0];
  },
};

let submitVid = {
  russian: () => approveVideo('russian', undefined, true),
  agnostic: () => approveVideo('agnostic', undefined, true),
  blank: () => approveVideo('', undefined, true),
  english: () => approveVideo('english', undefined, true),
};

/////////////////////////////////
//                             //
//       U T I L I T I E S     //
//                             //
/////////////////////////////////

function getQueue() {
  let queueInfo = getQueueInfo();
  return queueInfo.queueName;
}

function removeLock() {
  let LOCK = shadowDOMSearch('yurt-review-activity-dialog')[0];
  LOCK.__lockTimeoutSec = 12000;
  console.log(
    `🔐LOCK: ${
      shadowDOMSearch('yurt-review-activity-dialog')[0].__secondsToExpiry
    }`
  );
}

let taymer = (vremya, reload = false) => {
  submitVid.russian();

  TIMER_ID = setTimeout(() => {
    let submitBtn = shadowDOMSearch(
      'div.actions > tcs-button.submit-button'
    )[0];
    if (!submitBtn) {
      console.log("can't find submitBtn");
    }
    submitBtn.click();
  }, vremya * 60 * 1000);
  if (reload) {
    RELOAD_ID = setTimeout(
      window.location.reload.bind(window.location),
      // window.close,
      vremya * 60 * 1000 + 2000
    );
  }

  removeLock();
  console.log(
    `⏰ ${TIMER_ID} submitting in ${vremya} minutes ${
      reload && 'WITH RELOAD ♻'
    }(${RELOAD_ID}).\n❌ PRESS 'C' TO REMOVE.`
  );
};
