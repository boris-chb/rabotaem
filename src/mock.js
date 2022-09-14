/* global shadowDOMSearch getActionInfoElement */
// eslint-disable no-unused-vars

function languageDropdown() {
  let langMenu = shadowDOMSearch(
    'div > div > span.mdc-select__selected-text-container'
  );

  if (!langMenu) {
    console.log('[recursion] lang dropdown');
    setTimeout(languageDropdown, 500);
    return;
  }

  // get element from NodeList
  let link = langMenu[0];
  link.click();
  // console.log('languageDropdown');
}

let addNote = (note) => {
  // adds the note to object being parsed
  let policyCard = shadowDOMSearch('yurt-core-decision-policy-card')[0];
  // adds note to the UI DOM element
  let noteElement = shadowDOMSearch(
    'yurt-core-decision-card-row:nth-child(3) > div'
  )[0];

  policyCard.__annotation.notes = note;
  noteElement.innerText = note;
};
