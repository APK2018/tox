import FilterCalendar from './FilterCalendar.js';

const createFilterCalendar = document.querySelectorAll('.js-calendar-filter');
createFilterCalendar.forEach((element) => new FilterCalendar(element));