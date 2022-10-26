class FilterCalendar {
  constructor(domParent) {
    this.container = domParent;
    this.init();
  }

  init() {
    this.body = document.body;

    this.dayBefore = this.container.querySelector(
      ".js-calendar-filter-before-day"
    );
    this.monthBefore = this.container.querySelector(
      ".js-calendar-filter-before-month"
    );
    this.yearBefore = this.container.querySelector(
      ".js-calendar-filter-before-year"
    );

    this.dayAfter = this.container.querySelector(
      ".js-calendar-filter-after-day"
    );
    this.monthAfter = this.container.querySelector(
      ".js-calendar-filter-after-month"
    );
    this.yearAfter = this.container.querySelector(
      ".js-calendar-filter-after-year"
    );

    this.datesWithAttrBefore = this.container.querySelector(
      ".js-calendar-filter-date-before"
    );
    this.datesWithAttrAfter = this.container.querySelector(
      ".js-calendar-filter-date-after"
    );

    this.crossBefore = this.container.querySelector(
      ".js-filter-calendar__cross-before"
    );
    this.crossAfter = this.container.querySelector(
      ".js-filter-calendar__cross-after"
    );

    this.wrapperBefore = this.container.querySelector(
      ".js-calendar-filter-wrapper-before"
    );
    this.wrapperAfter = this.container.querySelector(
      ".js-calendar-filter-wrapper-after"
    );

    this.cleanFilter = document.querySelector(".js-clean-filters");
    this.dateBeforeInput = this.container.querySelector(".date-from");
    this.dateAfterInput = this.container.querySelector(".date-to");

    this.btnDayBefore = this.container.querySelector(
      ".js-calendar-perid-day-left-btn"
    );
    this.btnMonthBefore = this.container.querySelector(
      ".js-calendar-perid-month-left-btn"
    );

    this.btnDayAfter = this.container.querySelector('.js-calendar-perid-day-right-btn');
    this.btnMonthAfter = this.container.querySelector('.js-calendar-perid-month-right-btn');

    this.initEvents();
  }

  initEvents() {
    this.body.addEventListener("click", this.handleClickGlobal.bind(this));
    this.container
      .querySelector(".calendar-container--left")
      .addEventListener("click", this.handleClickTitle.bind(this));
    this.container.addEventListener("click", this.handleClickBtn.bind(this));
    this.crossBefore.addEventListener(
      "click",
      this.handleClickCrossBefore.bind(this)
    );
    this.crossAfter.addEventListener(
      "click",
      this.handleClickCrossAfter.bind(this)
    );

    this.btnDayBefore.addEventListener(
      "click",
      this.handleClickBtnBeforeDay.bind(this)
    );
    this.btnMonthBefore.addEventListener(
      "click",
      this.handleClickBtnMonthBefore.bind(this)
    );
    
    this.btnDayAfter.addEventListener(
      "click",
      this.handleClickBtnDayAfter.bind(this)
    );
    
    this.btnMonthAfter.addEventListener(
      "click",
      this.handleClickBtnMonthAfter.bind(this)
    );
  }

  handleClickBtnMonthAfter() {
    if (this.wrapperAfter.getAttribute("data-empty") === "false") {
      let dateInAttr = this.datesWithAttrAfter
        .getAttribute("data-date")
        .split(".");
      let createDateInAttr = new Date(
        `${dateInAttr[2]}-${dateInAttr[1]}-${dateInAttr[0]}`
      );

      let newDate = new Date(
        createDateInAttr.setMonth(createDateInAttr.getMonth() + 1)
      );
      let newDateArray = newDate.toISOString().split("T")[0].split("-");
      let setDateInAttr = `${newDateArray[2]}.${newDateArray[1]}.${newDateArray[0]}`;

      this.dayAfter.value = newDateArray[2];
      this.monthAfter.value = newDateArray[1];
      this.yearAfter.value = newDateArray[0];

      this.datesWithAttrAfter.setAttribute("data-date", setDateInAttr);

      const monthsGenitive = [
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Мая",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Ноября",
        "Декабря",
      ];

      const firstDate = this.container
        .querySelector(".js-calendar-filter-date-after")
        .getAttribute("data-date");
      let correctFirstDate = "";
      let resultFirstDate = "";

      correctFirstDate = firstDate.split(".");
      resultFirstDate = new Date(
        `${correctFirstDate[2]}-${correctFirstDate[1]}-${correctFirstDate[0]}`
      );

      this.container.querySelector(
        ".js-calendar-filter-date-after"
      ).textContent = `${resultFirstDate.getDate()} ${
        monthsGenitive[Number(correctFirstDate[1]) - 1]
      } ${correctFirstDate[2]}`;
    }

    if (this.wrapperAfter.classList.contains("js-calendar-after_seted")) {
      this.searchResponseFilter();
    }
  }

  handleClickBtnDayAfter() {
    if (this.wrapperAfter.getAttribute("data-empty") === "false") {
      let dateInAttr = this.datesWithAttrAfter
        .getAttribute("data-date")
        .split(".");
      let createDateInAttr = new Date(
        `${dateInAttr[2]}-${dateInAttr[1]}-${dateInAttr[0]}`
      );

      let newDate = new Date(
        createDateInAttr.setDate(createDateInAttr.getDate() + 1)
      );
      let newDateArray = newDate.toISOString().split("T")[0].split("-");
      let setDateInAttr = `${newDateArray[2]}.${newDateArray[1]}.${newDateArray[0]}`;

      this.dayAfter.value = newDateArray[2];
      this.monthAfter.value = newDateArray[1];
      this.yearAfter.value = newDateArray[0];

      this.datesWithAttrAfter.setAttribute("data-date", setDateInAttr);

      const monthsGenitive = [
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Мая",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Ноября",
        "Декабря",
      ];

      const firstDate = this.container
        .querySelector(".js-calendar-filter-date-after")
        .getAttribute("data-date");
      let correctFirstDate = "";
      let resultFirstDate = "";

      correctFirstDate = firstDate.split(".");
      resultFirstDate = new Date(
        `${correctFirstDate[2]}-${correctFirstDate[1]}-${correctFirstDate[0]}`
      );

      this.container.querySelector(
        ".js-calendar-filter-date-after"
      ).textContent = `${resultFirstDate.getDate()} ${
        monthsGenitive[Number(correctFirstDate[1]) - 1]
      } ${correctFirstDate[2]}`;
    }

    if (this.wrapperAfter.classList.contains("js-calendar-after_seted")) {
      this.searchResponseFilter();
    }
  }

  handleClickBtnBeforeDay() {
    if (this.wrapperBefore.getAttribute("data-empty") === "false") {
      let dateInAttr = this.datesWithAttrBefore
        .getAttribute("data-date")
        .split(".");
      let createDateInAttr = new Date(
        `${dateInAttr[2]}-${dateInAttr[1]}-${dateInAttr[0]}`
      );

      let newDate = new Date(
        createDateInAttr.setDate(createDateInAttr.getDate() - 1)
      );
      let newDateArray = newDate.toISOString().split("T")[0].split("-");
      let setDateInAttr = `${newDateArray[2]}.${newDateArray[1]}.${newDateArray[0]}`;

      this.dayBefore.value = newDateArray[2];
      this.monthBefore.value = newDateArray[1];
      this.yearBefore.value = newDateArray[0];

      this.datesWithAttrBefore.setAttribute("data-date", setDateInAttr);

      const monthsGenitive = [
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Мая",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Ноября",
        "Декабря",
      ];

      const firstDate = this.container
        .querySelector(".js-calendar-filter-date-before")
        .getAttribute("data-date");
      let correctFirstDate = "";
      let resultFirstDate = "";

      correctFirstDate = firstDate.split(".");
      resultFirstDate = new Date(
        `${correctFirstDate[2]}-${correctFirstDate[1]}-${correctFirstDate[0]}`
      );

      this.container.querySelector(
        ".js-calendar-filter-date-before"
      ).textContent = `${resultFirstDate.getDate()} ${
        monthsGenitive[Number(correctFirstDate[1]) - 1]
      } ${correctFirstDate[2]}`;
    }

    if (this.wrapperBefore.classList.contains("js-calendar-before_seted")) {
      this.searchResponseFilter();
    }
  }

  handleClickBtnMonthBefore() {
    if (this.wrapperBefore.getAttribute("data-empty") === "false") {
      let dateInAttr = this.datesWithAttrBefore
        .getAttribute("data-date")
        .split(".");
      let createDateInAttr = new Date(
        `${dateInAttr[2]}-${dateInAttr[1]}-${dateInAttr[0]}`
      );

      let newDate = new Date(
        createDateInAttr.setMonth(createDateInAttr.getMonth() - 1)
      );
      let newDateArray = newDate.toISOString().split("T")[0].split("-");
      let setDateInAttr = `${newDateArray[2]}.${newDateArray[1]}.${newDateArray[0]}`;

      this.dayBefore.value = newDateArray[2];
      this.monthBefore.value = newDateArray[1];
      this.yearBefore.value = newDateArray[0];

      this.datesWithAttrBefore.setAttribute("data-date", setDateInAttr);

      const monthsGenitive = [
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Мая",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Ноября",
        "Декабря",
      ];

      const firstDate = this.container
        .querySelector(".js-calendar-filter-date-before")
        .getAttribute("data-date");
      let correctFirstDate = "";
      let resultFirstDate = "";

      correctFirstDate = firstDate.split(".");
      resultFirstDate = new Date(
        `${correctFirstDate[2]}-${correctFirstDate[1]}-${correctFirstDate[0]}`
      );

      this.container.querySelector(
        ".js-calendar-filter-date-before"
      ).textContent = `${resultFirstDate.getDate()} ${
        monthsGenitive[Number(correctFirstDate[1]) - 1]
      } ${correctFirstDate[2]}`;
    }

    if (this.wrapperBefore.classList.contains("js-calendar-before_seted")) {
      this.searchResponseFilter();
    }
  }

  handleClickCrossBefore() {
    this.datesWithAttrBefore.removeAttribute("data-date");

    this.dayBefore.value = "";
    this.monthBefore.value = "";
    this.yearBefore.value = "";

    const setedBeforeDate = this.container
      .querySelector(".js-calendar-filter-wrapper-before")
      .classList.contains("js-calendar-before_seted");

    const setedAfterDate = this.container
      .querySelector(".js-calendar-filter-wrapper-after")
      .classList.contains("js-calendar-after_seted");

    if (setedBeforeDate) {
      this.container
        .querySelector(".js-calendar-filter-wrapper-before")
        .classList.remove("js-calendar-before_seted");
    }

    if (setedAfterDate) {
      this.container
        .querySelector(".js-calendar-filter-wrapper-after")
        .classList.remove("js-calendar-after_seted");
    }

    this.searchResponseFilter();
  }

  handleClickCrossAfter() {
    this.datesWithAttrAfter.removeAttribute("data-date");

    this.dayAfter.value = "";
    this.monthAfter.value = "";
    this.yearAfter.value = "";
  }

  handleClickTitle() {
    if (this.datesWithAttrBefore.getAttribute("data-date") !== null) {
      this.datesWithAttrBefore.style.display = "none";
      const datesHave = this.datesWithAttrBefore
        .getAttribute("data-date")
        .split(".");

      this.dayBefore.value = datesHave[0];
      this.monthBefore.value = datesHave[1];
      this.yearBefore.value = datesHave[2];
    } else {
      this.datesWithAttrBefore.style.display = "block";
    }

    if (this.datesWithAttrAfter.getAttribute("data-date") !== null) {
      this.datesWithAttrAfter.style.display = "none";
      const datesHave = this.datesWithAttrAfter
        .getAttribute("data-date")
        .split(".");

      this.dayAfter.value = datesHave[0];
      this.monthAfter.value = datesHave[1];
      this.yearAfter.value = datesHave[2];
    }
  }

  handleClickGlobal(event) {
    const { target } = event;
    const isClickOnInput = this.container.contains(target);

    if (
      !isClickOnInput &&
      this.container.querySelector(".calendar-wrapper") !== null
    ) {
      this.container.querySelector(".calendar-wrapper").remove();

      this.datesWithAttrBefore.removeAttribute("data-date");

      this.dayBefore.value = "";
      this.monthBefore.value = "";
      this.yearBefore.value = "";

      this.datesWithAttrAfter.removeAttribute("data-date");

      this.dayAfter.value = "";
      this.monthAfter.value = "";
      this.yearAfter.value = "";

      this.datesWithAttrBefore.textContent = "";
      this.datesWithAttrAfter.textContent = "";

      this.wrapperBefore.setAttribute("data-empty", "true");
      this.wrapperAfter.setAttribute("data-empty", "true");
    }

    this.clearFilterView();
  }

  handleClickBtn(event) {
    if (event.target.classList.contains("js-filter-calendar__submit-btn")) {
      const attributeFirstDate = `${this.dayBefore.value}.${this.monthBefore.value}.${this.yearBefore.value}`;
      const attributeSecondDate = `${this.dayAfter.value}.${this.monthAfter.value}.${this.yearAfter.value}`;

      const checkAttrFirstDate = isNaN(
        Date.parse(
          `${this.yearBefore.value}-${this.monthBefore.value}-${this.dayBefore.value}`
        )
      );
      const checkAttrSecondDate = isNaN(
        Date.parse(
          `${this.yearAfter.value}-${this.monthAfter.value}-${this.dayAfter.value}`
        )
      );

      if (!checkAttrFirstDate) {
        this.datesWithAttrBefore.setAttribute("data-date", attributeFirstDate);
      }

      if (!checkAttrSecondDate) {
        this.datesWithAttrAfter.setAttribute("data-date", attributeSecondDate);
      }

      const monthsGenitive = [
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Мая",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Ноября",
        "Декабря",
      ];

      this.container.classList.remove("calendar-filter_active");

      const firstDate = this.container
        .querySelector(".js-calendar-filter-date-before")
        .getAttribute("data-date");
      const secondDate = this.container
        .querySelector(".js-calendar-filter-date-after")
        .getAttribute("data-date");
      let correctFirstDate = "";
      let correctSecondDate = "";
      let resultFirstDate = "";
      let resultSecondDate = "";

      if (firstDate !== null) {
        correctFirstDate = firstDate.split(".");
        resultFirstDate = new Date(
          `${correctFirstDate[2]}-${correctFirstDate[1]}-${correctFirstDate[0]}`
        );

        this.container.querySelector(
          ".js-calendar-filter-date-before"
        ).textContent = `${resultFirstDate.getDate()} ${
          monthsGenitive[Number(correctFirstDate[1]) - 1]
        } ${correctFirstDate[2]}`;

        this.container.querySelector(
          ".js-calendar-filter-date-before"
        ).style.display = "block";

        this.container
          .querySelector(".js-calendar-filter-wrapper-before")
          .classList.add("js-calendar-before_seted");
      }

      if (secondDate !== null) {
        correctSecondDate = secondDate.split(".");
        resultSecondDate = new Date(
          `${correctSecondDate[2]}-${correctSecondDate[1]}-${correctSecondDate[0]}`
        );

        this.container.querySelector(
          ".js-calendar-filter-date-after"
        ).textContent = `${resultSecondDate.getDate()} ${
          monthsGenitive[Number(correctSecondDate[1]) - 1]
        } ${correctSecondDate[2]}`;

        this.container.querySelector(
          ".js-calendar-filter-date-after"
        ).style.display = "block";

        this.container
          .querySelector(".js-calendar-filter-wrapper-after")
          .classList.add("js-calendar-after_seted");
      }

      this.clearFilterView();
      this.searchResponseFilter();
    }
  }

  clearFilterView() {
    let haveClearFilters = 0;

    if (this.datesWithAttrBefore.getAttribute("data-date") !== null) {
      haveClearFilters += 1;
    }

    if (this.datesWithAttrAfter.getAttribute("data-date") !== null) {
      haveClearFilters += 1;
    }

    if (haveClearFilters > 0) {
      this.cleanFilter.disabled = false;
      this.cleanFilter.classList.add("filters__clean-filters_active");
    } else {
      this.cleanFilter.disabled = true;
      this.cleanFilter.classList.remove("filters__clean-filters_active");
    }
  }

  searchResponseFilter() {
    const regions = [];
    const resume = [];
    const vanancy = [];
    const age = [];
    const typeAdd = [];
    const zodiac = [];
    const status = [];
    const comments = [];
    const education = [];
    const favorites = [];
    const dates = { firstDate: "", secondDate: "" };

    let viewApplicant = false;

    const beforeDate = this.container
      .querySelector(".js-calendar-filter-date-before")
      .getAttribute("data-date");
    const afterDate = this.container
      .querySelector(".js-calendar-filter-date-after")
      .getAttribute("data-date");

    if (beforeDate !== null && afterDate !== undefined) {
      dates.firstDate = beforeDate;
    }

    if (afterDate !== null && afterDate !== undefined) {
      dates.secondDate = afterDate;
    }

    document.querySelectorAll(".js-filter").forEach((filter) => {
      if (filter.classList.contains("js-to-regions")) {
        filter.querySelectorAll(".js-name-region").forEach((el) => {
          if (el.classList.contains("active-region")) {
            regions.push(
              el.querySelector(".js-region-name").textContent.toLowerCase()
            );
          }
        });
      }

      if (filter.classList.contains("js-work-resume")) {
        filter.querySelectorAll(".js-name-region").forEach((el) => {
          if (el.classList.contains("active-region")) {
            resume.push(
              el.querySelector(".js-region-name").textContent.toLowerCase()
            );
          }
        });
      }

      if (filter.classList.contains("js-to-vacancy")) {
        filter.querySelectorAll(".js-name-region").forEach((el) => {
          if (el.classList.contains("active-region")) {
            vanancy.push(
              el.querySelector(".js-region-name").textContent.toLowerCase()
            );
          }
        });
      }

      if (filter.classList.contains("js-to-age")) {
        filter.querySelectorAll(".js-name-region").forEach((el) => {
          if (el.classList.contains("active-region")) {
            if (!(el.getAttribute("data-variant-select") === "all")) {
              age.push(
                el
                  .querySelector(".js-region-name")
                  .textContent.toLowerCase()
                  .split(" ")[1]
              );
            }
          }
        });
      }

      if (filter.classList.contains("js-to-type-add")) {
        filter.querySelectorAll(".js-name-region-radio").forEach((el) => {
          if (el.classList.contains("active-region")) {
            typeAdd.push(
              el.querySelector(".js-region-name").textContent.toLowerCase()
            );
          }
        });
      }

      if (filter.classList.contains("js-to-zodiac")) {
        filter.querySelectorAll(".js-name-region").forEach((el) => {
          if (el.classList.contains("active-region")) {
            zodiac.push(
              el.querySelector(".js-region-name").textContent.toLowerCase()
            );
          }
        });
      }

      if (filter.classList.contains("js-to-status")) {
        filter.querySelectorAll(".js-name-region-radio").forEach((el) => {
          if (el.classList.contains("active-region")) {
            if (
              el.querySelector(".js-region-name").textContent.toLowerCase() ===
              "работает"
            ) {
              status.push("работаю, но активно ищу работу");
            } else {
              status.push("безработный");
              status.push("безработная");
            }
          }
        });
      }

      if (filter.classList.contains("js-to-comment")) {
        filter.querySelectorAll(".js-name-region-radio").forEach((el) => {
          if (el.classList.contains("active-region")) {
            comments.push(
              el.querySelector(".js-region-name").textContent.toLowerCase()
            );
          }
        });
      }

      // if (filter.classList.contains("js-to-education")) {
      //   filter.querySelectorAll(".js-name-region").forEach((el) => {
      //     if (el.classList.contains("active-region")) {
      //       education.push(
      //         el.querySelector(".js-region-name").textContent.toLowerCase()
      //       );
      //     }
      //   });
      // }

      if (filter.classList.contains("js-to-favorite")) {
        filter.querySelectorAll(".js-name-region-radio").forEach((el) => {
          if (el.classList.contains("active-region")) {
            favorites.push(
              el.querySelector(".js-region-name").textContent.toLowerCase()
            );
          }
        });
      }
    });

    document.querySelectorAll(".js-about-applicant").forEach((applicant) => {
      applicant.classList.remove("about-applicant_hidden");
    });

    document.querySelectorAll(".js-about-applicant").forEach((applicant) => {
      let haveRegions = 0;
      let haveResumes = 0;
      let haveVacancys = 0;
      let haveAges = 0;
      let haveAdds = 0;
      let haveZodiacs = 0;
      let haveStatus = 0;
      let haveComments = 0;
      let haveEducations = 0;
      let haveFavorite = 0;
      let haveDates = 0;

      if (regions.length !== 0) {
        regions.forEach((region) => {
          const haveRegion = applicant
            .querySelector(".js-region-live")
            .textContent.toLowerCase()
            .indexOf(region);

          const haveDistrict = applicant
            .querySelector(".js-district-live")
            .textContent.toLowerCase()
            .indexOf(region);

          if (haveRegion === 0 || haveDistrict === 0) {
            haveRegions += 1;
          }
        });
      } else {
        haveRegions += 1;
      }

      let resumesApplicant = [];

      if (resume.length !== 0) {
        applicant
          .querySelectorAll(".js-name-region")
          .forEach((resumesElementApplicant) => {
            if (resumesElementApplicant.classList.contains("active-region")) {
              resumesApplicant.push(
                resumesElementApplicant
                  .querySelector(".js-region-name")
                  .textContent.toLowerCase()
              );
            }
          });

        resume.forEach((resumeElement) => {
          resumesApplicant.forEach((resumeApplicantElement) => {
            if (resumeApplicantElement.indexOf(resumeElement) === 0) {
              haveResumes += 1;
            }
          });
        });
      } else {
        haveResumes += 1;
      }

      if (vanancy.length !== 0) {
        vanancy.forEach((vacant) => {
          const haveVacant = applicant
            .querySelector(".js-response")
            .getAttribute("data-inform")
            .toLowerCase()
            .indexOf(vacant);

          if (haveVacant === 0) {
            haveVacancys += 1;
          }
        });
      } else {
        haveVacancys += 1;
      }

      if (typeAdd.length !== 0) {
        typeAdd.forEach((typeAddElement) => {
          const haveAdded = applicant
            .querySelector(".js-who-added")
            .textContent.toLowerCase()
            .indexOf(typeAddElement);

          if (haveAdded === 0) {
            haveAdds += 1;
          }
        });
      } else {
        haveAdds += 1;
      }

      if (zodiac.length !== 0) {
        zodiac.forEach((zodiacElement) => {
          const haveZodiac = applicant
            .querySelector(".js-zodiac")
            .textContent.toLowerCase()
            .indexOf(zodiacElement);

          if (haveZodiac === 0) {
            haveZodiacs += 1;
          }
        });
      } else {
        haveZodiacs += 1;
      }

      if (status.length !== 0) {
        status.forEach((statusElement) => {
          const haveStatusEl = applicant
            .querySelector(".js-status")
            .textContent.toLowerCase()
            .indexOf(statusElement);

          if (haveStatusEl === 0) {
            haveStatus += 1;
          }
        });
      } else {
        haveStatus += 1;
      }

      if (age.length !== 0) {
        const ageApplicant = Number(
          applicant
            .querySelector(".js-age")
            .textContent.toLowerCase()
            .split(" ")[0]
        );
        const ageInArray = Number(age[age.length - 1]);

        if (ageApplicant >= ageInArray) {
          haveAges += 1;
        }
      } else {
        haveAges += 1;
      }

      if (favorites.length !== 0) {
        let haveBlackListElement = false;
        let haveFavoriteElement = false;

        applicant
          .querySelectorAll("[data-select-favorite]")
          .forEach((elSelect) => {
            if (
              elSelect.classList.contains("js-add-black-list") &&
              elSelect.getAttribute("data-select-favorite") === "selected"
            ) {
              haveBlackListElement = true;
            }

            if (
              elSelect.classList.contains("js-add-favorite") &&
              elSelect.getAttribute("data-select-favorite") === "selected"
            ) {
              haveFavoriteElement = true;
            }
          });

        if (haveBlackListElement) {
          if (favorites[0].indexOf("в черном списке") === 0) {
            haveFavorite += 1;
          }
        }

        if (haveFavoriteElement) {
          if (favorites[0].indexOf("в избранном") === 0) {
            haveFavorite += 1;
          }
        }
      } else {
        haveFavorite += 1;
      }

      if (comments.length !== 0) {
        const commentElement = applicant.querySelector(
          ".about-applicant__comments-in"
        );
        const haveCommentElement =
          commentElement !== null && commentElement !== undefined;

        if (comments[0] === "есть комментарий" && haveCommentElement) {
          haveComments += 1;
        }

        if (comments[0] === "нет комментария" && !haveCommentElement) {
          haveComments += 1;
        }
      } else {
        haveComments += 1;
      }

      if (education.length !== 0) {
        //   education.forEach((educationElement) => {
        //     const haveStatusEl = applicant
        //       .querySelector(".js-education")
        //       .textContent.toLowerCase()
        //       .indexOf(educationElement);
        //     if (haveStatusEl === 0) {
        //       haveStatus += 1;
        //     }
        //   });
      } else {
        haveEducations += 1;
      }

      if (dates.firstDate !== "" || dates.secondDate !== "") {
        let firstDate = "";
        let secondDate = "";

        firstDate = dates.firstDate.split(".");
        secondDate = dates.secondDate.split(".");

        applicant
          .querySelectorAll(".about-applicant__skills-in")
          .forEach((elementDateSkill) => {
            const dateApplicant = elementDateSkill
              .getAttribute("data-skill-date")
              .split(".");
            const dateApplicantCorrect = new Date(
              `20${dateApplicant[2]}-${dateApplicant[1]}-${dateApplicant[0]}`
            );
            const dateFilterCorrectFirst = new Date(
              `${firstDate[2]}-${firstDate[1]}-${firstDate[0]}`
            );
            const dateFilterCorrectSecond = new Date(
              `${secondDate[2]}-${secondDate[1]}-${secondDate[0]}`
            );

            if (firstDate.length === 1 && secondDate.length > 1) {
              if (dateApplicantCorrect <= dateFilterCorrectSecond) {
                haveDates += 1;
              }
            }

            if (firstDate.length > 1 && secondDate.length === 1) {
              if (dateApplicantCorrect >= dateFilterCorrectFirst) {
                haveDates += 1;
              }
            }

            if (firstDate.length > 1 && secondDate.length > 1) {
              if (
                dateApplicantCorrect <= dateFilterCorrectSecond &&
                dateApplicantCorrect >= dateFilterCorrectFirst
              ) {
                haveDates += 1;
              }
            }
          });
      } else {
        haveDates += 1;
      }

      const haveAllSettings =
        haveRegions > 0 &&
        haveResumes > 0 &&
        haveVacancys > 0 &&
        haveAges > 0 &&
        haveAdds > 0 &&
        haveZodiacs > 0 &&
        haveStatus > 0 &&
        haveComments > 0 &&
        haveEducations > 0 &&
        haveFavorite > 0 &&
        haveDates > 0;

      if (haveAllSettings) {
        applicant.classList.remove("about-applicant_hidden");
      } else {
        applicant.classList.add("about-applicant_hidden");
      }
    });
  }
}

export default FilterCalendar;
