/* global shadowDOMSearch getActionInfoElement */

function approveComment() {
  setTimeout(() => {
    let polArr = Array.from(shadowDOMSearch('yurt-core-policy-selector-item'));
    let approve = polArr.filter((item) => item.__policy.id === '35265')[0];
    approve.click();
  }, 200);
  setTimeout(() => {
    var submitBtn = shadowDOMSearch('.mdc-button--unelevated')[0];
    submitBtn.click();
  }, 600);
}

document.onkeypress = (e) => {
  e = e || window.event;
  // console.log(e.keyCode);

  switch (e.keyCode) {
    case 96 || 'c':
      approveComment();
      break;
    default:
      break;
  }
};
