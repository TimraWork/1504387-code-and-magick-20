'use strict';
(function () {

  var Urls = {
    LOAD: 'https://javascript.pages.academy/code-and-magick/data',
    SAVE: 'https://javascript.pages.academy/code-and-magick',
  };

  var ajax = function (params) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        params.onLoad(xhr.response);
      } else {
        params.onError(xhr.status);
      }
    });

    xhr.open(params.method, params.url);

    if (params.data) {
      xhr.send(params.data);
    } else {
      xhr.send();
    }
  };

  var load = function (onLoad, onError) {
    ajax({
      url: Urls.LOAD,
      method: 'GET',
      onLoad: onLoad,
      onError: onError
    });
  };

  var save = function (data, onLoad, onError) {
    ajax({
      url: Urls.SAVE,
      method: 'POST',
      data: data,
      onLoad: onLoad,
      onError: onError
    });
  };

  window.backend = {
    load: load,
    save: save
  };

})();
