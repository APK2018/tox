import template from "./utils/template-applicant.js";
import templateComment from "./utils/template-comments.js";
import Filters from "./blocks/filters/Filters.js";
import FastSearchFunctional from "./blocks/fast-search/FastSearchFunctional.js";

class CreateApplicant {
  constructor(domParent) {
    this.container = domParent;
    this.init();
  }

  init() {
    fetch("applicant-information.json")
      .then((response) => response.json())
      .then((json) => this.createTemplate(json));
  }

  initElements() {
    this.countVacancy = document.querySelector(".js-all-active-vacancy");
    this.applicants = this.container.querySelectorAll(".js-about-applicant");
    this.addBlackList = this.container.querySelectorAll(".js-add-black-list");
    this.addFavorite = this.container.querySelectorAll(".js-add-favorite");
    this.favoriteText = this.container.querySelector(".js-favorite-text");
    this.favoriteTab = this.container.querySelector(".js-favorite-tab");
    this.filter = this.container.querySelectorAll(".js-filter");
    this.offline = this.container.querySelector(".js-offline");
    this.favoriteIcon = this.container.querySelector(".js-favorite-icon");
    this.online = this.container.querySelector(".js-online");
    this.blackListTab = this.container.querySelector(".js-add-black-list-tab");
    this.commentsContainer = this.container.querySelector(
      ".js-comments-container"
    );
    this.popUpClose = this.container.querySelectorAll(".js-popup-close");
    this.popUpCancel = this.container.querySelectorAll(".js-popup-btn-cancel");
    this.photoApplicant = this.container.querySelector(".js-photo-applicant");
  }

  initEvents() {
    this.moreSkillView = this.container.querySelectorAll(".js-more-skills");

    this.addBlackList.forEach((el) => {
      el.addEventListener("click", this.handleClickBlackList.bind(this));
    });
    this.addFavorite.forEach((el) => {
      el.addEventListener("click", this.handleClickFavorite.bind(this));
    });
    this.moreSkillView.forEach((el) => {
      el.addEventListener("click", this.handleClickMoreSkills.bind(this));
    });
  }

  handleClickPhoto(event) {
    let megaDivForImg = document.createElement("div");
    let megaImg = document.createElement("img");
    let closeImg = document.createElement("div");
    let coverImg = document.createElement("div");

    megaDivForImg.classList.add("js-mega-div-image");
    closeImg.classList.add("js-close-mega-img");
    megaImg.classList.add("js-mega-image-view");
    coverImg.classList.add("js-cover-mega-img");

    megaImg.src = `${event.currentTarget.src}`;

    event.currentTarget.parentElement.prepend(megaDivForImg);
    megaDivForImg.prepend(closeImg);
    megaDivForImg.prepend(megaImg);
    event.currentTarget.parentElement.prepend(coverImg);

    closeImg.addEventListener("click", () => {
      megaDivForImg.parentElement.parentElement
        .querySelector(".js-cover-mega-img")
        .remove();
      megaDivForImg.parentElement.parentElement
        .querySelector(".js-mega-div-image")
        .remove();
    });
  }

  handleClickMoreSkills(event) {
    if (
      event.currentTarget
        .querySelector(".js-all-skills-tab")
        .classList.contains("about-applicant__all-skills-tab_show")
    ) {
      event.currentTarget
        .querySelector(".js-all-skills-tab")
        .classList.remove("about-applicant__all-skills-tab_show");
    } else {
      event.currentTarget
        .querySelector(".js-all-skills-tab")
        .classList.add("about-applicant__all-skills-tab_show");
    }
  }

