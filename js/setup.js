'use strict';

var WIZARDS_DATA = {
  names: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  surnames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  coatColors: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColors: ['black', 'red', 'blue', 'yellow', 'green'],
  fireBallColors: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
  count: 4
};

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var userDialog = document.querySelector('.setup');
var userDialogBtnOpen = document.querySelector('.setup-open .setup-open-icon');
var userDialogBtnClose = document.querySelector('.setup-close');

var userNameInput = document.querySelector('.setup-user-name');
var userNameMinLength = userNameInput.getAttribute('minlength');
var userNameMaxLength = userNameInput.getAttribute('maxlength');

var fireballColorInput = document.querySelector('input[name="fireball-color"]');
var coatColorInput = document.querySelector('input[name="coat-color"]');
var eyesColorInput = document.querySelector('input[name="eyes-color"]');

var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var wizardFireBall = document.querySelector('.setup-fireball-wrap');

var generateRandomDatа = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var createWizardsData = function (obj) {
  var arr = [];
  for (var i = 0; i < obj.count; i++) {
    arr.push(
        {
          name: generateRandomDatа(obj.names) + ' \n ' + generateRandomDatа(obj.surnames),
          coatColor: generateRandomDatа(obj.coatColors),
          eyesColors: generateRandomDatа(obj.eyesColors)
        }
    );
  }
  return arr;
};

var renderWizard = function (item) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = item.name;
  wizardElement.querySelector('.wizard-coat').style.fill = item.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = item.eyesColors;
  return wizardElement;
};

var renderSimilarWizards = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderWizard(arr[i]));
  }
  similarListElement.appendChild(fragment);
};

var wizards = createWizardsData(WIZARDS_DATA);
renderSimilarWizards(wizards);

document.querySelector('.setup-similar').classList.remove('hidden');

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

var setWizardColor = function (element, dataProperty, styleProperty, inputHidden) {
  var setRandomColor = generateRandomDatа(WIZARDS_DATA[dataProperty]);
  element.style[styleProperty] = setRandomColor;
  inputHidden.value = setRandomColor;
};

var onCoatColorChange = function () {
  setWizardColor(wizardCoat, 'coatColors', 'fill', coatColorInput);
};

var onEyesColorChange = function () {
  setWizardColor(wizardEyes, 'eyesColors', 'fill', eyesColorInput);
};

var onFireBallColorChange = function () {
  setWizardColor(wizardFireBall, 'fireBallColors', 'backgroundColor', fireballColorInput);
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
};

var openUserDialog = function () {
  userDialog.classList.remove('hidden');
  initUserDialogEventHandlers();
};

var closeUserDialog = function () {
  userDialog.classList.add('hidden');
  destroyUserDialogEventHandlers();
};
