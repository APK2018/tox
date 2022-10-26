class StartPopup {
  constructor(domParent) {
    this.container = domParent;
    this.init();
  }

  init() {
    this.close = this.container.querySelector(".js-start-popup-close");
    this.initEvent();
  }

  initEvent() {
    this.close.addEventListener("click", this.handleClickClose.bind(this));
  }

  handleClickClose() {
    this.container.classList.add("start-popup_hidden");
    this.container.parentNode
      .querySelector(".js-start-popup-cover")
      .classList.add("start-popup_hidden");
  }
}

export default StartPopup;