  handleClickBlackList(event) {
    if (event.currentTarget.classList.contains("active-list")) {
      event.currentTarget.classList.remove("active-list");
      event.currentTarget
        .querySelector(".js-add-black-list-icon")
        .classList.remove("about-applicant__icon-active");
      event.currentTarget.querySelector(".js-add-black-list-text").textContent =
        "Добавить в черный список";
      event.currentTarget.querySelector(".js-add-black-list-tab").textContent =
        "Добавить в черный список";
      event.currentTarget.setAttribute("data-select-favorite", "");
    } else {
      event.currentTarget.classList.add("active-list");
      event.currentTarget.querySelector(".js-add-black-list-text").textContent =
        "Убрать из черного списка";
      event.currentTarget.querySelector(".js-add-black-list-tab").textContent =
        "Убрать из черного списка";
      event.currentTarget.setAttribute("data-select-favorite", "selected");
      event.currentTarget
        .querySelector(".js-add-black-list-icon")
        .classList.add("about-applicant__icon-active");
    }
  }

  handleClickFavorite(event) {
    if (event.currentTarget.classList.contains("active-list")) {
      event.currentTarget.classList.remove("active-list");
      event.currentTarget
        .querySelector(".js-favorite-icon")
        .classList.remove("about-applicant__icon-active");

      event.currentTarget.querySelector(".js-favorite-text").textContent =
        "Добавить в избранное";
      event.currentTarget.querySelector(".js-favorite-tab").textContent =
        "Добавить в избранное";
      event.currentTarget.setAttribute("data-select-favorite", "");
    } else {
      event.currentTarget
        .querySelector(".js-favorite-icon")
        .classList.add("about-applicant__icon-active");
      event.currentTarget.classList.add("active-list");
      event.currentTarget.querySelector(".js-favorite-text").textContent =
        "Убрать из избранного";
      event.currentTarget.querySelector(".js-favorite-tab").textContent =
        "Убрать из избранного";
      event.currentTarget.setAttribute("data-select-favorite", "selected");
    }
  }

  createTemplate(json) {
    this.countApplicant = json.length;

    for (let count = 0; count < this.countApplicant; count++) {
      let applicant = document.createElement("div");
      applicant.classList.add("about-applicant__container-applicant");
      this.container.prepend(applicant);
      applicant.innerHTML = template;
    }

    this.initElements();
    this.fillElements(json);

    const fastSearch = document.querySelectorAll(".js-fast-search-functional");
    fastSearch.forEach((element) => new FastSearchFunctional(element));

    this.initEvents();
    this.filter.forEach((element) => new Filters(element));
  }

