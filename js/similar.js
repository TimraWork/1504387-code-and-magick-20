'use strict';
(function () {
  var similar = document.querySelector('.setup-similar');
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (item) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = item.name;
    wizardElement.querySelector('.wizard-coat').style.fill = item.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = item.colorEyes;
    return wizardElement;
  };

  var renderSimilarWizards = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.Wizards.COUNT; i++) {
      var randomElement = window.util.getRandomItemFromArray(arr);
      fragment.appendChild(renderWizard(randomElement));
    }
    similarListElement.appendChild(fragment);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'text-align: center; background-color: red; font-size: 20px; padding: 10px; margin: 0 0 20px;';
    node.textContent = 'Похожие персонажи не загружены. Код ошибки: ' + errorMessage;
    similar.insertAdjacentElement('beforeBegin', node);
  };

  var onLoad = function (wizards) {
    renderSimilarWizards(wizards);
    similar.classList.remove('hidden');
  };

  window.backend.load(onLoad, onError);

})();
