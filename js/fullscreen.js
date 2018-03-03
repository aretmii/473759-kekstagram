'use strict';
// -------------------------------------------------------------------------------ОТКРЫТИЕ|ЗАКРТЫИЕ ПОЛНОЭКРАННОГО ПРОСМОТРА КАРТИНКИ
(function () {
  var picOverlay = document.querySelector('.gallery-overlay');
  var imgSrcOverlay = document.querySelector('.gallery-overlay-image');
  var overlayClose = document.querySelector('.gallery-overlay-close');
  var overlayLikes = document.querySelector('.likes-count');
  var overlayComments = document.querySelector('.comments-count');

  var overlayOpen = function (event) {
    var target = event.target;
    var srcImg = target.src;
    // переменная получающая лайки из миниатюры
    var likesImg = target.parentNode.querySelector('.picture-stats>.picture-likes');
    // записываем лайки в полноэкранный режим overlay
    overlayLikes.textContent = likesImg.textContent;
    // переменная получающая комменты из миниатюры
    var commImg = target.parentNode.querySelector('.picture-stats>.picture-comments');
    // записываем комменты в полноэкранный режим overlay
    overlayComments.textContent = commImg.textContent;
    // указываем адрес картиники миниатюры в адресе overlay
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
      window.util.closeOverlayEsc(evt, closeOverlay);
    });
  };
  // обработчик позволяющий открыть overlay при клике по миниатюре
  window.similarPictureElement.addEventListener('click', function () {
    overlayOpen(event);
  });
  // обработчик закрытия overlayOpen
  overlayClose.addEventListener('click', function () {
    closeOverlay();
  });
})();