  fillElements(json) {
    let count = 0;
    let countSkills = 0;
    const templateSkills = `
      <span class="about-applicant__skills js-skills"></span>
      <span class="about-applicant__skills-date js-skills-date"></span>
    `;
    const templateSkillsTab = `
      <div class="about-applicant__more-skills-tab">Больше...</div>
      <div class="about-applicant__all-skills-tab js-all-skills-tab"></div>
    `;
    this.countVacancy.textContent = json.length;

    this.applicants.forEach((el) => {
      const haveComments =
        json[count].comments[0] !== undefined &&
        json[count].comments[0] !== null;

      el.querySelector(".js-name").textContent = json[count].name;
      el.querySelector(".js-status").textContent = json[count].status;

      json[count].skills.forEach((e) => {
        let skills = document.createElement("div");
        let skillTab = document.createElement("div");
        const skillInfo = `${e.profession} ${e.date}`;
        countSkills += 1;

        skillTab.classList.add("about-applicant__skills-tab");
        skillTab.textContent = skillInfo;

        skills.classList.add("about-applicant__skills-in");
        skills.setAttribute("data-skill", e.profession);
        skills.setAttribute("data-skill-date", e.date);
        el.querySelector(".js-skills-container").prepend(skills);
        skills.innerHTML = templateSkills;
        skills.append(skillTab);

        if (skillInfo.length > 19) {
          skills.querySelector(".js-skills").textContent = e.profession.slice(
            0,
            17
          );
        } else {
          skills.querySelector(".js-skills").textContent = e.profession;
          skills.querySelector(".js-skills-date").textContent = e.date;
        }

        if (countSkills > 3) {
          skills.classList.add("about-applicant__skills-in_hidden");
        }
      });

      if (countSkills > 3) {
        const moreSkills = document.createElement("span");
        moreSkills.classList.add("js-more-skills");
        moreSkills.classList.add("about-applicant__more-skills-container");
        moreSkills.innerHTML = templateSkillsTab;

        el.querySelector(".js-skills-container").prepend(moreSkills);

        json[count].skills.forEach((e) => {
          const text = `${e.profession} ${e.date}`;
          const skillsTab = document.createElement("div");
          skillsTab.classList.add("about-applicant__skill-tab");

          moreSkills.querySelector(".js-all-skills-tab").append(skillsTab);
          skillsTab.textContent = text;
        });
      }

      countSkills = 0;

      const lengthResponse = `${json[count].response.profession} ${json[count].response.date}`;

      if (json[count].response.profession.length > 12) {
        el.querySelector(".js-response").textContent = lengthResponse.slice(
          0,
          12
        );
      } else {
        el.querySelector(".js-response").textContent = lengthResponse.slice(
          0,
          13
        );
      }

      el.querySelector(".js-response-tab").textContent = lengthResponse;
      el.querySelector(".js-response").setAttribute(
        "data-inform",
        json[count].response.profession
      );

      if (
        json[count].favorite.toLowerCase() === "в черном списке" ||
        json[count].favorite.toLowerCase() === "в чёрном списке"
      ) {
        el.querySelector(".js-add-black-list").setAttribute(
          "data-select-favorite",
          "selected"
        );
        el.querySelector(".js-add-black-list").classList.add("active-list");
        el
          .querySelector(".js-add-black-list")
          .querySelector(".js-add-black-list-text").textContent =
          "Убрать из черного списка";
        el
          .querySelector(".js-add-black-list")
          .querySelector(".js-add-black-list-tab").textContent =
          "Убрать из черного списка";
        el.querySelector(".js-add-black-list").setAttribute(
          "data-select-favorite",
          "selected"
        );
        el.querySelector(".js-add-black-list")
          .querySelector(".js-add-black-list-icon")
          .classList.add("about-applicant__icon-active");
      }

      if (json[count].favorite.toLowerCase() === "в избранном") {
        el.querySelector(".js-add-favorite").setAttribute(
          "data-select-favorite",
          "selected"
        );
        el.querySelector(".js-add-favorite")
          .querySelector(".js-favorite-icon")
          .classList.add("about-applicant__icon-active");
        el.querySelector(".js-add-favorite").classList.add("active-list");
        el
          .querySelector(".js-add-favorite")
          .querySelector(".js-favorite-text").textContent =
          "Убрать из избранного";
        el
          .querySelector(".js-add-favorite")
          .querySelector(".js-favorite-tab").textContent =
          "Убрать из избранного";
        el.querySelector(".js-add-favorite").setAttribute(
          "data-select-favorite",
          "selected"
        );
      }

      el.querySelector(".js-birthday").textContent = json[count].birthday;

      const zodiacBirthday = new Date(
        `2000-${json[count].birthday.split(".")[1]}-${
          json[count].birthday.split(".")[0]
        }`
      );
      const yearApplicant = `${json[count].birthday.split(".")[2]}-${
        json[count].birthday.split(".")[1]
      }-${json[count].birthday.split(".")[0]}`;

      const kozerog1 = new Date("2000-12-22");
      const kozerog2 = new Date("2000-01-20");

      const vodoley1 = new Date("2000-01-21");
      const vodoley2 = new Date("2000-02-18");

      const fish1 = new Date("2000-02-19");
      const fish2 = new Date("2000-03-20");

      const oven1 = new Date("2000-03-21");
      const oven2 = new Date("2000-04-19");

      const telec1 = new Date("2000-04-24");
      const telec2 = new Date("2000-05-20");

      const bliz1 = new Date("2000-05-21");
      const bliz2 = new Date("2000-06-21");

      const rak1 = new Date("2000-06-22");
      const rak2 = new Date("2000-07-22");

      const lev1 = new Date("2000-07-23");
      const lev2 = new Date("2000-08-22");

      const deva1 = new Date("2000-08-23");
      const deva2 = new Date("2000-09-22");

      const ves1 = new Date("2000-09-23");
      const ves2 = new Date("2000-10-22");

      const scorp1 = new Date("2000-10-24");
      const scorp2 = new Date("2000-11-22");

      const strelec1 = new Date("2000-11-23");
      const strelec2 = new Date("2000-12-21");

      if (zodiacBirthday <= kozerog2 && zodiacBirthday >= kozerog1) {
        el.querySelector(".js-zodiac").textContent = "Козерог";
      }

      if (zodiacBirthday <= vodoley2 && zodiacBirthday >= vodoley1) {
        el.querySelector(".js-zodiac").textContent = "Водолей";
      }

      if (zodiacBirthday <= fish2 && zodiacBirthday >= fish1) {
        el.querySelector(".js-zodiac").textContent = "Рыбы";
      }

      if (zodiacBirthday <= oven2 && zodiacBirthday >= oven1) {
        el.querySelector(".js-zodiac").textContent = "Овен";
      }

      if (zodiacBirthday <= telec2 && zodiacBirthday >= telec1) {
        el.querySelector(".js-zodiac").textContent = "Телец";
      }

      if (zodiacBirthday <= bliz2 && zodiacBirthday >= bliz1) {
        el.querySelector(".js-zodiac").textContent = "Близнецы";
      }

      if (zodiacBirthday <= rak2 && zodiacBirthday >= rak1) {
        el.querySelector(".js-zodiac").textContent = "Раки";
      }

      if (zodiacBirthday <= lev2 && zodiacBirthday >= lev1) {
        el.querySelector(".js-zodiac").textContent = "Лев";
      }

      if (zodiacBirthday <= deva2 && zodiacBirthday >= deva1) {
        el.querySelector(".js-zodiac").textContent = "Дева";
      }

      if (zodiacBirthday <= ves2 && zodiacBirthday >= ves1) {
        el.querySelector(".js-zodiac").textContent = "Весы";
      }

      if (zodiacBirthday <= scorp2 && zodiacBirthday >= scorp1) {
        el.querySelector(".js-zodiac").textContent = "Скорпион";
      }

      if (zodiacBirthday <= strelec2 && zodiacBirthday >= strelec1) {
        el.querySelector(".js-zodiac").textContent = "Стрелец";
      }

      let ageApplicant = String(
        (new Date().getTime() - new Date(yearApplicant)) /
          (24 * 3600 * 365.25 * 1000)
      ).split(".")[0];

      el.querySelector(".js-age").textContent = `
        ${ageApplicant}
      `;

      ageApplicant = Number(ageApplicant);
      const textForms = ["год", "года", "лет"];
      let resultAge = "";

      const checkEndingValue = Math.abs(ageApplicant) % 100;
      const resEndingNumber = checkEndingValue % 10;

      const isEndValueCorrectSize =
        checkEndingValue > 10 && checkEndingValue < 20;
      const isResCorrectSize = resEndingNumber > 1 && resEndingNumber < 5;

      if (isEndValueCorrectSize) {
        resultAge = `${ageApplicant} ${textForms[2]}`;
      }

      if (isResCorrectSize) {
        resultAge = `${ageApplicant} ${textForms[1]}`;
      }

      if (resEndingNumber === 1) {
        resultAge = `${ageApplicant} ${textForms[0]}`;
      }

      if (
        !isEndValueCorrectSize &&
        !isResCorrectSize &&
        !(resEndingNumber === 1)
      ) {
        resultAge = `${ageApplicant} ${textForms[2]}`;
      }

      el.querySelector(".js-age").textContent = resultAge;
      el.querySelector(".js-phone-number").textContent = json[count].phone;
      el.querySelector(".js-phone-region").textContent = json[count][
        "phone-region"
      ].slice(0, 13);

      el.querySelector(".js-phone-region-tab").textContent =
        json[count]["phone-region"];
      el.querySelector(".js-operator-photo").src =
        json[count]["operator-photo"].src;
      el.querySelector(".js-operator-photo").alt =
        json[count]["operator-photo"].alt;
      el.querySelector(".js-region-live").textContent =
        json[count]["live-region"];
      el.querySelector(".js-district-live").textContent =
        json[count]["live-district"].split(" ")[0];
      el.querySelector(".js-district-live-2").textContent =
        json[count]["live-district"].split(" ")[1];
      el.querySelector(".js-who-added").textContent = json[count]["who-append"];

      if (json[count].online.toLowerCase() === "онлайн") {
        el.querySelector(".js-online").textContent = json[count].online;
        el.querySelector(".js-online").classList.add("show");
      } else {
        el.querySelector(".js-offline").classList.add("show");
        el.querySelector(".js-offline-date").textContent = json[count].online;
      }

      el.querySelector(".js-operator").textContent =
        json[count]["phone-operator"];
      el.querySelector(".js-resource-upload").textContent =
        json[count]["resource-upload"];
      el.querySelector(".js-date-upload").textContent =
        json[count]["date-upload"];
      el.querySelector(".js-photo-applicant").src = json[count].photo.src;
      el.querySelector(".js-photo-applicant").alt = json[count].photo.alt;

      if (haveComments) {
        this.commentsContainer
          .querySelector(".js-added-comments")
          .classList.add("js-added-comments_hidden");
        let counterComments = 0;

        json[count].comments.forEach((el) => {
          counterComments += 1;

          let applicant = document.createElement("div");
          applicant.classList.add("about-applicant__comments-in");

          // if (counterComments > 2) {
          //   applicant.classList.add("about-applicant__comments-in_hidden");
          // }

          this.commentsContainer.append(applicant);
          applicant.innerHTML = templateComment;

          applicant
            .querySelector(".js-comment-text")
            .setAttribute("data-comment-text", el.text);
          applicant.querySelector(".js-comment-text-tab").textContent = el.text;
          applicant.querySelector(".js-comment-text-date").textContent =
            el.date;
          applicant.querySelector(
            ".js-comment-text"
          ).textContent = `${el.text.slice(0, 25)}...`;
        });
      }

      el.querySelector(".js-redacting-status").addEventListener(
        "click",
        this.handleClickRedactingStatus.bind(this)
      );
      this.handleClickRedactingStatus.bind(this);
      el.querySelector(".js-popup-btn-apply").addEventListener(
        "click",
        this.handleClickPopupBtnApply.bind(this)
      );
      this.popUpClose.forEach((el) => {
        el.addEventListener("click", this.handleClickPopUpClose.bind(this));
      });
      this.popUpCancel.forEach((el) => {
        el.addEventListener("click", this.handleClickCancel.bind(this));
      });
      count += 1;
    });

    document.querySelectorAll(".js-photo-applicant").forEach((el) => {
      el.addEventListener("click", this.handleClickPhoto.bind(this));
    });

    document.querySelectorAll(".js-added-comments").forEach((el) => {
      el.addEventListener("click", this.addNewComment.bind(this));
    });

    document.querySelectorAll(".js-added-comments-too").forEach((el) => {
      el.addEventListener("click", this.addCommentToo.bind(this));
    });

    document.querySelectorAll('.js-redacting').forEach((el) => {
      el.addEventListener('click', this.redactComment.bind(this));
    })
  }

