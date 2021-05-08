$('.result').click(function () {
  $('.result .nome').toggle();
  $('.result .sosta').toggle();
});

function getResult(val, id) {
  $('.result').show();

  if (val == 'nome') {
    let result;

    if (id > idTurno) {
      result = id - idTurno;
      result = getTodayShift() + result;
    } else {
      result = idTurno - id;
      result = getTodayShift() - result;
    }

    if (result > 95) result -= 95;
    if (result < 0) result += 95;

    $('.result .sosta').html(soste[result - 1]['name']);
    $('.result .nome').html(nomi[id - 1]['name']);
  } else {
    let i = getTodayShift();
    let k = 0;
    while (i != id) {
      i++;
      k++;
      if (i >= 95) {
        i = 0;
      }
    }

    let resultId = idTurno + k;

    if (resultId > 95) resultId -= 95;
    if (resultId < 0) resultId += 95;

    $('.result .nome').html(nomi[resultId - 1]['name']);
    $('.result .sosta').html(soste[id - 1]['name']);
  }

  val == 'nome' ? $('.result .sosta').show() : $('.result .nome').show();

  $('#home-icon').click();
}
