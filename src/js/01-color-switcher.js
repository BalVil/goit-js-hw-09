const btnStartRef = document.querySelector('button[data-start]');
const btnStopRef = document.querySelector('button[data-stop]');

btnStartRef.addEventListener('click', onStartBtnClick);

function onStartBtnClick(evt) {
  console.log('click');
}