  addCommentToo(event) {
    const applicatStatus =
      event.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(
        ".js-status"
      );
    event.currentTarget.parentElement.parentElement.parentElement
      .querySelector(".js-add-new-comment-popop-container")
      .classList.add("js-add-new-comment-popop-container_show");

    event.currentTarget.parentElement.parentElement.parentElement
      .querySelector(".js-popup-cover-add-comment")
      .classList.add("about-applicant__popup-cover_show");

    const status =
      event.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement
        .querySelector(".js-status")
        .textContent.toLowerCase();

    if (status === "безработный" || status === "безработная") {
      event.currentTarget.parentElement.parentElement.parentElement.querySelector(
        ".js-add-comment-not-work"
      ).checked = true;
    }

    if (status === "работаю, но активно ищу работу") {
      event.currentTarget.parentElement.parentElement.parentElement.parentElement.querySelector(
        ".js-add-comment-have-work"
      ).checked = true;
    }

    event.currentTarget.parentElement.parentElement.parentElement
      .querySelector(".js-add-new-comment-btn-apply")
      .addEventListener("click", (event) => {
        if (
          event.currentTarget.parentElement.querySelector(
            ".js-add-comment-not-work"
          ).checked === true
        ) {
          applicatStatus.textContent = "Безработный";
        }

        if (
          event.currentTarget.parentElement.querySelector(
            ".js-add-comment-have-work"
          ).checked === true
        ) {
          applicatStatus.textContent = "Работаю, но аквтивно ищу работу";
        }

        if (
          event.currentTarget.parentElement.querySelector(
            ".js-add-new-comment-input"
          ).value !== ""
        ) {
          let text = event.currentTarget.parentElement.querySelector(
            ".js-add-new-comment-input"
          ).value;
          let containerDate = new Date();
          let dateArray = containerDate.toISOString().split("T")[0].split("-");
          let minutes = [
            containerDate.getHours(),
            containerDate.getMinutes(),
            containerDate.getSeconds(),
          ]
            .map(function (x) {
              return x < 10 ? "0" + x : x;
            })
            .join(":")
            .split(":");
          let resultDate = `${dateArray[2]}.${dateArray[1]}.${dateArray[0]} ${minutes[0]}:${minutes[1]}`;

          let applicant = document.createElement("div");
          applicant.classList.add("about-applicant__comments-in");

          event.currentTarget.parentElement.parentElement.append(applicant);
          applicant.innerHTML = templateComment;

          applicant
            .querySelector(".js-comment-text")
            .setAttribute("data-comment-text", text);
          applicant.querySelector(".js-comment-text-tab").textContent = text;
          applicant.querySelector(".js-comment-text-date").textContent =
            resultDate;

          if (text.length > 25) {
            applicant.querySelector(
              ".js-comment-text"
            ).textContent = `${text.slice(0, 23)}...`;
          } else {
            applicant.querySelector(".js-comment-text").textContent = `${text}`;
          }

          event.currentTarget.parentElement.classList.remove(
            "js-add-new-comment-popop-container_show"
          );

          event.currentTarget.parentElement.parentElement.parentElement
            .querySelector(".js-popup-cover-add-comment")
            .classList.remove("about-applicant__popup-cover_show");

          event.currentTarget.parentElement.parentElement.querySelector(
            ".js-add-new-comment-input"
          ).value = "";
        }
      });

    event.currentTarget.parentElement.parentElement.parentElement
      .querySelector(".js-popup-close-add-comment")
      .addEventListener("click", (event) => {
        event.currentTarget.parentElement.parentElement.classList.remove(
          "js-add-new-comment-popop-container_show"
        );

        event.currentTarget.parentElement.parentElement.parentElement
          .querySelector(".js-popup-cover-add-comment")
          .classList.remove("about-applicant__popup-cover_show");
      });
  }

