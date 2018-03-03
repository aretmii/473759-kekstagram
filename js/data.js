'use strict';
// ------------------------------------------------------------------------------СОЗДАНИЕ ДАННЫХ ДЛЯ ФОРМ
(function () {
  // записываем в переменную DOM элемент
  window.similarPictureElement = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture-template').content;
  var filters = document.querySelector('.filters');
  var filterRecommend = document.querySelector('.filter-recommend');
  // функция создание массива фоток
  var renderPhoto = function (photo) {

    var photoElement = pictureTemplate.cloneNode(true);

    photoElement.querySelector('.picture>img').src = photo.url;
    photoElement.querySelector('.picture>span>.picture-likes').textContent = photo.likes;
    photoElement.querySelector('.picture>span>.picture-comments').textContent = photo.comments.length;

    return photoElement;
  };
  // обработчик получения данных с сервера
  window.load(function (PHOTOS) {
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < 26; j++) {
      fragment.appendChild(renderPhoto(PHOTOS[j]));
    }
    window.similarPictureElement.appendChild(fragment);
    filters.classList = '.filters';
  });
  filterRecommend.addEventListener('click', function () {});
})();
