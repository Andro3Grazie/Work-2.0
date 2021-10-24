// Check theme before loading page
$(document).ready(function () {
  if (getCookie('theme') == 'dark') toggleTheme();

  winHeight = $(window).height();

  setAnchor('homepage');

});
calendarDay();
getShift();
getSoste();
getNomi();

// checkSavedElements();

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

  setAnchor('homepage');
  
  $('.home-page').fadeIn();
  $('.search-page').hide();
  $('.my-search-page').hide();
  $('.my-search-history').hide();
  $('.no-recent-search').hide();
  $('.live-search-container').hide();
  $('.single-page').hide();
  $('.manualShift-page').hide();
});

$('.search-logo').click(function () {
  openMySearch();
  $('.live-search-container').show();
  clicks = false;
  $('#search-icon').data('clicks', clicks); // -> Reset click
  
  setAnchor('livesearchpage');

});

$('#search-icon').click(function () {
  clicks = $(this).data('clicks');

  setAnchor('searchpage');

  // First clicks -> Open search page
  $('.home-page').hide();
  $('.search-page').show();
  $('.my-search-page').hide();
  $('.my-search-history').hide();
  $('.no-recent-search').hide();
  $('.live-search-container').hide();
  $('.manualShift-page').hide();

  if (clicks && $('.search-page').is(':visible')) {
    // Second Click -> Open search bar
    setAnchor('livesearchpage');

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

// Check if keyboard is up on mobile
// resize event listener to detect change in screen height
window.addEventListener('resize', () => {
  if (winHeight > $(window).height() + 100) {
    $('.footer').hide();
  } else $('.footer').fadeIn();
});

// setInterval(() => {
//   $('.wip-emoji').fadeIn('slow');
// }, 10000);


function replaceSpecialChar(id) {
  // return "#" + id.replace( /(:|\.|\[|\]|,|=|@)/g, "\\$1" );
  return "#" + id.replace(/^[^a-z]+|[^\w:.-]+/gi, '\\$1');
}