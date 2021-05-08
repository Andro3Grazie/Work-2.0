// Check theme before loading page
$(document).ready(function () {
  if (getCookie('theme') == 'dark') toggleTheme();
});
calendarDay();
getShift();
getSoste();
getNomi();

var lastScrollTop = 0;
$(window).scroll(function (event) {
  var st = $(this).scrollTop();
  if (st > lastScrollTop) {
    // downscroll code
    $('footer').fadeOut('slow');
  } else {
    // upscroll code
    $('footer').fadeIn('slow');
  }
  lastScrollTop = st;
});

$('#home-icon').click(function () {
  $('.home-page').fadeIn();
  $('.search-page').hide();
  $('.my-search-page').hide();
  $('.my-search-history').hide();
  $('.live-search-container').hide();
  $('.single-page').hide();
});

$('.search-logo').click(function () {
  openMySearch();
});

$('#search-icon').click(function () {
  var clicks = $(this).data('clicks');
  // First clicks -> Open search page
  $('.home-page').hide();
  $('.search-page').show();
  $('.my-search-page').hide();
  $('.my-search-history').hide();
  $('.live-search-container').hide();
  if (clicks) {
    // Second Click -> Open search bar
    $('.single-page').hide();
    if ($('.my-search-bar').val() != '') $('.live-search-container').show();
    openMySearch();
  }
  $(this).data('clicks', !clicks);
});

$('#theme-icon').click(function () {
  toggleTheme();
});

function getSoste() {
  fetch('./src/components/soste.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      soste = data;
    });
  return true;
}
function getNomi() {
  fetch('./src/components/nominativi.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      nomi = data;
    });
  return true;
}
function fixName(val) {
  for (let i = 0; i < val.length; i++) {
    val[i].name = val[i].name.toLowerCase().replace(/\s+/g, ' ').trim();
  }
}
