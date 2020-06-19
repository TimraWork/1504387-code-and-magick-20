'use strict';
(function () {

  var similar = document.querySelector('.setup-similar');
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var createWizardsData = function (wizardsData) {
    var wizards = [];
    for (var i = 0; i < wizardsData.COUNT; i++) {
      wizards.push(
          {
            name: window.util.getRandomItemFromArray(wizardsData.NAMES) + ' \n ' + window.util.getRandomItemFromArray(wizardsData.SURNAMES),
            coatColor: window.util.getRandomItemFromArray(wizardsData.COAT_COLORS),
            eyesColor: window.util.getRandomItemFromArray(wizardsData.EYES_COLORS),
          }
      );
    }
    return wizards;
  };

  var wizards = createWizardsData(window.wizardsData);

  var renderWizard = function (item) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = item.name;
    wizardElement.querySelector('.wizard-coat').style.fill = item.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = item.eyesColor;
    return wizardElement;
  };

  var renderSimilarWizards = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(renderWizard(arr[i]));
    }
    similarListElement.appendChild(fragment);
  };

  renderSimilarWizards(wizards);

  similar.classList.remove('hidden');

})();
