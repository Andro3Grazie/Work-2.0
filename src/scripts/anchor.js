function setAnchor(pageName) {

  let url = window.location.href.split('?=', 2)[1];

  if (pageName != url) history.pushState(null, '', '?=' + pageName);
}
window.addEventListener('popstate', function (event) {
  let newUrl = window.location.href.split('?=', 2)[1];

  // console.log(event);

  if (newUrl == 'livesearchpage') {
    $('.home-page').hide();
    $('.search-page').show();
    $('.my-search-page').hide();
    $('.my-search-history').hide();
    $('.live-search-container').hide();
    $('.manualShift-page').hide();
    $('.single-page').hide();

    $('.single-page').hide();
    if ($('.my-search-bar').val() != '') $('.live-search-container').show();
    openMySearch();
  }
  if (newUrl == 'homepage') {
    $('.home-page').fadeIn();
    $('.search-page').hide();
    $('.my-search-page').hide();
    $('.my-search-history').hide();
    $('.live-search-container').hide();
    $('.manualShift-page').hide();
    $('.single-page').hide();

    // hide keyboard
    $('.manualShift-bar').focusout();
    $('.my-search-bar').focusout();
  }
  if (newUrl == 'searchpage') {
    $('.home-page').hide();
    $('.search-page').show();
    $('.my-search-page').hide();
    $('.my-search-history').hide();
    $('.live-search-container').hide();
    $('.manualShift-page').hide();
    $('.single-page').hide();

    // hide keyboard
    $('.manualShift-bar').focusout();
    $('.my-search-bar').focusout();
  }
  if (newUrl == 'preferiti') {
    getList('preferiti');

  }
  if (newUrl == 'soste') {
    getList('sosta');
  }
  if (newUrl == 'nominativi') {
    getList('nome');
  }
  if (newUrl == 'manualshift') {
    openManualShiftSearch(); // Comprende: home-page.hide e manualShift-page.show :)
    $('.search-page').hide();
    $('.my-search-page').hide();
    $('.my-search-history').hide();
    $('.live-search-container').hide();    
    $('.single-page').hide();
  }
});