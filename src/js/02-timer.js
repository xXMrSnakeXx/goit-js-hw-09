import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  inputDate: document.querySelector(`#datetime-picker`),
  btnStart: document.querySelector(`[data-start]`),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (currentDate > selectedDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    refs.btnStart.disabled = false;
  },
};

const datePicker = flatpickr(refs.inputDate, options);

refs.btnStart.addEventListener(`click`, timer);

function timer() {
  refs.btnStart.disabled = true;
  refs.inputDate.disabled = true;
  const intervalId = setInterval(() => {
    const currentTime = new Date();
    const startTime = datePicker.selectedDates[0];
    const deltaTime = startTime - currentTime;

    if (deltaTime < 0) {
      clearInterval(intervalId);
      refs.btnStart.disabled = true;
      refs.inputDate.disabled = false;
      return;
    }

    const timeComponents = convertMs(deltaTime);
    updateTimerInterface(timeComponents);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function updateTimerInterface({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

const timerEl = document.querySelector(`.timer`);
timerEl.style.display = 'flex';
timerEl.style.marginTop = '30px';
timerEl.style.width = '330px';
timerEl.style.justifyContent = 'space-between';
