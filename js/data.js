'use strict';
// ------------------------------------------------------------------------------СОЗДАНИЕ ДАННЫХ ДЛЯ ФОРМ
(function () {
  // var PHOTOS = [];
  // var COMMENTS = ['Всё отлично!, В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  // записываем в переменную DOM элемент
  window.similarPictureElement = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture-template').content;
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
  });
})();
