import CreateApplicant from '../../CreateApplicant.js';

const createApplicant = document.querySelectorAll('.js-applicant');
createApplicant.forEach((element) => new CreateApplicant(element));