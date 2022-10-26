class FastSearchFunctional {
  constructor(domParent) {
    this.container = domParent;
    this.init();
  }

  init() {
    this.initElements();
    this.initEvents();
  }

  initElements() {
    this.name = this.container.querySelector(".js-name");
    this.profession = this.container.querySelector('.js-profession');
    this.whoAdded = this.container.querySelector('.js-who-added');
    this.applicants = document.querySelectorAll('.js-about-applicant');
    this.countVacancy = document.querySelector('.js-all-active-vacancy');
  }

  initEvents() {
    this.name.addEventListener('keyup', this.handleKeyUpName.bind(this));
    this.profession.addEventListener('keyup', this.handleKeyUpProfession.bind(this));
    this.whoAdded.addEventListener('keyup', this.handleKeyUpWhoAdded.bind(this));
  }

  handleKeyUpWhoAdded(event) {
    const currenVal = String(event.target.value).toLowerCase();
    this.applicants.forEach((el) => {
      const text = String(
        el.querySelector(".js-who-added").textContent
      ).toLowerCase();
      const split = text.split(" ");

      if (split[0].indexOf(currenVal) == 0) {
        el.classList.remove("about-applicant_hidden");
      } else {
        el.classList.add("about-applicant_hidden");
      }
    });
  }

  handleKeyUpProfession(event) {
    const currenVal = String(event.target.value).toLowerCase();
    this.applicants.forEach((el) => {
      const text = String(
        el.querySelector(".js-response").textContent
      ).toLowerCase();
      const split = text.split(" ");

      if (split[0].indexOf(currenVal) == 0) {
        el.classList.remove("about-applicant_hidden");
      } else {
        el.classList.add("about-applicant_hidden");
      }
    });
  }

  handleKeyUpName(event) {
    const currenVal = String(event.target.value).toLowerCase();
    let countVacancy = 0;
    
    this.applicants.forEach((el) => {
      const text = String(
        el.querySelector(".js-name").textContent
      ).toLowerCase();
      const split = text.split(" ");

      const haveName = 
        split[0].indexOf(currenVal) == 0
        || split[1].indexOf(currenVal) == 0;

      if (haveName) {
        el.classList.remove("about-applicant_hidden");
        countVacancy += 1;
      } else {
        el.classList.add("about-applicant_hidden");
      }
    });

    this.countVacancy.textContent = countVacancy;
  }
}

export default FastSearchFunctional;
