$('.result').click(function () {
  $('.result .nome').toggle();
  $('.result .sosta').toggle();
  $('.result .id-sosta').toggle();
  $('.result .id-nome').toggle();
});

function getResult(val, id) {
  $('.result').show();
  $('.result .nome').hide();
  $('.result .sosta').hide();
  $('.result .id-sosta').hide();
  $('.result .id-nome').hide();

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
    $('.result .id-sosta').html(`${soste[result - 1]['id']} - `);
    $('.result .id-nome').html(`${nomi[id - 1]['id']} - `);
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
    $('.result .id-nome').html(`${nomi[resultId - 1]['id']} - `);
    $('.result .id-sosta').html(`${soste[id - 1]['id']} -`);
  }

  if (val == 'nome') {
    $('.result .sosta').show();
    $('.result .id-sosta').show();
  } else {
    $('.result .nome').show();
    $('.result .id-nome').show();
  }

  $('#home-icon').click();

}
