function getTodayShift() {
  var giorniLavorativi = 0;

  let dayLong = new Date();

  dayLong.setDate(today.getDate()); // Set the date

  while (
    dayLong.getDate() >= primoGiorno.getDate() &&
    dayLong.getMonth() >= primoGiorno.getMonth() &&
    dayLong.getFullYear() >= primoGiorno.getFullYear()
  ) {
    let checkDate =
      ('0' + dayLong.getDate()).slice(-2) +
      '/' +
      ('0' + (dayLong.getMonth() + 1)).slice(-2);
    if (
      dayLong.getDay() != 0 &&
      !feste.includes(checkDate) &&
      checkDate != pasqua &&
      checkDate != pasquetta
    ) {
      giorniLavorativi++;
    }

    dayLong.setDate(dayLong.getDate() - 1);
  }
  let result = primaSosta - 1 + giorniLavorativi;
  if (result > 95) result -= 95;
  else if (result < 0) result += 95;

  return result;
}

function getShift() {
  fetch('./src/components/soste.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => $('#todayShift').html(data[getTodayShift() - 1].name));
}
