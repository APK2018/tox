class Filters {
  constructor(domParent) {
    this.container = domParent;
    this.init();
  }

  init() {
    this.initElements();
    this.initEvents();
  }

  initElements() {
    this.dropDown = this.container.querySelector(".js-drop-down");
    this.title = this.container.querySelector(".js-title");
    this.apply = this.container.querySelector(".js-drop-down-apply");
    this.btnRegions = this.container.querySelector(".js-all-regions");
    this.listRegions = this.container.querySelector(".js-list-all-regions");
    this.plusRegionBtn = this.container.querySelector(".js-plus-region");
    this.arrow = this.container.querySelector(".js-arrow");
    this.btnCloseList = this.container.querySelector(".js-close-list");
    this.regionCheckbox = this.container.querySelectorAll(
      ".js-region-checkbox"
    );
    this.titleFilter = this.container.querySelector(".js-filters-caption");
    this.captionJoin = this.container.querySelector(".js-filters-caption-join");
    this.search = this.container.querySelector(".js-filters-search");
    this.blockRegion = this.container.querySelectorAll(".js-name-region");
    this.dataTitle = this.container.getAttribute("data-title");
    this.variantAll = this.container.querySelector(
      '[data-variant-select="all"]'
    );
    this.radioButtons = this.container.querySelectorAll(
      ".js-name-region-radio"
    );
    this.btnClearFilters =
      this.container.parentElement.querySelector(".js-clean-filters");
    this.body = document.body;

    this.counterRegion = 0;
    this.descriptionTitle = "";
    this.titleFilter.textContent = this.dataTitle;
    this.dataInformation = [];
  }

  initEvents() {
    this.title.addEventListener("click", this.handleClickTitle.bind(this));
    this.body.addEventListener("click", this.handleClickBody.bind(this));

    if (this.blockRegion) {
      this.blockRegion.forEach((el) => {
        el.addEventListener("mouseup", this.handleClickCaptions.bind(this));
      });
    }

    this.btnCloseList.addEventListener(
      "click",
      this.handleClickBtnCloseList.bind(this)
    );
    this.container.addEventListener(
      "click",
      this.handleClickContainer.bind(this)
    );

    if (this.apply) {
      this.apply.addEventListener("click", this.handleClickButton.bind(this));
    }

    if (this.calendarFilter) {
      this.calendarFilter.addEventListener(
        "click",
        this.searchResponse.bind(this)
      );
    }

    if (this.btnRegions) {
      this.btnRegions.addEventListener(
        "click",
        this.handleClickRegion.bind(this)
      );
    }

    if (this.search) {
      this.search.addEventListener("keyup", this.handleKeyUpSearch.bind(this));
    }

    if (this.radioButtons) {
      this.radioButtons.forEach((el) => {
        el.addEventListener("mouseup", this.handleClickRadio.bind(this));
      });
    }
  }

  handleClickContainer() {
    if (this.container.querySelector(".js-close-list.active-flex")) {
      this.container.classList.add("background-white");
    } else {
      this.container.classList.remove("background-white");
    }

    if (this.btnClearFilters) {
      let haveClearFilters = 0;

      this.container.parentElement
        .querySelectorAll(".js-filter")
        .forEach((el) => {
          if (el.classList.contains("background-white")) {
            haveClearFilters += 1;
          }
        });

      if (haveClearFilters > 0) {
        this.btnClearFilters.disabled = false;
        this.btnClearFilters.classList.add("filters__clean-filters_active");
      } else {
        this.btnClearFilters.disabled = true;
        this.btnClearFilters.classList.remove("filters__clean-filters_active");
      }
    }
  }

  handleClickRadio(event) {
    this.radioButtons.forEach((el) => {
      if (el.classList.contains("active-region")) {
        el.classList.remove("active-region");
      }
    });

    if (event.currentTarget.classList.contains("active-region")) {
      event.currentTarget.classList.remove("active-region");
    } else {
      event.currentTarget.classList.add("active-region");
    }

    this.radioButtons.forEach((el) => {
      el.classList.remove("background-yellow");

      if (el.classList.contains("active-region")) {
        el.classList.add("background-yellow");
        const name = el.querySelector(".js-region-name").textContent;

        this.titleFilter.textContent = name;
        this.container.setAttribute("data-inform", name);
      }
    });

    this.btnCloseList.classList.add("active-flex");
    this.arrow.classList.add("background-yellow");
    this.captionJoin.classList.add("background-yellow");

    this.searchResponse();
  }

  handleKeyUpSearch(event) {
    const currenVal = String(event.target.value).toLowerCase();

    this.blockRegion.forEach((el) => {
      const text = String(
        el.querySelector(".js-region-name").textContent
      ).toLowerCase();

      if (text.indexOf(currenVal) == 0) {
        el.classList.remove("hidden");
      } else {
        el.classList.add("hidden");
      }
    });
  }

  handleClickTitle() {
    if (this.dropDown.classList.contains("active-flex")) {
      this.dropDown.classList.remove("active-flex");
      this.title.classList.remove("background-white");
      this.arrow
        .querySelector(".icon-arrow-down")
        .classList.remove("icon-arrow-down_active");
    } else {
      this.dropDown.classList.add("active-flex");
      this.title.classList.add("background-white");
      this.arrow
        .querySelector(".icon-arrow-down")
        .classList.add("icon-arrow-down_active");
    }
  }

  handleClickBtnCloseList() {
    this.titleFilter.textContent = `${this.dataTitle}`;
    this.btnCloseList.classList.remove("active-flex");

    if (this.regionCheckbox) {
      this.regionCheckbox.forEach((el) => {
        el.classList.remove("active-region");
        el.checked = false;
        el.parentElement.classList.remove("background-yellow");
        el.parentElement.classList.remove("active-region");
      });
    }

    if (this.radioButtons) {
      this.radioButtons.forEach((el) => {
        el.classList.remove("active-region");
        el.classList.remove("background-yellow");
        el.querySelector(".js-region-radio").checked = false;
        el.parentElement.parentElement.classList.remove("active-region");
      });
    }

    this.arrow.classList.remove("background-yellow");
    this.captionJoin.classList.remove("background-yellow");
    this.dataInformation.splice(0, this.dataInformation.length);
    this.container.setAttribute("data-inform", "");
    this.container.classList.remove("background-white");
    this.arrow
      .querySelector(".icon-arrow-down")
      .classList.remove("icon-arrow-down_active");

    if (this.btnClearFilters) {
      let haveClearFilters = 0;

      this.container.parentElement
        .querySelectorAll(".js-filter")
        .forEach((el) => {
          if (el.classList.contains("background-white")) {
            haveClearFilters += 1;
          }
        });

      if (haveClearFilters > 0) {
        this.btnClearFilters.disabled = false;
        this.btnClearFilters.classList.add("filters__clean-filters_active");
      } else {
        this.btnClearFilters.disabled = true;
        this.btnClearFilters.classList.remove("filters__clean-filters_active");
      }
    }

    if (this.container.classList.contains("js-to-zodiac")) {
      this.container
        .querySelector(".js-filters-caption-icon-zodiac")
        .removeAttribute("data-variant-kozerog");
      this.container
        .querySelector(".js-filters-caption-icon-zodiac")
        .removeAttribute("data-variant-vodoley");
      this.container
        .querySelector(".js-filters-caption-icon-zodiac")
        .removeAttribute("data-variant-fish");
      this.container
        .querySelector(".js-filters-caption-icon-zodiac")
        .removeAttribute("data-variant-oven");
      this.container
        .querySelector(".js-filters-caption-icon-zodiac")
        .removeAttribute("data-variant-telec");
      this.container
        .querySelector(".js-filters-caption-icon-zodiac")
        .removeAttribute("data-variant-bliz");
      this.container
        .querySelector(".js-filters-caption-icon-zodiac")
        .removeAttribute("data-variant-rak");
      this.container
        .querySelector(".js-filters-caption-icon-zodiac")
        .removeAttribute("data-variant-lev");
      this.container
        .querySelector(".js-filters-caption-icon-zodiac")
        .removeAttribute("data-variant-deva");
      this.container
        .querySelector(".js-filters-caption-icon-zodiac")
        .removeAttribute("data-variant-ves");
      this.container
        .querySelector(".js-filters-caption-icon-zodiac")
        .removeAttribute("data-variant-scorpion");
      this.container
        .querySelector(".js-filters-caption-icon-zodiac")
        .removeAttribute("data-variant-strelec");
      this.container
        .querySelector(".js-filters-caption-icon-zodiac")
        .classList.remove("filters__caption-icon-zodiac_show");
    }
    this.searchResponse();
  }

  handleClickCaptions(event) {
    if (event.currentTarget.classList.contains("active-region")) {
      event.currentTarget.classList.remove("active-region");
    } else {
      event.currentTarget.classList.add("active-region");
    }

    this.counterRegion = 0;

    this.blockRegion.forEach((el) => {
      el.classList.remove("background-yellow");

      if (el.classList.contains("active-region")) {
        const title = el.querySelector(".js-region-name").textContent;

        if (el.querySelector(".js-region-numbers")) {
          var descr = el.querySelector(".js-region-numbers").textContent;
        } else {
          var descr = "";
        }

        el.classList.add("background-yellow");
        this.descriptionTitle = `${title}${descr}`;
        this.counterRegion += 1;
      }
    });

    if (this.counterRegion > 1) {
      this.titleFilter.textContent = `${this.dataTitle} (выбрано: ${this.counterRegion})`;
      this.btnCloseList.classList.add("active-flex");
      this.arrow.classList.add("background-yellow");
      this.captionJoin.classList.add("background-yellow");

      if (this.container.classList.contains("js-to-zodiac")) {
        this.container
          .querySelector(".js-filters-caption-icon-zodiac")
          .removeAttribute("data-variant-kozerog");
        this.container
          .querySelector(".js-filters-caption-icon-zodiac")
          .removeAttribute("data-variant-vodoley");
        this.container
          .querySelector(".js-filters-caption-icon-zodiac")
          .removeAttribute("data-variant-fish");
        this.container
          .querySelector(".js-filters-caption-icon-zodiac")
          .removeAttribute("data-variant-oven");
        this.container
          .querySelector(".js-filters-caption-icon-zodiac")
          .removeAttribute("data-variant-telec");
        this.container
          .querySelector(".js-filters-caption-icon-zodiac")
          .removeAttribute("data-variant-bliz");
        this.container
          .querySelector(".js-filters-caption-icon-zodiac")
          .removeAttribute("data-variant-rak");
        this.container
          .querySelector(".js-filters-caption-icon-zodiac")
          .removeAttribute("data-variant-lev");
        this.container
          .querySelector(".js-filters-caption-icon-zodiac")
          .removeAttribute("data-variant-deva");
        this.container
          .querySelector(".js-filters-caption-icon-zodiac")
          .removeAttribute("data-variant-ves");
        this.container
          .querySelector(".js-filters-caption-icon-zodiac")
          .removeAttribute("data-variant-scorpion");
        this.container
          .querySelector(".js-filters-caption-icon-zodiac")
          .removeAttribute("data-variant-strelec");
        this.container
          .querySelector(".js-filters-caption-icon-zodiac")
          .classList.remove("filters__caption-icon-zodiac_show");
      }
    } else if (this.counterRegion > 0 && this.counterRegion < 2) {
      this.titleFilter.textContent = `${this.descriptionTitle}`;
      this.btnCloseList.classList.add("active-flex");
      this.arrow.classList.add("background-yellow");
      this.captionJoin.classList.add("background-yellow");

      if (this.container.classList.contains("js-to-zodiac")) {
        let nowHaveZodiac = "";

        this.blockRegion.forEach((elem) => {
          if (elem.classList.contains("active-region")) {
            nowHaveZodiac = elem
              .querySelector(".js-region-name")
              .getAttribute("data-zodiac");
          }
        });

        this.container
          .querySelector(".js-filters-caption-icon-zodiac")
          .setAttribute(nowHaveZodiac, "");
        this.container
          .querySelector(".js-filters-caption-icon-zodiac")
          .classList.add("filters__caption-icon-zodiac_show");
      }
    } else {
      this.titleFilter.textContent = `${this.dataTitle}`;
      this.btnCloseList.classList.remove("active-flex");
      this.regionCheckbox.forEach((el) => {
        el.classList.remove("active-region");
      });
      this.arrow.classList.remove("background-yellow");
      this.captionJoin.classList.remove("background-yellow");

      this.container
        .querySelector(".js-filters-caption-icon-zodiac")
        .removeAttribute("data-variant-kozerog");
      this.container
        .querySelector(".js-filters-caption-icon-zodiac")
        .removeAttribute("data-variant-vodoley");
      this.container
        .querySelector(".js-filters-caption-icon-zodiac")
        .removeAttribute("data-variant-fish");
      this.container
        .querySelector(".js-filters-caption-icon-zodiac")
        .removeAttribute("data-variant-oven");
      this.container
        .querySelector(".js-filters-caption-icon-zodiac")
        .removeAttribute("data-variant-telec");
      this.container
        .querySelector(".js-filters-caption-icon-zodiac")
        .removeAttribute("data-variant-bliz");
      this.container
        .querySelector(".js-filters-caption-icon-zodiac")
        .removeAttribute("data-variant-rak");
      this.container
        .querySelector(".js-filters-caption-icon-zodiac")
        .removeAttribute("data-variant-lev");
      this.container
        .querySelector(".js-filters-caption-icon-zodiac")
        .removeAttribute("data-variant-deva");
      this.container
        .querySelector(".js-filters-caption-icon-zodiac")
        .removeAttribute("data-variant-ves");
      this.container
        .querySelector(".js-filters-caption-icon-zodiac")
        .removeAttribute("data-variant-scorpion");
      this.container
        .querySelector(".js-filters-caption-icon-zodiac")
        .removeAttribute("data-variant-strelec");
      this.container
        .querySelector(".js-filters-caption-icon-zodiac")
        .classList.remove("filters__caption-icon-zodiac_show");
    }

    this.searchResponse();
  }

  searchResponse() {
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

    const beforeDate = document
      .querySelector(".js-calendar-filter-date-before")
      .getAttribute("data-date");
    const afterDate = document
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

  handleClickButton() {
    this.dropDown.classList.remove("active-flex");
  }

  handleClickBody(event) {
    const { target } = event;
    const isClickOnInput = this.container.contains(target);

    if (!isClickOnInput) {
      this.dropDown.classList.remove("active-flex");
      this.title.classList.remove("background-white");
      this.arrow
        .querySelector(".icon-arrow-down")
        .classList.remove("icon-arrow-down_active");
    }
  }

  handleClickRegion() {
    if (this.listRegions.classList.contains("active-flex")) {
      this.listRegions.classList.remove("active-flex");
      this.plusRegionBtn.classList.remove("change-color-red");
      this.plusRegionBtn.textContent = "+";
    } else {
      this.listRegions.classList.add("active-flex");
      this.plusRegionBtn.classList.add("change-color-red");
      this.plusRegionBtn.textContent = "-";
    }
  }
}

export default Filters;
