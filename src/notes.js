const setNote = (note) => {
  let outputObj = getOutputObjects();
  outputObj.actionObj.notes = note;
};

// setNote('pidar');

// POCKET SME code snippet
getActionInfoElement();
let notes = getActionInfoElement().__yo.notes;
notes =
  'Content uploaded N/A , Violation Prong: Approve @ , , N/A (IDs: , APPROVE , 9008 ). MEDIA TYPE: Other . $Russian$';

function addNote() {
  let actionInfoElem = getActionInfoElement();
  let notes = actionInfoElem.__ai[0].notes;
  console.log('actionInfoElem.__ai[0].notes', notes);
  if (actionInfoElem.__ai[0].notes === '') {
    actionInfoElem.__ai[0].notes =
      'Content uploaded N/A , Violation Prong: Approve @ , , N/A (IDs: , APPROVE , 9008 ). MEDIA TYPE: Other . $Russian$';
    console.log('after', actionInfoElem.__ai[0].notes);
  }
}
