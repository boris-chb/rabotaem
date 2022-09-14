function route(target, note) {
  function routeLink() {
    let routeBtn = shadowDOMSearch('.route-button')[0];
    routeBtn.click();
  }

  function selectTarget(target) {
    let target;
    let reason;
    let routeOptions = Array.from(shadowDOMSearch('mwc-list-item'));
    let [adult, gv, arabic, hate] = routeOptions.filter(
      (opt) =>
        opt.innerHTML.includes('Arabic') ||
        opt.innerHTML.includes('Graphic violence - XSource') ||
        opt.innerHTML.includes('Adult') ||
        opt.innerHTML.includes('H&')
    );
    let [lang, greyArea, policyVertical, other] = shadowDOMSearch(
      '.routing-reason'
    )[0].children;

    if (target === 'arabic') {
      target = arabic;
      reason = lang;
    } else if (target === 'gv') {
      target = gv;
      reason = policyVertical;
    } else if (target === 'hate') {
      target = hate;
      reason = policyVertical;
    } else if (target === 'adult') {
      target = adult;
      reason = policyVertical;
    }
    target.click();
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
  setTimeout(() => selectTarget(target), 300);
  setTimeout(selectTextArea, 1000);
  // setTimeout(() => addNote(note), 1800);
}

let arabic = () => route('arabic');
let gv = () => route('gv');
