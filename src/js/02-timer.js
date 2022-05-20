import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtnRef = document.querySelector('button[data-start]');

const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

let selectedTime = null;
startBtnRef.setAttribute('disabled', true);

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedTime = selectedDates[0].getTime();
    const currentTime = Date.now();

    if (currentTime > selectedTime) {
      Notify.failure('Please choose a date in the future');
    } else {
      startBtnRef.removeAttribute('disabled');
    }
  },
});

const timer = {
  intervalID: null,
  isActive: false,

  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    startBtnRef.setAttribute('disabled', true);

    this.intervalId = setInterval(() => {
      let deltaTime = selectedTime - Date.now();
      const time = convertMs(deltaTime);
      updateClockFace(time);

      if (deltaTime < 999) {
        clearInterval(this.intervalId);
      }
    }, 1000);
  },
};

startBtnRef.addEventListener('click', () => {
  timer.start();
});

function updateClockFace({ days, hours, minutes, seconds }) {
  daysRef.innerHTML = days;
  hoursRef.innerHTML = hours;
  minutesRef.innerHTML = minutes;
  secondsRef.innerHTML = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
