// GetEaster Date
function getEaster(year) {
  var f = Math.floor,
    // Golden Number - 1
    G = year % 19,
    C = f(year / 100),
    // related to Epact
    H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
    // number of days from 21 March to the Paschal full moon
    I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11)),
    // weekday for the Paschal full moon
    J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
    // number of days from 21 March to the Sunday on or before the Paschal full moon
    L = I - J,
    month = 3 + f((L + 40) / 44),
    day = L + 28 - 31 * f(month / 4);

  pasqua = ('0' + day).slice(-2) + '/' + ('0' + month).slice(-2);

  if (day == 31 && month == 3) {
    pasquetta = '01/04';
  } else {
    pasquetta = ('0' + (day + 1)).slice(-2) + '/' + ('0' + month).slice(-2);
  }
}

getEaster(today.getFullYear());
