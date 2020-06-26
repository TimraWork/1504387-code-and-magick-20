'use strict';
(function () {
  var coatColor = 'rgb(101, 137, 164)';
  var eyesColor = 'black';

  window.similarWizards.load(coatColor, eyesColor);

  var onCoatColorChange = window.util.debounce(function () {
    coatColor = window.util.colorize(wizardCoat, 'coat');
    window.similarWizards.update(coatColor, eyesColor);
  });

  var onEyesColorChange = window.util.debounce(function () {
    eyesColor = window.util.colorize(wizardEyes, 'eyes');
    window.similarWizards.update(coatColor, eyesColor);
  });

  var onFireBallColorChange = function () {
    window.util.colorize(wizardFireBall, 'fireball');
  };

  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireBall = document.querySelector('.setup-fireball-wrap');

  var initHandlers = function () {
    wizardCoat.addEventListener('click', onCoatColorChange);
    wizardEyes.addEventListener('click', onEyesColorChange);
    wizardFireBall.addEventListener('click', onFireBallColorChange);
  };

  var destroyHandlers = function () {
    wizardCoat.removeEventListener('click', onCoatColorChange);
    wizardEyes.removeEventListener('click', onEyesColorChange);
    wizardFireBall.removeEventListener('click', onFireBallColorChange);
  };

  window.wizard = {
    initHandlers: initHandlers,
    destroyHandlers: destroyHandlers,
  };
})();
