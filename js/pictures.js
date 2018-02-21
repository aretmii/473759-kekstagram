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
  similarPictureElement.appendChild(fragment);
}
// module4-task1 Загрузка изображения и показ формы
var uploadFileInput = document.querySelector('#upload-file');
var uploadOverlay = document.querySelector('.upload-overlay');
var uploadButtonClose = document.querySelector('.upload-form-cancel');
var uploadFormDescr = document.querySelector('.upload-form-description');
// переменные ползунка редактора
var effectLevelPin = document.querySelector('.upload-effect-level-pin');
var effectLevelLine = document.querySelector('.upload-effect-level-line');
var effectValue = document.querySelector('.upload-effect-level-val');
// эффекты
var effectList = document.querySelector('.upload-effect-controls');
var effectImgPreview = document.querySelector('.effect-image-preview');
var effectOriginal = document.querySelector('.upload-effect-label');
// переменные для функций открытия фотографий в полноэкранный режим OVERLAY
var picOverlay = document.querySelector('.gallery-overlay');
var imgSrcOverlay = document.querySelector('.gallery-overlay-image');
var overlayClose = document.querySelector('.gallery-overlay-close');
var escButton = 27;
var enterButton = 13;
// функция открытия формы редактирования
var uploadOverlayOpen = function () {
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', overlayCloseEsc);
};
// функция закрытия формы редактирования
var uploadOverlayClose = function () {
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', overlayCloseEsc);
  uploadFileInput.value = '';
};
// функция закрытия формы редактирования при нажатии на Esc
var overlayCloseEsc = function (evt) {
  if (evt.keyCode === escButton) {
    uploadOverlayClose();
  }
};
// -------------------------ФУНКЦИИ СТИЛИЗАЦИЙ---------------------------------------------
// функция вычисляющая длину effectLevelLine
var lineLength = function () {
  var lineLengthValue = effectLevelLine.clientWidth;
  return lineLengthValue;
};
// функция определяющая длину levelLineValue
var levelValue = function () {
  var levelLineValue = effectValue.clientWidth;
  return levelLineValue;
};
// функция применения эффекта при отпускании пина.
// функция считают пропорцию, определяет положение пина относительно линии
var levelPinUp = function () {
  var x = lineLength();
  var y = levelValue();
  // считаем в процентах. х - 100%; у - ?
  var effectLevel = y / x * 100;
  return effectLevel;
};
// функция добавляющая класс стиля изображению
var effectFunc = function (event) {
  var targetEff = event.target;
  // находим id input и записываем его в переменную
  var targetInp = targetEff.id;
  // убираем из id префикс upload- и записываем в переменную
  var imgEffect = targetInp.replace('upload-', '');
  effectImgPreview.className = 'effect-image-preview' + ' ' + imgEffect;
  effectValue.style.width = '100%';
  effectLevelPin.style.left = '100%';
};
// ----------------------ОБРАБОТЧИКИ-------------------------
// обработчик отслеживающий изменения INPUT и открывающий редактор
uploadFileInput.onchange = uploadOverlayOpen;
// обработчик закрывающий окно редактирования при клике/при нажатии Esc
uploadButtonClose.addEventListener('click', function () {
  uploadOverlayClose();
});
// обработчик закрывающий окно редактирования при нажатии на enterButton
uploadButtonClose.addEventListener('keydown', function (evt) {
  if (evt.keydown === enterButton) {
    uploadOverlayClose();
  }
});
// обработчик запрещающий закрывать форму при фокусе на комментарии
uploadFormDescr.addEventListener('keydown', function () {
  event.stopPropagation();
});
// обработчик. Отпускаю ПИН, вычисляется уровень эффекта, и записывается в переменную
effectLevelPin.addEventListener('mouseup', function () {
  var levelLineValue = levelPinUp();
  effectValue.style.width = levelLineValue + '%';
  effectLevelPin.style.left = levelLineValue + '%';
});
// обработчик для закрытия Popup при нажатии на оригинальный стиль
effectOriginal.addEventListener('mouseup', function () {
  uploadOverlayClose();
});
// обработчик выбора эффекта и наложения эффекта на фото
// нажимаем на эффект, эффект получает уровень 100%,
// фотографии добавляется css стиль соотв. эффекту
effectList.addEventListener('click', effectFunc);
// функция открытия overlay
var overlayOpen = function (event) {
  var target = event.target;
  var srcImg = target.src;
  imgSrcOverlay.src = srcImg;
  picOverlay.classList.remove('hidden');
  document.addEventListener('keydown', closeOverlayEsc);
  event.preventDefault();
};
// функция закрытия при клике overlayOpen
var closeOverlay = function () {
  picOverlay.classList.add('hidden');
  document.removeEventListener('keydown', function (evt) {
    closeOverlayEsc(evt);
  });
};
// функция закрытия overlay при escButton
var closeOverlayEsc = function (evt) {
  if (evt.keyCode === escButton) {
    closeOverlay();
  }
};
// обработчик позволяющий открыть overlay при клике по миниатюре
similarPictureElement.addEventListener('click', function () {
  overlayOpen(event);
});
// обработчик закрытия overlayOpen
overlayClose.addEventListener('click', function () {
  closeOverlay();
});
// ВАЛИДАЦИЯ
var uploadHashtag = document.querySelector('.upload-form-hashtags');
var submitButton = document.querySelector('.upload-form-submit');
// функция валидации формы

// Набор хэш-тегов можно превратить в массив, воспользовавшись методом split,

// После этого, вы можете написать цикл,
// который будет ходить по полученному массиву и проверять каждый из хэш-тегов
// на предмет соответствия ограничениям.
// Если хотя бы один из тегов не проходит
// нужных проверок, можно воспользоваться методом setCustomValidity для того,
// чтобы задать полю правильное сообщение об ошибке
var myFunc = function () {
  var hashTagsValue = uploadHashtag.value;
  var hashTagsArr = hashTagsValue.split(' ');

  for (var z = 0; z < hashTagsArr.length; z++) {
    var Set;
    if (hashTagsArr[z].length > 20) {
      uploadHashtag.setCustomValidity('Хэш-тег максимум 20 символов');
    } else if (hashTagsArr[z].charAt(0) !== '#') {
      uploadHashtag.setCustomValidity('Хэш-тег должен начинаться с символа #');
    } else if (hashTagsArr.length > 5) {
      uploadHashtag.setCustomValidity('Не больше 5 хэштегов');
    } else if (hashTagsArr[z].length > 20) {
      uploadHashtag.setCustomValidity('Не больше 20 символов в одном хэштэге');
    } else if (hashTagsArr.length !== (new Set(hashTagsArr).size)) {
      uploadHashtag.setCustomValidity('Хэштеги не должны повторяться');
      // еще нужно добавить нечувствительность к регистру
    } else {
      uploadHashtag.setCustomValidity('');
    }
  }
};

submitButton.addEventListener('click', function () {
  myFunc();
});
