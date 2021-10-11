function getTodayShift() {
  var giorniLavorativi = 0;

  let dayLong = new Date(today);
  dayLong.setHours(0,0,0,0);

  // Distance between the start date and the end date 
  let diff = new Date (dayLong - new Date(primoGiorno));
  diff = diff/1000/60/60/24;

  for (let i = 0; i <= diff; i++) {
    let checkDate = ('0' + dayLong.getDate()).slice(-2) + '/' + ('0' + (dayLong.getMonth() + 1)).slice(-2) + '/' + dayLong.getFullYear();

    getEaster(checkDate.split('/').pop());

    if (dayLong.getDay() != 0 && !feste.includes(checkDate.substring(0, 5)) && checkDate.substring(0, 5) != pasqua && checkDate.substring(0, 5) != pasquetta) {
      giorniLavorativi++;
    }    
    dayLong.setDate(dayLong.getDate() - 1);
  }
  getEaster(today.getFullYear());

  let result = primaSosta - 1 + giorniLavorativi;


  if (result > 95) {
    while (result > 95) {
      result -= 95;
    }
  }
  else if (result < 0) {
    while (result < 0) {
      result += 95;
    }
  }

  return result;
}

function getShift() {
  fetch('./src/components/soste.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => $('#todayShift').html(data[getTodayShift() - 1].name));
}

function carouselShift(val) {
  $('.result').hide();
  today.setDate(today.getDate() + val);
  // today = new Date(dayLong);


  calendarDay();
  getShift(); // Mette il turno a FE (il turno calcolato)
  calendarChanges();
  // $('#home-icon').click();
}
