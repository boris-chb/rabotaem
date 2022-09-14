function setCountdown(m, btnType = 'Logout') {
  let ms = m * 60 * 1000;
  let btnArr = Array.from(document.getElementsByClassName('button3'));
  let btn;
  if (btnType === 'Logout') {
    btn = btnArr.filter((btn) => btn.innerHTML.includes('Logout'))[0];
  } else if (btnType === 'Break') {
    btn = btnArr.filter((btn) => btn.innerHTML.includes('Break'))[0];
  } else if (btnType === 'Lunch') {
    btn = btnArr.filter((btn) => btn.innerHTML.includes('Lunch'))[0];
  }
  console.log(new Date());
  return setTimeout(() => btn.click(), ms);
}
