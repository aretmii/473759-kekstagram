'use strict';
(function () {
  // ----------------------------------------------------------------------------ФУНКЦИИ (ПЕРЕТАСКИВАНИЕ)
  // --------------------функция применения эффекта при отпускании пина.
  // --------------------функция считает пропорцию, определяет положение пина относительно линии
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
  // ----------------------------------------------------------------------------ОБРАБОТЧИКИ
  // обработчик выбора эффекта и наложения эффекта на фото
  // нажимаем на эффект, эффект получает уровень 100%,
  // фотографии добавляется css стиль соотв. эффекту
  window.effectList.addEventListener('click', function (event) {
    window.effectFunc(event);
  });
  // обработчик события перетаскивания PIN
  window.effectLevelPin.addEventListener('mousedown', function (evt) {
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
      var pinVal = (window.effectLevelPin.offsetLeft - shift.x);
      // устанавливаем максимально и минимальное значение смещения ПИНа внутри ползунка
      var lowBound = 1;
      var highBound = 455;
      var numInput = pinVal;
      // вычисляем, если значение смещения превысило ширину ползунка, уменьшаем его
      var clamped = Math.max(lowBound, Math.min(numInput, highBound));
      // и записываем в стили ПИНа
      window.effectLevelPin.style.left = clamped + 'px';
      // изменяем стили в линии уровня заполнения effectValue
      window.effectValue.style.maxWidth = '455px';
      window.effectValue.style.width = window.effectLevelPin.style.left;
      // передаем значения в уровень эффекта
      window.levelPinUp();
      // записываем в value effectVal (скрытый input в разметке)
      window.effectVal.value = window.effectLevel;
      // записываем в переменную текущие стили элемента
      var strStyle = window.getComputedStyle(window.effectImgPreview, null);
      // записываем в переменную стиль filter текущих стилей элемента
      var str = strStyle.filter;
      // записываем в переменную текущее значение увроня эффекта filter (из строчного значения забираем цифры)
      // /\((.*)\)/  - все что внутри скобок
      var strArr = str.match(/\((.*)\)/);
      // из полученного массива берем второе значение - уровень эффекта
      var strVal = strArr[1];
      // заменяем полученное значение на значение от передвигающегося ползунка
      var result = str.replace(strVal, window.effectLevel);
      // записываем результат в стили фильтра элемента
      window.effectImgPreview.style.webkitFilter = result;
    };
    // при отпускании ПИНа перестаем слушать события движения мыши
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      onMouseMove(upEvt);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    // обработчики передвижения и отпускания ПИНа (делается на effectLevelLine)
    // для перемещения только внутри линии value
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
