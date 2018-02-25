'use strict';
// -------------------------------------------------------------------------------ОТКРЫТИЕ|ЗАКРТЫИЕ ПОЛНОЭКРАННОГО ПРОСМОТРА КАРТИНКИ
(function () {
  var picOverlay = document.querySelector('.gallery-overlay');
  var imgSrcOverlay = document.querySelector('.gallery-overlay-image');
  var overlayClose = document.querySelector('.gallery-overlay-close');

  var overlayOpen = function (event) {
    var target = event.target;
    var srcImg = target.src;
    imgSrcOverlay.src = srcImg;
    picOverlay.classList.remove('hidden');
    document.addEventListener('keydown', function (evt) {
      window.util.closeOverlayEsc(evt, closeOverlay);
    });
    event.preventDefault();
  };
  // функция закрытия при клике overlayOpen
  var closeOverlay = function () {
    picOverlay.classList.add('hidden');
    document.removeEventListener('keydown', function (evt) {
      closeOverlayEsc(evt);
    });
  };
  // обработчик позволяющий открыть overlay при клике по миниатюре
  similarPictureElement.addEventListener('click', function () {
    overlayOpen(event);
  });
  // обработчик закрытия overlayOpen
  overlayClose.addEventListener('click', function () {
    closeOverlay();
  });
})();
