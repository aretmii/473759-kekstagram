'use strict';
// -------------------------------------------------------------------------------------------ВАЛИДАЦИЯ
(function () {
  var uploadHashtag = document.querySelector('.upload-form-hashtags');
  var submitButton = document.querySelector('.upload-form-submit');

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
      var firstLetter = hashTagsArr[z].charAt(0);
      if (hashTagsArr[z].length > 20) {
        uploadHashtag.setCustomValidity('Хэш-тег максимум 20 символов');
      } else if (firstLetter !== '#') {
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
})();
