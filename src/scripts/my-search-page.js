$('.my-search-bar').focusout(function () {
  // If input is empty
  if (!$(this).val()) {
    $('.my-search-logo-text').hide();
    $('.my-search-placeholder').parent().parent().show();

    $(this).hide();
  }
});
$('.my-search-bar').focusin(function () {
  $('.my-search-logo-text').show();
  $('.my-search-placeholder').parent().parent().hide();

  // If input is not empty
  if ($(this).val()) $('.my-search-logo-delete').show();
  else $('.my-search-logo-delete').hide();
});
function openMySearch() {
  $('.search-page').hide();
  $('.my-search-page').show();
  $('.my-search-bar').show().focus();
  if ($('.my-search-bar').val() == '') $('.my-search-history').show();
}

$('.my-search-placeholder').click(function () {
  openMySearch();
});

$('.my-search-bar').bind('click keyup', function () {
  // If input is not empty
  if ($(this).val()) {
    $('.my-search-logo-delete').show();
  } else {
    $('.my-search-logo-delete').hide();
  }
});

$('.my-search-logo-delete').click(function () {
  $('.my-search-bar').val('').focus();
  $('.live-search-container').html('').hide();
  $('.my-search-history').show();
});
$('#my-search-arrow').click(function () {
  $('.my-search-bar').val('').focusout();
  $('.my-search-history').show();
  $('.live-search-container').html('').hide();
});
