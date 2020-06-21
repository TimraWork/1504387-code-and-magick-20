'use strict';
(function () {

  var setupSubmit = document.querySelector('.setup-submit');
  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireBall = document.querySelector('.setup-fireball-wrap');

  var onCoatColorChange = function () {
    window.util.colorize(wizardCoat, 'coat');
  };

  var onEyesColorChange = function () {
    window.util.colorize(wizardEyes, 'eyes');
  };

  var onFireBallColorChange = function () {
    window.util.colorize(wizardFireBall, 'fireball');
  };

  var userNameInput = document.querySelector('.setup-user-name');
  var userNameMinLength = userNameInput.getAttribute('minlength');
  var userNameMaxLength = userNameInput.getAttribute('maxlength');

  var onNameInputInvalid = function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('имя персонажа не может содержать менее ' + userNameMinLength + ' символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('максимальная длина имени персонажа — ' + userNameMaxLength + ' символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  };
  var onNameInputChange = function () {
    var valueLength = userNameInput.value.length;
    if (valueLength > userNameMinLength || valueLength < userNameMaxLength) {
      userNameInput.setCustomValidity('');
    }
  };

  var userDialog = document.querySelector('.setup');
  var userDialogBtnOpen = document.querySelector('.setup-open .setup-open-icon');
  var userDialogBtnClose = document.querySelector('.setup-close');

  userDialogBtnOpen.addEventListener('click', function () {
    openUserDialog();
  });

  userDialogBtnOpen.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      openUserDialog();
    }
  });

  var onUserDialogEscPress = function (evt) {
    if (evt.key === 'Escape' && !evt.target.matches('.setup-user-name')) {
      closeUserDialog();
    }
  };

  var onUserDialogEnterPress = function (evt) {
    if (evt.key === 'Enter') {
      closeUserDialog();
    }
  };

  var onUserDialogClose = function () {
    closeUserDialog();
  };

  var initUserDialogEventHandlers = function () {
    document.addEventListener('keydown', onUserDialogEscPress);

    userDialogBtnClose.addEventListener('keydown', onUserDialogEnterPress);
    userDialogBtnClose.addEventListener('click', onUserDialogClose);

    userNameInput.addEventListener('invalid', onNameInputInvalid);
    userNameInput.addEventListener('input', onNameInputChange);

    wizardCoat.addEventListener('click', onCoatColorChange);
    wizardEyes.addEventListener('click', onEyesColorChange);
    wizardFireBall.addEventListener('click', onFireBallColorChange);

    window.dragAndDrop.init();
  };

  var destroyUserDialogEventHandlers = function () {
    document.removeEventListener('keydown', onUserDialogEscPress);

    userDialogBtnClose.removeEventListener('keydown', onUserDialogEnterPress);
    userDialogBtnClose.removeEventListener('click', onUserDialogClose);

    userNameInput.removeEventListener('invalid', onNameInputInvalid);
    userNameInput.removeEventListener('input', onNameInputChange);

    wizardCoat.removeEventListener('click', onCoatColorChange);
    wizardEyes.removeEventListener('click', onEyesColorChange);
    wizardFireBall.removeEventListener('click', onFireBallColorChange);

    window.dragAndDrop.destroy();
  };

  var openUserDialog = function () {
    userDialog.classList.remove('hidden');
    userDialog.removeAttribute('style');
    initUserDialogEventHandlers();
  };

  var closeUserDialog = function () {
    userDialog.classList.add('hidden');
    destroyUserDialogEventHandlers();
  };

  var onLoad = function () {
    userDialog.classList.add('hidden');
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = ' background-color: red; font-size: 20px; padding: 10px; text-align: center;';
    node.textContent = 'Данные не сохранены! Ошибка сервера: ' + errorMessage;
    document.body.insertAdjacentElement('afterBegin', node);
    setupSubmit.insertAdjacentElement('beforeBegin', node);
    setTimeout(function () {
      node.remove();
    }, 4000);
  };

  var form = userDialog.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onLoad, onError);
    evt.preventDefault();
  });

})();
