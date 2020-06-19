'use strict';
(function () {

  var fireballSize = 22;
  var wizardWidth = 70;
  var wizardHeight = 1.337 * wizardWidth;
  var wizardSpeed = 3;

  function getFireballSpeed(isWindFromLeft) {
    return isWindFromLeft ? 5 : 2;
  }

  function getWizardX(gameFieldWidth) {
    return (gameFieldWidth - wizardWidth) / 2;
  }

  function getWizardY(gameFieldHeight) {
    return gameFieldHeight / 3;
  }

  window.fireballSize = fireballSize;
  window.wizardWidth = wizardWidth;
  window.wizardHeight = wizardHeight;
  window.wizardSpeed = wizardSpeed;
  window.getFireballSpeed = getFireballSpeed;
  window.getWizardX = getWizardX;
  window.getWizardY = getWizardY;

})();
