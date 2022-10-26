import StartPopup from './StartPopup.js';

const startPopup = document.querySelectorAll('.js-start-popup');
startPopup.forEach((element) => new StartPopup(element));