  redactComment(event) {
    // const container = document.createElement("div");
    // container.classList.add("js-container-add-comment-too-popup");

    // const title = document.createElement("div");
    // title.classList.add("add-new-comment__title");

    // const hr = document.createElement("hr");
    // hr.classList.add("hr-add-comment");

    // const statusApplicantContainer = document.createElement("div");
    // statusApplicantContainer.classList.add("status-applicant-add-comment-container");

    // const statusApplCommnet = document.createElement('div');
    // statusApplCommnet.classList.add('status-applicant-redact-comment');

    // const firstRadioContainer = document.createElement('div');
    // firstRadioContainer.classList.add('about-applicant__popup-radio-container');

    // container.append(title);
    // container.append(hr);
    // container.append(statusApplicantContainer);

    container.append();

    event.currentTarget.parentElement.append(container);
  }

  addNewComment(event) {
    const applicatStatus =
      event.currentTarget.parentElement.parentElement.parentElement.querySelector(
        ".js-status"
      );
    event.currentTarget.parentElement
      .querySelector(".js-add-new-comment-popop-container")
      .classList.add("js-add-new-comment-popop-container_show");

    event.currentTarget.parentElement
      .querySelector(".js-popup-cover-add-comment")
      .classList.add("about-applicant__popup-cover_show");

    const status = event.currentTarget.parentElement.parentElement.parentElement
      .querySelector(".js-status")
      .textContent.toLowerCase();

    if (status === "безработный" || status === "безработная") {
      event.currentTarget.parentElement.querySelector(
        ".js-add-comment-not-work"
      ).checked = true;
    }

    if (status === "работаю, но активно ищу работу") {
      event.currentTarget.parentElement.querySelector(
        ".js-add-comment-have-work"
      ).checked = true;
    }

    event.currentTarget.parentElement
      .querySelector(".js-add-new-comment-btn-apply")
      .addEventListener("click", (event) => {
        if (
          event.currentTarget.parentElement.querySelector(
            ".js-add-comment-not-work"
          ).checked === true
        ) {
          applicatStatus.textContent = "Безработный";
        }

        if (
          event.currentTarget.parentElement.querySelector(
            ".js-add-comment-have-work"
          ).checked === true
        ) {
          applicatStatus.textContent = "Работаю, но аквтивно ищу работу";
        }

        if (
          event.currentTarget.parentElement.querySelector(
            ".js-add-new-comment-input"
          ).value !== ""
        ) {
          let text = event.currentTarget.parentElement.querySelector(
            ".js-add-new-comment-input"
          ).value;
          let containerDate = new Date();
          let dateArray = containerDate.toISOString().split("T")[0].split("-");
          let minutes = [
            containerDate.getHours(),
            containerDate.getMinutes(),
            containerDate.getSeconds(),
          ]
            .map(function (x) {
              return x < 10 ? "0" + x : x;
            })
            .join(":")
            .split(":");
          let resultDate = `${dateArray[2]}.${dateArray[1]}.${dateArray[0]} ${minutes[0]}:${minutes[1]}`;

          let applicant = document.createElement("div");
          applicant.classList.add("about-applicant__comments-in");

          event.currentTarget.parentElement.parentElement.append(applicant);
          applicant.innerHTML = templateComment;

          applicant
            .querySelector(".js-comment-text")
            .setAttribute("data-comment-text", text);
          applicant.querySelector(".js-comment-text-tab").textContent = text;
          applicant.querySelector(".js-comment-text-date").textContent =
            resultDate;

          console.log(text.length);
          if (text.length > 25) {
            applicant.querySelector(
              ".js-comment-text"
            ).textContent = `${text.slice(0, 23)}...`;
          } else {
            applicant.querySelector(".js-comment-text").textContent = `${text}`;
          }

          event.currentTarget.parentElement.classList.remove(
            "js-add-new-comment-popop-container_show"
          );

          event.currentTarget.parentElement.parentElement.parentElement
            .querySelector(".js-popup-cover-add-comment")
            .classList.remove("about-applicant__popup-cover_show");

          event.currentTarget.parentElement.parentElement
            .querySelector(".js-added-comments")
            .classList.add("js-added-comments_hidden");
          event.currentTarget.parentElement.querySelector(
            ".js-add-new-comment-input"
          ).value = "";
        }
      });

    event.currentTarget.parentElement
      .querySelector(".js-popup-close-add-comment")
      .addEventListener("click", (event) => {
        event.currentTarget.parentElement.parentElement.classList.remove(
          "js-add-new-comment-popop-container_show"
        );

        event.currentTarget.parentElement.parentElement.parentElement
          .querySelector(".js-popup-cover-add-comment")
          .classList.remove("about-applicant__popup-cover_show");
      });
  }

