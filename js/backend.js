'use strict';
// ------------------------------------------------------------------------------Отправка и получение данных
(function () {
  // URL адреса сервера куда отправляем данные
  var URL = 'https://js.dump.academy/kekstagram';
  var getURL = 'https://js.dump.academy/kekstagram/data';
  // ------------------------------------------------------------------------------ПОЛУЧЕНИЕ
  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('GET', getURL);

    xhr.send();
  };
  // ------------------------------------------------------------------------------ОТПРАВКА
  // функция загрузки данных на сервер
  window.upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    // тип данных
    xhr.responseType = 'json';
    // обработчик загрузки данных, если все успешно вызывается функция
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    // передаем в параметр xhr.open метод POST
    xhr.open('POST', URL);
    // передаем в параметр xhr.send информацию для передачи на сервер
    xhr.send(data);
  };
})();
