'use strict';

(function () {

  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
  var CLOUD_COLOR = '#fff';
  var GAP = 10;

  var FONT_GAP = 16;
  var FONT_FAMILY = 'PT Mono';
  var FONT_COLOR = '#000';

  var BAR_WIDTH = 40;
  var BAR_GAP = 50;
  var BAR_MAX_HEIGHT = 150;

  var textX = CLOUD_X + BAR_GAP;
  var textY = CLOUD_Y + GAP * 2;

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var renderTitles = function (ctx) {
    ctx.font = FONT_GAP + 'px ' + FONT_FAMILY;
    ctx.textBaseline = 'hanging';
    ctx.fillStyle = FONT_COLOR;
    ctx.fillText('Ура вы победили!', textX, textY);
    ctx.fillText('Список результатов!', textX, textY + FONT_GAP);
  };

  var setBarColor = function (ctx, players, index) {
    var randomHue = Math.ceil(Math.random() * 100 + 1);
    if (players[index] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240,' + randomHue + '% , 50%)';
    }
  };

  var renderBars = function (ctx, players, times) {
    for (var i = 0; i < players.length; i++) {

      var textPlayerX = textX + (BAR_WIDTH + BAR_GAP) * i;
      var textPlayerY = CLOUD_HEIGHT - GAP * 2;
      ctx.fillText(players[i], textPlayerX, textPlayerY);

      setBarColor(ctx, players, i);

      var maxTime = window.util.getMaxElement(times);
      var barHeight = BAR_MAX_HEIGHT * times[i] / maxTime;
      var barY = textPlayerY - FONT_GAP / 2;
      ctx.fillRect(textPlayerX, barY, BAR_WIDTH, -barHeight);

      var textTimePlayerY = barY - barHeight - FONT_GAP;
      ctx.fillStyle = FONT_COLOR;
      ctx.fillText(Math.round(times[i]), textPlayerX, textTimePlayerY);
    }
  };

  window.renderStatistics = function (ctx, players, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_SHADOW_COLOR);
    renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);
    renderTitles(ctx);
    renderBars(ctx, players, times);
  };
})();
