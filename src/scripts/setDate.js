function calendarChanges() {
  $('.calendar-card').click(function () {
    if ($(this).hasClass('active')) {
      
      $('#date-modal').modal('show');

      $('#date-modal input').on('input', function () {
        $(this).removeClass('error');
        $('.error-message').hide();
      });

      $('#date-modal .btn-send').on('click', () => {
        // console.log($('#date-modal input').val());
        if ($('#date-modal input').val() != '') {
          today = new Date($('#date-modal input').val());

          calendarDay();
          getShift();
          calendarChanges();

          // console.log(today);
          $('#date-modal').modal('hide');
        } else {
          $('#date-modal input').addClass('error');
          $('.error-message').fadeIn();
        }
      });
    }
    $('.calendar-card').removeClass('active');
    $(this).addClass('active');

    today = new Date(parseInt($(this).attr('id')));

    // console.log(today);
    // Calculate shift with the given date
    getShift();
  });
}
calendarChanges();
