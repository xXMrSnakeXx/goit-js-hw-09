const refs = {
  btnStart: document.querySelector(`[data-start]`),
  btnStop: document.querySelector(`[data-stop]`),
};
let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
refs.btnStart.addEventListener(`click`, onBtnStartClick);
refs.btnStop.addEventListener(`click`, onBtnStopClick);

refs.btnStop.disabled = true;

function onBtnStartClick() {
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
}
function onBtnStopClick() {
  clearInterval(intervalId);
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;
}
