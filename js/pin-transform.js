'use strict';
// -------------------------------------------------------------------------------------------ПЕРЕТАСКИВАНИЕ
  var effectLevelPin = document.querySelector('.upload-effect-level-pin');
  var effectLevelLine = document.querySelector('.upload-effect-level-line');
  var effectValue = document.querySelector('.upload-effect-level-val');
  var uploadEffect = document.querySelector('.upload-effect-level');
  // effectLevelPin
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
      let lowBound = 1;
      let highBound = 455;
      let numInput = pinVal;
  // вычисляем, если значение смещения превысило ширину ползунка, уменьшаем его
      let clamped = Math.max(lowBound, Math.min(numInput, highBound));
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
