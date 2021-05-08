var pressTimer;
$('.history-element')
  .mouseup(function () {
    clearTimeout(pressTimer);
    // Clear timeout
    return false;
  })
  .mousedown(function () {
    // Set timeout
    pressTimer = window.setTimeout(function () {}, 500);
    return false;
  });

$('.history-element')
  .bind('touchend', function () {
    clearTimeout(pressTimer);
    // Clear timeout
    return false;
  })
  .bind('touchstart', function () {
    // Set timeout
    pressTimer = window.setTimeout(function () {}, 500);
    return false;
  });
