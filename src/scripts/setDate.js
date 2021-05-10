function calendarChanges() {
  $('.calendar-card').click(function () {
    if ($(this).hasClass('active')) {
      console.log("set manually date -> don't know how to do it )");
    }
    $('.calendar-card').removeClass('active');
    $(this).addClass('active');

    today = new Date(parseInt($(this).attr('id')));
    // Calculate shift with the given date
    getShift();
  });
}
calendarChanges();
