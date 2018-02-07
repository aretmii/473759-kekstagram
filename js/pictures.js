'use strict';

var PHOTOS = [];
var COMMENTS = ['Всё отлично!, В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
// записываем в переменную DOM элемент
var similarPictureElement = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture-template').content;
// функция генерации случайных данных
var randomNum = function getRandomNum(min, max) {
  var i = Math.floor(Math.random() * (max - min)) + min;
  return i;
};
// функция создания массива из 25 генерируемых объектов
var renderPhoto = function () {
  // создаем объект
  var photoObj = {};
  // выбираем рандомный номер фотографии
  var i = randomNum(1, 25);
  // подставляем рандомный адрес картинки в url объекта
  photoObj.url = 'photos/' + i + '.jpg';
  // выбираем рандомное кол-во лайков
  var likes = randomNum(15, 200);
  // подставляем рандомное кол-во лайков в likes объекта
  photoObj.likes = likes;
  // выбираем рандомный комментарий
  var comment = randomNum(1, 6);
  // подставляем комментарий в объект
  photoObj.comments = COMMENTS[comment];
  // записываем объект в массив
  PHOTOS[j] = photoObj;

  var photoElement = pictureTemplate.cloneNode(true);

  photoElement.querySelector('.picture>img').src = PHOTOS[j].url;
  photoElement.querySelector('.picture-likes').textContent = PHOTOS[j].likes;
  photoElement.querySelector('.picture-comments').textContent = PHOTOS[j].comments;

  return photoElement;
};
// функция записи DocumentFragment
var fragment = document.createDocumentFragment();
for (var j = 0; j < 26; j++) {
  fragment.appendChild(renderPhoto(PHOTOS[j]));
  document.querySelector('.gallery-overlay-image').src = PHOTOS[j].url;
  document.querySelector('.likes-count').textContent = PHOTOS[j].likes;
  document.querySelector('.comments-count').textContent = PHOTOS[j].comments;
}
similarPictureElement.appendChild(fragment);
// убираем класс hidden из popup
document.querySelector('.gallery-overlay').classList.remove('hidden');
