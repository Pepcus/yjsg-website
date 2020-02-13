$(document).ready(function() {
  updateMosaic();
});


function updateMosaic() {
  var MIW = 100; // Mosaic Item Width

  var last_step = $('.mosaic_item').length % 5;
  var last_iteration = ($('.mosaic_item').length / 5 | 0);

  var buffer = getBuffer();

  function getBuffer() {
    switch (last_step) {
      case 1:
      case 2:
        return MIW;
        break;
      case 3:
      case 4:
        return MIW * 2;
        break;
      case 0:
        return 0;
        break;
    }
  }

  $("#mosaic").css({
    height: (last_iteration) * 3 * MIW + buffer,
  });

  $('.mosaic_item').each(function(index, el) {
    var step = index % 5 + 1;
    var iteration = index / 5 | 0;
    switch (step) {
      case 1:
        $(el).css({
          top: MIW * 3 * iteration,
          left: 0,
          width: MIW * 2,
          height: MIW,
        });
        break;
      case 2:
        if (((last_step == 4) || (last_step == 2)) && (iteration == last_iteration)) {
          $(el).css({
            top: MIW * 3 * iteration,
            left: MIW * 2,
            width: MIW,
            height: MIW,
          });
        } else {
          $(el).css({
            top: MIW * 3 * iteration,
            left: MIW * 2,
            width: MIW,
            height: MIW * 2,
          });
        }
        break;
      case 3:
        if ((last_step == 3) && (iteration == last_iteration)) {
          $(el).css({
            top: MIW * (3 * iteration + 1),
            left: 0,
            width: MIW * 2,
            height: MIW,
          });
        } else if ((last_step == 4) && (iteration == last_iteration)) {
          $(el).css({
            top: MIW * (3 * iteration + 1),
            left: 0,
            width: MIW,
            height: MIW,
          });
        } else {
          $(el).css({
            top: MIW * (3 * iteration + 1),
            left: 0,
            width: MIW,
            height: MIW * 2,
          });
        }
        break;
      case 4:
        if ((last_step == 1) && (iteration == last_iteration - 1)) {
          $(el).css({
            top: MIW * (3 * iteration + 1),
            left: MIW,
            width: MIW,
            height: MIW * 2,
          });
        } else if ((last_step == 4) && (iteration == last_iteration)) {
          $(el).css({
            top: MIW * (3 * iteration + 1),
            left: MIW,
            width: MIW * 2,
            height: MIW,
          });
        } else {
          $(el).css({
            top: MIW * (3 * iteration + 1),
            left: MIW,
            width: MIW,
            height: MIW,
          });
        }
        break;
      case 5:
        if ((last_step == 1) && (iteration == last_iteration - 1)) {
          $(el).css({
            top: MIW * (3 * iteration + 2),
            left: MIW * 2,
            width: MIW,
            height: MIW * 2,
          });
        } else {
          $(el).css({
            top: MIW * (3 * iteration + 2),
            left: MIW,
            width: MIW * 2,
            height: MIW,
          });
        }
        break;
    }
  });
}