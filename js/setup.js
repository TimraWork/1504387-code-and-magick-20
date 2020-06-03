'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYESCOLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_COUNT = 4;

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var generateRandomDatа = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var createWizardsData = function () {
  var arr = [];
  for (var i = 0; i < WIZARDS_COUNT; i++) {
    arr.push(
        {
          name: generateRandomDatа(WIZARD_NAMES) + ' \n ' + generateRandomDatа(WIZARD_SURNAMES),
          coatColor: generateRandomDatа(WIZARD_COATCOLORS),
          eyesColors: generateRandomDatа(WIZARD_EYESCOLORS)
        }
    );
  }
  return arr;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColors;
  return wizardElement;
};

var renderSimilarWizards = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderWizard(arr[i]));
  }
  similarListElement.appendChild(fragment);
};

var wizards = createWizardsData();
renderSimilarWizards(wizards);

document.querySelector('.setup-similar').classList.remove('hidden');
