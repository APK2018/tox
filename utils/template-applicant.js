const template = 
    `
        <div class="about-applicant js-about-applicant">
            <div class="about-applicant__name-container about-applicant__caption">
                <div class="about-applicant__name js-name"></div>
                <div class="about-applicant__status-container">
                    <div class="about-applicant__status js-status"></div>
                    <div class="about-applicant__redacting-container">
                        <div class="about-applicant__redacting js-redacting-status">
                            <div class="about-applicant__tab">Редактировать</div>
                        </div>
                        <div class="about-applicant__popup-redacting-status js-popup-redacting-container">
                            <label class="about-applicant__popup-radio-container">
                                <input type="radio" name="work-status" class="about-applicant__popup-radio-btn js-popup-radio-not-work">
                                <div class="about-applicant__popup-caption js-popup-caption-not-work">Безработный</div>
                            </label>
                            <label class="about-applicant__popup-radio-container">
                                <input type="radio" name="work-status" class="about-applicant__popup-radio-btn js-popup-radio-have-work">
                                <div class="about-applicant__popup-caption js-popup-caption-have-work">Работаю, но готов(а) к новым предложениям</div>
                            </label>
                            <div class="about-applicant__popup-buttons">
                                <div class="about-applicant__popup-btn-cancel js-popup-btn-cancel">Отмена</div>
                                <div class="about-applicant__popup-btn-apply js-popup-btn-apply">Сохранить</div>
                            </div>
                            <div class="about-applicant__popup-close js-popup-close"></div>
                        </div>
                        <div class="about-applicant__popup-cover js-popup-cover"></div>
                    </div>
                </div>
                <div class="about-applicant__skills-container js-skills-container">
                    
                </div>
            </div>
            <div class="about-applicant__birthday-container about-applicant__caption">
                <div class="about-applicant__birthday-container">
                    <div class="about-applicant__birthday js-birthday"></div>
                </div>
                <div class="about-applicant__age-container">
                    <span class="about-applicant__age-main js-age"></span>
                    <span class="about-applicant__age js-age-ending"></span>
                </div>
                <div class="about-applicant__zodiac js-zodiac"></div>
            </div>
            <div class="about-applicant__response-vacancy">
                <span class="about-applicant__response js-response"></span>
                <span class="about-applicant__response-date js-response-date"></span>
                <div class="about-applicant__response-date-tab js-response-tab"></div>
            </div>
            <div class="about-applicant__resource-container about-applicant__caption">
                <div class="about-applicant__date-upload js-date-upload"></div>
                <div class="about-applicant__resource js-resource-upload"></div>
            </div>
            <div class="about-applicant__phone about-applicant__caption">
                <div class="about-applicant__phone-number js-phone-number"></div>
                <div class="about-applicant__operator js-operator"></div>
                <div class="about-applicant__phone-region-container">
                    <div class="about-applicant__phone-region js-phone-region"></div>
                    <div class="about-applicant__phone-region-tab js-phone-region-tab"></div>
                </div>
                <img src="" class="about-applicant__operator-photo js-operator-photo" alt="operator">
            </div>
            <div class="about-applicant__region-live-container  about-applicant__caption">
                <div class="js-region-live"></div>
                <div class="js-district-live"></div>
                <div class="js-district-live-2"></div>
            </div>
            <div class="about-applicant__who-added js-who-added about-applicant__caption"></div>
            <div class="about-applicant__favorite about-applicant__caption">
                <div class="about-applicant__add-black-list js-add-black-list" data-select-favorite>
                    <div class="about-applicant__add-black-list-icon js-add-black-list-icon"></div>
                    <div class="about-applicant__add-black-list-text js-add-black-list-text">Добавить в черный список</div>
                    <div class="about-applicant__add-black-list-tab js-add-black-list-tab">Добавить в черный список</div>
                </div>
                <div class="about-applicant__add-favorite js-add-favorite" data-select-favorite>
                    <div class="about-applicant__add-favorite-icon js-favorite-icon"></div>
                    <div class="about-applicant__add-favorite-text js-favorite-text">Добавить в избранные</div>
                    <div class="about-applicant__add-favorite-tab js-favorite-tab">Добавить в избранные</div>
                </div>
            </div>
            <div class="about-applicant__comments about-applicant__caption">
                <div class="filters__select filters__region js-filter" data-title="Работа с резюме" data-inform="">
                    <div class="filters__region-title filters__title js-title">
                        <div class="filters__caption js-filters-caption-join">
                            <div class="filters__caption-description js-filters-caption"></div>
                            <div class="filters__arrow js-arrow">
                                <div class="icon-arrow-down"></div>
                            </div>
                        </div>
                        <div class="filters__functions-section">
                            <div class="filters__close-list js-close-list">
                                <div class="icon-close-down"></div>
                                <div class="filters__tab-information-cross">
                                    <div class="filters__tab-information-cross-back"></div>
                                    <div class="filters__tab-information-decor">
                                        <div class="filters__tab-information-decor-border"></div>
                                    </div>
                                    <span class="filters__tab-information-text">Очистить поле?</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="filters__region-drop-down filters__drop-down js-drop-down">
                        <label type="text" data-select="" class="filters__name-region js-name-region">
                            <input type="checkbox" class="filters__region-checkbox js-region-checkbox">
                            <span class="filters__region-caption js-filters-region-name">
                                <span class="filters__region-name js-region-name">Убрать из подходящих</span>
                            </span>
                        </label>
                        <label type="text" data-select="" class="filters__name-region js-name-region">
                            <input type="checkbox" class="filters__region-checkbox js-region-checkbox">
                            <span class="filters__region-caption js-filters-region-name">
                                <span class="filters__region-name js-region-name">Кандидат</span>
                            </span>
                        </label>
                        <label type="text" data-select="" class="filters__name-region js-name-region">
                            <input type="checkbox" class="filters__region-checkbox js-region-checkbox">
                            <span class="filters__region-caption js-filters-region-name">
                                <span class="filters__region-name js-region-name">На собеседовании</span>
                            </span>
                        </label>
                        <label type="text" data-select="" class="filters__name-region js-name-region">
                            <input type="checkbox" class="filters__region-checkbox js-region-checkbox">
                            <span class="filters__region-caption js-filters-region-name">
                                <span class="filters__region-name js-region-name">Работает у нас</span>
                            </span>
                        </label>
                        <label type="text" data-select="" class="filters__name-region js-name-region">
                            <input type="checkbox" class="filters__region-checkbox js-region-checkbox">
                            <span class="filters__region-caption js-filters-region-name">
                                <span class="filters__region-name js-region-name">Работал у нас</span>
                            </span>
                        </label>
                        <label type="text" data-select="" class="filters__name-region js-name-region">
                            <input type="checkbox" class="filters__region-checkbox js-region-checkbox">
                            <span class="filters__region-caption js-filters-region-name">
                                <span class="filters__region-name js-region-name">Отказано</span>
                            </span>
                        </label>
                    </div>
                </div>
                <div class="about-applicant__comments-containers js-comments-container">
                    <div class="about-applicant__added-comments js-added-comments">
                        <div class="about-applicant__added-comments-caption-1">Добавить</div>
                        <div class="about-applicant__added-comments-caption-2">комментарий</div>
                    </div>
                    <div class="js-add-new-comment-popop-container">
                        <div class="add-new-comment__title">Добавить комментарий</div>
                        <hr class="hr-add-comment">
                        <div class="status-applicant-add-comment-container">
                            <div class="status-applicant-realy">Статус соискателя</div>
                            <div class="status-applicant-redact-comment">
                                <label class="about-applicant__popup-radio-container">
                                    <input type="radio" name="work-status-comment" class="about-applicant__popup-radio-btn js-add-comment-not-work">
                                    <div class="about-applicant__popup-caption js-add-comment-not-work-caption">Безработный</div>
                                </label>
                                <label class="about-applicant__popup-radio-container">
                                    <input type="radio" name="work-status-comment" class="about-applicant__popup-radio-btn js-add-comment-have-work">
                                <div class="about-applicant__popup-caption js-add-comment-have-work-caption">Работаю, но активно ищу работу</div>
                            </label>
                            </div>
                            <div class="about-applicant__popup-close js-popup-close-add-comment"></div>
                        </div>
                        <textarea class="js-add-new-comment-input"></textarea>
                        <div class="js-add-new-comment-btn-apply">Добавить</div>  
                    </div>
                    <div class="js-add-new-comment-popop-container">
                        <div class="add-new-comment__title">Добавить комментарий</div>
                        <hr class="hr-add-comment">
                        <div class="status-applicant-add-comment-container">
                            <div class="status-applicant-realy">Статус соискателя</div>
                            <div class="status-applicant-redact-comment">
                                <label class="about-applicant__popup-radio-container">
                                    <input type="radio" name="work-status-comment" class="about-applicant__popup-radio-btn js-add-comment-not-work">
                                    <div class="about-applicant__popup-caption js-add-comment-not-work-caption">Безработный</div>
                                </label>
                                <label class="about-applicant__popup-radio-container">
                                    <input type="radio" name="work-status-comment" class="about-applicant__popup-radio-btn js-add-comment-have-work">
                                <div class="about-applicant__popup-caption js-add-comment-have-work-caption">Работаю, но активно ищу работу</div>
                            </label>
                            </div>
                            <div class="about-applicant__popup-close js-popup-close-add-comment"></div>
                        </div>
                        <textarea class="js-add-new-comment-input"></textarea>
                        <div class="js-add-new-comment-btn-apply">Добавить</div>  
                    </div>
                    <div class="about-applicant__popup-cover js-popup-cover-add-comment"></div>
                </div>
            </div>
            <div class="about-applicant__online-container about-applicant__caption">
                <img src="" alt="" class="about-applicant__photo-applicant js-photo-applicant">
                <div class="about-applicant__date-online js-offline">
                    <span class="about-applicant__online-caption">Был(а) на сайте:</span>
                    <span class="about-applicant__online-date js-offline-date"></span>
                </div>
                <div class="about-applicant__online-state js-online"></div>
            </div>
        </div>
    `;

export default template;
