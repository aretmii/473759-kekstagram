'use strict';
// -----------------------------------------------------------------------------------ОТКРЫТИЯ/ЗАКРЫТИЯ ФОРМЫ РЕДАКТИРОВАНИЯ
(function () {
  var uploadFileInput = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadButtonClose = document.querySelector('.upload-form-cancel');
  var uploadFormDescr = document.querySelector('.upload-form-description');
  var effectOriginal = document.querySelector('.upload-effect-label');
  // функция открытия формы редактирования
  var uploadOverlayOpen = function () {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', function (evt) {
      window.util.closeOverlayEsc(evt, uploadOverlayClose);
    });
  // при открытии формы курсор ПИНа уровня эффекта сразу становится pointer
    effectLevelPin.style.cursor = "pointer";
    effectValue.style.width = '455px';
    effectLevelPin.style.left = '455px';
  };
  // функция закрытия формы редактирования
  var uploadOverlayClose = function () {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', function (evt) {
      window.util.closeOverlayEsc(evt, uploadOverlayClose);
    });
  };
  // обработчик отслеживающий изменения INPUT и открывающий редактор
  uploadFileInput.onchange = uploadOverlayOpen;
  // обработчик закрывающий окно редактирования при клике/при нажатии Esc
  uploadButtonClose.addEventListener('click', function () {
    uploadOverlayClose();
  });
  // обработчик закрывающий окно редактирования при нажатии на enterButton
  uploadButtonClose.addEventListener('keydown', function (evt) {
    window.util.uploadCloseEnter(evt, uploadOverlayClose);
  });
  // обработчик запрещающий закрывать форму при фокусе на комментарии
  uploadFormDescr.addEventListener('keydown', function () {
    event.stopPropagation();
  });
  // обработчик для закрытия Popup при нажатии на оригинальный стиль
  effectOriginal.addEventListener('mouseup', function () {
    uploadOverlayClose();
  });
})();