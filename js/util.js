'use strict';
// ------------------------------------------------------------------------------СОЗДАНИЕ ДАННЫХ ДЛЯ ФОРМ
window.util = (function () {
  var escButton = 27;
  var enterButton = 13;

  return {
    // функция закрытия overlay при escButton
    closeOverlayEsc: function (evt, action) {
      if (evt.keyCode === escButton) {
        action();
      }
    },
    // функция закрытия overlay при enerButton
    uploadCloseEnter: function (evt, action) {
      if (evt.keydown === enterButton) {
        action();
      }
    }
  };
})();
