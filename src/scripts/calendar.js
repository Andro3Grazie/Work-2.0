function calendarDay() {
  let day = new Date(today); // Initialized to a random date

  day.setDate(today.getDate() - 10); // Set the date 10 days before today

  $('.calendar-carousel').html('');

  for (let i = 0; i < 40; i++) {
    day.setDate(day.getDate() + 1); // Add one day
    let id = day.getTime(); // Give their date in ms to all the cards

    if (
      day.getDate() == today.getDate() &&
      day.getMonth() == today.getMonth()
    ) {
      $('.calendar-carousel').append(`
        <div class="carousel-item active">
          <div class="card calendar-card mx-auto active" id=${id}>
            <div class="card-body calendar-card-body p-0 text-center">
              <p class="card-title calendar-card-title mb-0 text-uppercase p-1">
              ${monthName[day.getMonth()]}
              </p>
              <p class="display-4 m-0" style="font-weight: 400">${day.getDate()}</p>
              <p class="mb-2" style="font-weight: 300">${
                dayName[day.getDay()]
              }</p>
            </div>
          </div>
        </div>
      `);
    } else {
      $('.calendar-carousel').append(`
        <div class="carousel-item">
          <div class="card calendar-card mx-auto" id=${id}>
            <div class="card-body calendar-card-body p-0 text-center">
              <p class="card-title calendar-card-title mb-0 text-uppercase p-1">
                ${monthName[day.getMonth()]}
              </p>
              <p class="display-4 m-0" style="font-weight: 400">${day.getDate()}</p>
              <p class="mb-2" style="font-weight: 300">${
                dayName[day.getDay()]
              }</p>
            </div>
          </div>
        </div>
      `);
    }
  }
}

// Prevent carousel to infinite loop
$('.carousel').carousel({
  wrap: false,
});

$('.calendar-today').click(() => {
  setToday();
});

function setToday() {
  today = new Date();

  calendarDay();
  getShift();
  calendarChanges();
}
