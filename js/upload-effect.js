'use strict';
// -------------------------ФУНКЦИИ СТИЛИЗАЦИЙ---------------------------------------------
(function () {
  var effectList = document.querySelector('.upload-effect-controls');
  var effectImgPreview = document.querySelector('.effect-image-preview');
  var effectOriginal = document.querySelector('.upload-effect-label');
  var effectVal = document.querySelector('.upload-effect-level-value');
  var effectSepia = document.querySelector('.effect-image-preview');
  window.effectLevelPin = document.querySelector('.upload-effect-level-pin');
  var effectLevelLine = document.querySelector('.upload-effect-level-line');
  window.effectValue = document.querySelector('.upload-effect-level-val');
  var uploadEffect = document.querySelector('.upload-effect-level');
  // функция вычисляющая длину effectLevelLine
  var lineLength = function () {
    var lineLengthValue = effectLevelLine.clientWidth;
    return lineLengthValue;
  };
  // функция применения эффекта при отпускании пина.
  // функция считают пропорцию, определяет положение пина относительно линии
  var levelPinUp = function () {
    var x = lineLength();
  // записываем в переменную ширину линии уровня эффекта
    var q = effectValue.style.width;
  // приводим строковое значение ширины линии к цифрам
    var y = parseInt(q, 10);
    // считаем в процентах. х - 100%; у - ?
    var calc = y / x;
    var effectLevel = calc.toFixed(1);
    effectVal.value = effectLevel;
    console.log(effectVal.value);
  };
  // функция
  // функция добавляющая класс стиля изображению
  var effectFunc = function (event) {
    var targetEff = event.target;
    // находим id input и записываем его в переменную
    var targetInp = targetEff.id;
    // не даем при клике по уровню эффекта убирать класс эффекта
    uploadEffect.addEventListener('click', function (event) {
      event.stopPropagation();
    });
    // убираем из id префикс upload- и записываем в переменную
    // levelPinUp();
    var imgEffect = targetInp.replace('upload-', '');
    effectImgPreview.className = 'effect-image-preview' + ' ' + imgEffect;
    // effectValue.style.width = '455px';
    // effectLevelPin.style.left = '455px';
  };
  // обработчик выбора эффекта и наложения эффекта на фото
  // нажимаем на эффект, эффект получает уровень 100%,
  // фотографии добавляется css стиль соотв. эффекту
  effectList.addEventListener('click', effectFunc);
  // -------------------------------------------------------------------------------------------ПЕРЕТАСКИВАНИЕ
  // обработчик события перетаскивания PIN
  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    // записываем в объект начальные координаты ПИНа
    var startCoords = {
      x: evt.clientX,
    };
    // обновляем координаты во время перемещения
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      // объект шифт получающий смещение курсора
      var shift = {
        x: startCoords.x - moveEvt.clientX
      };
      // переопределяем начальные координаты ПИНа
      startCoords = {
        x: moveEvt.clientX
      };
  // изменяем стили в ПИНе, штобы реализовать смещение
  // записываем в переменную значение смещения ПИНа
      var pinVal = (effectLevelPin.offsetLeft - shift.x);
  // устанавливаем максимально и минимальное значение смещения ПИНа внутри ползунка
      var lowBound = 1;
      var highBound = 455;
      var numInput = pinVal;
  // вычисляем, если значение смещения превысило ширину ползунка, уменьшаем его
      var clamped = Math.max(lowBound, Math.min(numInput, highBound));
  // и записываем в стили ПИНа
      effectLevelPin.style.left = clamped + "px";
  // изменяем стили в линии уровня заполнения effectValue
      effectValue.style.maxWidth = "455px";
      effectValue.style.width = effectLevelPin.style.left;
  // передаем значения в уровень эффекта
      levelPinUp();
    };
  // при отпускании ПИНа перестаем слушать события движения мыши
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    // обработчики передвижения и отпускания ПИНа (делается на effectLevelLine)
    // для перемещения только внутри линии value
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
