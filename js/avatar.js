'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileChooser = document.querySelector('.upload input[type=file]');
  var preview = document.querySelector('.setup-user-pic');
  var initialPreviewSrc = preview.getAttribute('src');
  var setupUser = document.querySelector('.setup-user');

  var showError = function () {
    var node = document.createElement('div');
    node.style = 'color: red; font-size: 13px; margin-bottom: 10px;';
    node.textContent = 'Загрузите изображение формата gif, jpg, jpeg или png';
    setupUser.insertAdjacentElement('beforeBegin', node);
    setTimeout(function () {
      node.remove();
    }, 3000);
  };

  var onChangeAvatar = function () {
    var file = fileChooser.files[0];
    if (file) {
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });
        reader.readAsDataURL(file);
      } else {
        showError();
      }
    } else {
      preview.src = initialPreviewSrc;
    }
  };

  window.avatar = {
    init: function () {
      fileChooser.addEventListener('change', onChangeAvatar);
    },
    destroy: function () {
      fileChooser.removeEventListener('change', onChangeAvatar);
    }
  };
})();
