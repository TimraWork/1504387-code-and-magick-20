'use strict';
(function () {
  window.util = {

    getRandomItemFromArray: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },

    getMaxElement: function (array) {
      var maxElement = array[0];
      for (var i = 0; i < array.length; i++) {
        if (array[i] > maxElement) {
          maxElement = array[i];
        }
      }
      return maxElement;
    },

    colorize: function (element, target) {
      var setRandomColor = window.util.getRandomItemFromArray(window.Wizards[target.toUpperCase() + '_COLORS']);

      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = setRandomColor;
      } else {
        element.style.fill = setRandomColor;
      }
      document.querySelector('input[name="' + target + '-color"]').value = setRandomColor;
    }

  };

})();
