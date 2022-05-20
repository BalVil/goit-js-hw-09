const startBtnRef = document.querySelector('button[data-start]');
const stopBtnRef = document.querySelector('button[data-stop]');
const PROMPT_DELAY = 1000;
let timerId = null;

startBtnRef.addEventListener('click', onStartBtnClick);
stopBtnRef.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  startBtnRef.setAttribute('disabled', true);
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, PROMPT_DELAY);
}

function onStopBtnClick() {
  startBtnRef.removeAttribute('disabled');
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