  handleClickPopupBtnApply(event) {
    if (
      event.currentTarget.parentNode.parentNode.querySelector(
        ".js-popup-radio-not-work"
      ).checked
    ) {
      event.currentTarget.parentNode.parentNode.parentNode.parentNode.querySelector(
        ".js-status"
      ).textContent = event.currentTarget.parentNode.parentNode.querySelector(
        ".js-popup-caption-not-work"
      ).textContent;
    } else {
      event.currentTarget.parentNode.parentNode.parentNode.parentNode.querySelector(
        ".js-status"
      ).textContent = "Работаю, но активно ищу работу";
    }
  }

  handleClickCancel(event) {
    event.currentTarget.parentNode.parentNode.parentNode
      .querySelector(".js-redacting-status")
      .classList.remove("js-redacting-status_active");
    event.currentTarget.parentNode.parentNode.parentNode
      .querySelector(".js-popup-cover")
      .classList.remove("about-applicant__popup-cover_show");
    event.currentTarget.parentNode.parentNode.classList.remove(
      "about-applicant__popup-redacting-status_show"
    );
  }

  handleClickPopUpClose(event) {
    event.currentTarget.parentNode.parentNode
      .querySelector(".js-popup-cover")
      .classList.remove("about-applicant__popup-cover_show");
    event.currentTarget.parentNode.parentNode
      .querySelector(".js-popup-cover")
      .classList.remove("about-applicant__popup-cover_show");
    event.currentTarget.parentNode.classList.remove(
      "about-applicant__popup-redacting-status_show"
    );
    event.currentTarget.parentNode.parentNode
      .querySelector(".js-redacting-status")
      .classList.remove("js-redacting-status_active");
  }

