'use strict';
(function () {
  // --------------------------------------------------------------------------------------ПЕРЕМЕННЫЕ
  window.effectList = document.querySelector('.upload-effect-controls');
  window.effectImgPreview = document.querySelector('.effect-image-preview');
  window.effectVal = document.querySelector('.upload-effect-level-value');
  window.effectChrome = document.querySelector('.effect-image-preview effect-chrome');
  window.effectLevelPin = document.querySelector('.upload-effect-level-pin');
  window.effectLevelLine = document.querySelector('.upload-effect-level-line');
  window.effectValue = document.querySelector('.upload-effect-level-val');
  var uploadEffect = document.querySelector('.upload-effect-level');
  // функция
  // функция добавляющая класс стиля изображению
  window.effectFunc = function (event) {
    var targetEff = event.target;
    // находим id input и записываем его в переменную
    var targetInp = targetEff.id;
    // не даем при клике по уровню эффекта убирать класс эффекта
    uploadEffect.addEventListener('click', function (evt) {
      evt.stopPropagation();
    });
    // убираем из id префикс upload- и записываем в переменную
    var imgEffect = targetInp.replace('upload-', '');
    effectImgPreview.className = 'effect-image-preview' + ' ' + imgEffect;
    console.log(effectImgPreview.className);
    window.effectValue.style.width = '455px';
    window.effectLevelPin.style.left = '455px';
  };
  // ----------------------------------------------------------------------------ФУНКЦИИ (ПЕРЕТАСКИВАНИЕ)
  // функция применения эффекта при отпускании пина.
  // функция считает пропорцию, определяет положение пина относительно линии
  window.levelPinUp = function () {
    // -------------------функция вычисляющая длину effectLevelLine
    var lineLength = function () {
      var lineLengthValue = window.effectLevelLine.clientWidth;
      return lineLengthValue;
    };
    // вызываем функцию для вычислени длины и записываем результат в x
    var x = lineLength();
    // записываем в переменную ширину линии уровня эффекта
    var q = window.effectValue.style.width;
    // приводим строковое значение ширины линии к цифрам
    var y = parseInt(q, 10);
    // считаем в процентах. х - 100%; у - ?
    var calc = y / x;
    // форматируем число приводим к одному значению после 0.
    window.effectLevel = calc.toFixed(1);
  };
})();
