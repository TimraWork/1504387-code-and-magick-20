'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYESCOLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_COUNT = 4;

var wizardsData = {
  names: WIZARD_NAMES,
  surnames: WIZARD_SURNAMES,
  coatColors: WIZARD_COATCOLORS,
  eyesColors: WIZARD_EYESCOLORS,
  count: WIZARD_COUNT
};

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

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

var wizards = createWizardsData(wizardsData);
renderSimilarWizards(wizards);

document.querySelector('.setup-similar').classList.remove('hidden');
