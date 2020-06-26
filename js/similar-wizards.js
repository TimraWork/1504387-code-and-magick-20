'use strict';
(function () {
  var similar = document.querySelector('.setup-similar');
  var similarList = document.querySelector('.setup-similar-list');
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
    var wizardsCount = arr.length > window.Wizards.COUNT ? window.Wizards.COUNT : arr.length;
    similarList.innerHTML = '';
    for (var i = 0; i < wizardsCount; i++) {
      fragment.appendChild(renderWizard(arr[i]));
    }
    similarList.appendChild(fragment);
  };

  var getRating = function (wizard) {
    var rating = 0;

    if (wizard.colorCoat === coatColor) {
      rating += 2;
    }

    if (wizard.colorEyes === eyesColor) {
      rating += 1;
    }

    return rating;
  };

  var compareNames = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var coatColor;
  var eyesColor;

  var update = function (coat, eyes) {
    coatColor = coat ? coat : coatColor;
    eyesColor = eyes ? eyes : eyesColor;

    renderSimilarWizards(wizards.sort(function (left, right) {

      var ratingDiff = getRating(right) - getRating(left);

      if (ratingDiff === 0) {
        ratingDiff = compareNames(left.name, right.name);
      }
      return ratingDiff;
    }));
  };

  var wizards = [];

  var onLoad = function (response) {
    wizards = response;
    update();
    similar.classList.remove('hidden');
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'text-align: center; background-color: red; font-size: 20px; padding: 10px; margin: 0 0 20px;';
    node.textContent = 'Похожие персонажи не загружены. Код ошибки: ' + errorMessage;
    similar.insertAdjacentElement('beforeBegin', node);
  };

  var load = function (coat, eyes) {
    coatColor = coat;
    eyesColor = eyes;
    window.backend.load(onLoad, onError);
  };

  window.similarWizards = {
    update: update,
    load: load
  };

})();
