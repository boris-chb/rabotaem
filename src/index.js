/* global shadowDOMSearch getActionInfoElement */
// eslint-disable no-unused-vars

const store = {
  // single source of truth
  // contains key-value pairs { timerName: timerId }
  // if a timer needs to be removed, use clearTimeout(store.timerId)`

  keepAliveTimeout(s = 10) {
    this.keepAliveId = setInterval(() => CONTINUE_BTN.click(), s * 1000);
  },
  kill() {
    clearInterval(this.keepAliveId);
  },

  resetTimers() {
    for (let [_, value] of Object.entries(this)) {
      clearTimeout(value);
      // console.log(`removed ${key}: ${value}`);
      this.value = undefined;
    }
  },
};

// Constants
let DELTA_TIME = 600; // <-- modify the timer here
let RADIO_BTN_TIMER = 1100;
let CONTINUE_BTN = shadowDOMSearch('tcs-button')[0];
let VIDEO_PLAYER = shadowDOMSearch('.ytp-cued-thumbnail-overlay-image')[0];

// Keypresses
document.onkeypress = (e) => {
  e = e || window.event;
  // console.log(e.keyCode);

  switch (e.keyCode) {
    case 99 || 'c':
      console.log(`cleaning up ${store.submitId}`);
      clearTimeout(store.submitId);
      clearTimeout(store.reloadId);
      store.submitId = undefined;
      store.reloadId = undefined;
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
    case 59:
      arabic();
      break;
    case 96 || '`':
      let submitBtn = shadowDOMSearch('.submit-button')[0];
      submitBtn.click();
      break;
    default:
      break;
  }
};

// main()
function approveVideo(language, timerMin, submit = false) {
  // clean-up timers
  // store.resetTimers();
  function myReviews() {
    let link = shadowDOMSearch('mwc-tab')[0];

    link.click();
    // console.log('my Reviews');
  }

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
    // console.log('add Review');
  }

  function approvePolicyTag() {
    let policies = Array.from(
      shadowDOMSearch('yurt-core-policy-selector-item')
    );
    let approvePolicy = policies.filter((p) => p.__policy.id === '9008')[0];
    let link = approvePolicy;

    link.click();
    // console.log('approve tag');
  }

  function unrelatedToVEOption(related = false) {
    // console.log('unrelated to VE 1');
    let options = shadowDOMSearch('mwc-formfield');
    let [no, yes, borderline] = options;
    let link = no;

    link.click();

    // console.log('unrelated to VE');
  }

  function nextQ() {
    let link = shadowDOMSearch('.next-button')[0];
    link.click();
    // console.log('next');
  }

  function questionnaireDone() {
    let link = shadowDOMSearch('.submit > tcs-button')[0];

    link.click();
    // console.log('next');
  }

  function languageDropdown() {
    let link = shadowDOMSearch(
      'div > div > span.mdc-select__selected-text-container'
    )[0];

    link.click();
    // console.log('languageDropdown');
  }

  function languageOption(language) {
    let link;
    let options = Array.from(
      shadowDOMSearch('mwc-select > mwc-list-item')
    ).filter(
      (lang) =>
        lang.value === 'Russian/Ukrainian' ||
        lang.value === 'Language agnostic' ||
        lang.value === 'English'
    );

    let [english, agnostic, russian] = options;

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
        link = agnostic;
    }

    link.click();
  }

  function selectTextArea() {
    let link;
    link = shadowDOMSearch('textarea')[0];

    console.log('text area');
    link.select();
  }

  function saveBtn() {
    let link = shadowDOMSearch(
      'div.action-buttons > tcs-button.save-button'
    )[0];

    link.click();
    // console.log('saveBtn');
  }

  function submitBtn() {
    let link = shadowDOMSearch('div.actions > tcs-button.submit-button')[0];

    // console.log('submitBtn');
    link.click();
  }

  function submitTimer(minutes = 10) {
    const ms = minutes * 60 * 1000;
    // submit
    store.submitId = setTimeout(submitBtn, ms);
    // reload window
    store.reloadId = setTimeout(
      window.location.reload.bind(window.location),
      ms + 2000
    );
    console.log(`countdown started, submitting in ${minutes} minutes`);

    // logs
    // setTimeout(() => console.log('done'), ms);
    // setTimeout(() => console.log('reload?!?!?'), ms + 2000);
  }

  // Set timer, Defaults to 10 minutes
  if (timerMin) {
    submitTimer(timerMin);
    return;
  }

  /////////////////////////////////////////////////

  const f = [
    myReviews,
    addReview,
    approvePolicyTag,
    unrelatedToVEOption,
    nextQ,
    questionnaireDone,
  ];

  store.myReviews = setTimeout(myReviews, 0);
  store.myReviews = setTimeout(addReview, DELTA_TIME - 400);
  store.approvePolicyTag = setTimeout(approvePolicyTag, DELTA_TIME - 200);
  store.unrelatedToVEOption = setTimeout(unrelatedToVEOption, RADIO_BTN_TIMER);
  store.nextQ = setTimeout(nextQ, RADIO_BTN_TIMER + 300);
  store.questionnaireDone = setTimeout(
    questionnaireDone,
    RADIO_BTN_TIMER + 500
  );

  if (language) {
    store.languageDropdown = setTimeout(
      languageDropdown,
      RADIO_BTN_TIMER + 700
    );
    store.languageOption = setTimeout(
      () => languageOption(language),
      RADIO_BTN_TIMER + 900
    );
  }

  setTimeout(selectTextArea, RADIO_BTN_TIMER + 1200);

  // store.saveBtn = setTimeout(saveBtn, RADIO_BTN_TIMER + 1000);

  // store.submitId = setTimeout(submitBtn, RADIO_BTN_TIMER + 1200);

  // store.videoPlayer = setTimeout(
  //   () => VIDEO_PLAYER.click(),
  //   RADIO_BTN_TIMER + 3000
  // );

  // setTimeout(selectTextArea, 1200);

  if (submit) {
    // store.submitId = setTimeout(submitBtn, RADIO_BTN_TIMER + 1400);
  }

  ////////////////////////////////////////////////////////////////////
}