  handleClickRedactingStatus(event) {
    if (event.currentTarget.classList.contains("js-redacting-status_active")) {
      event.currentTarget.classList.remove("js-redacting-status_active");
      event.currentTarget.parentNode
        .querySelector(".js-popup-redacting-container")
        .classList.remove("about-applicant__popup-redacting-status_show");
      event.currentTarget.parentNode
        .querySelector(".js-popup-cover")
        .classList.remove("about-applicant__popup-cover_show");
    } else {
      event.currentTarget.classList.add("js-redacting-status_active");
      event.currentTarget.parentNode
        .querySelector(".js-popup-redacting-container")
        .classList.add("about-applicant__popup-redacting-status_show");
      event.currentTarget.parentNode
        .querySelector(".js-popup-cover")
        .classList.add("about-applicant__popup-cover_show");
    }

    const notWork =
      event.currentTarget.parentNode.parentNode
        .querySelector(".js-status")
        .textContent.toLowerCase() === "безработный" ||
      event.currentTarget.parentNode.parentNode
        .querySelector(".js-status")
        .textContent.toLowerCase() === "безработная";

    if (notWork) {
      event.currentTarget.parentNode.querySelector(
        ".js-popup-radio-not-work"
      ).checked = true;
    } else {
      event.currentTarget.parentNode.querySelector(
        ".js-popup-radio-have-work"
      ).checked = true;
    }
  }
}

export default CreateApplicant;
