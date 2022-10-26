import Filters from './Filters.js';

const filters = document.querySelectorAll('.js-filter');
filters.forEach((element) => new Filters(element));