// Shortcuts to be used as 'russian()' in the console.
let russian = () => approveVideo('russian');
let agnostic = () => approveVideo('agnostic');
let approve = () => approveVideo();
let english = () => approveVideo('english');

let submitVid = {
  russian: () => approveVideo('russian', undefined, true),
  agnostic: () => approveVideo('agnostic', undefined, true),
  blank: () => approveVideo('', undefined, true),
  english: () => approveVideo('english', undefined, true),
};

let taymer = (vremya, lang = '') => approveVideo(lang, vremya);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// let intervalId;
// let start = () => (intervalId = setInterval(() => continueBtn.click(), 10000));
// let kill = () => clearInterval(intervalId);
//
//
//
//
//

// route:

//
//
//
//
function route(targetQueue, note) {
  function routeLink() {
    let routeLink = document
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
      .shadowRoot.querySelector('yurt-core-decision-submit-panel')
      .shadowRoot.querySelector('div.actions > tcs-button.route-button');

    routeLink.click();
  }

  function targetDropdown() {
    let targetDropdown = document
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
      .shadowRoot.querySelector('yurt-core-decision-route')
      .shadowRoot.querySelector('div:nth-child(3) > paper-dropdown-menu')
      .shadowRoot.querySelector('#menuButton > div');

    targetDropdown.click();
  }

  function chooseTarget(target) {
    let targetLink;
    let dropdownOptions = {
      gv: document
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
        .shadowRoot.querySelector('yurt-core-decision-route')
        .shadowRoot.querySelector(
          'div:nth-child(3) > paper-dropdown-menu > div > paper-listbox > mwc-list-item:nth-child(4)'
        ),
      arabic: document
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
        .shadowRoot.querySelector('yurt-core-decision-route')
        .shadowRoot.querySelector(
          'div:nth-child(3) > paper-dropdown-menu > div > paper-listbox > mwc-list-item:nth-child(15)'
        ),
      hate: document
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
        .shadowRoot.querySelector('yurt-core-decision-route')
        .shadowRoot.querySelector(
          'div:nth-child(3) > paper-dropdown-menu > div > paper-listbox > mwc-list-item:nth-child(6)'
        ),
    };

    if (target === 'arabic') {
      targetLink = dropdownOptions.arabic;
    } else if (target === 'gv') {
      targetLink = dropdownOptions.gv;
    } else if (target === 'hate') {
      targetLink = dropdownOptions.hate;
    } else {
      targetLink = dropdownOptions.arabic;
    }
    targetLink.click();
  }

  function reasonDropdown() {
    let reasonDropdown = document
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
      .shadowRoot.querySelector('yurt-core-decision-route')
      .shadowRoot.querySelector('div:nth-child(4) > mwc-select')
      .shadowRoot.querySelector('div > div');

    reasonDropdown.click();
  }

  function chooseReason(targetQueue) {
    let targetLink;
    let dropdownOptions = {
      vertical: document
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
        .shadowRoot.querySelector('yurt-core-decision-route')
        .shadowRoot.querySelector(
          'div:nth-child(4) > mwc-select > mwc-list-item:nth-child(3)'
        ),
      language: document
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
        .shadowRoot.querySelector('yurt-core-decision-route')
        .shadowRoot.querySelector(
          'div:nth-child(4) > mwc-select > mwc-list-item:nth-child(1)'
        ),
    };

    if (targetQueue === 'arabic') {
      targetLink = dropdownOptions.language;
    } else {
      targetLink = dropdownOptions.vertical;
    }

    targetLink.click();
  }

  function addNote(note) {
    let notesArea = document
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
      .shadowRoot.querySelector('yurt-core-decision-route')
      .shadowRoot.querySelector('div:nth-child(5) > mwc-textarea')
      .shadowRoot.querySelector('label > textarea');
    notesArea.select();
    // notesArea.value += note;
  }

  function handleRoute() {
    let routeBtn = document
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
      .shadowRoot.querySelector('yurt-core-decision-route')
      .shadowRoot.querySelector(
        'div.action-buttons > tcs-button.primary.submit'
      )
      .shadowRoot.querySelector('mwc-button')
      .shadowRoot.querySelector('#button');

    routeBtn.click();
  }

  const selectTextArea = () => {
    let textArea = document
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
      .shadowRoot.querySelector('yurt-core-decision-route')
      .shadowRoot.querySelector('div:nth-child(5) > mwc-textarea')
      .shadowRoot.querySelector('label > textarea');

    textArea.select();
  };

  setTimeout(routeLink, 100);
  setTimeout(targetDropdown, 400);
  setTimeout(() => chooseTarget(targetQueue), 700);
  setTimeout(reasonDropdown, 1200);
  setTimeout(() => chooseReason(targetQueue), 1500);
  // setTimeout(() => addNote(note), 1800);
}

let arabic = () => route('arabic');
let gv = () => route('gv');

// setTimeout(() => notesArea.select(), 2000);
// setTimeout(() => (notesArea.value += 1), 3000);
// setTimeout(() => (notesArea.value += 2), 3000);
// setTimeout(() => (notesArea.value += 3), 3000);
// setTimeout(() => (notesArea.value += 4), 3000);
// setTimeout(() => (notesArea.value += 5), 3000);
