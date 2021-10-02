function setAnchor(pageName) {
  history.pushState(null, '', '?=' + pageName);
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
    if ($('.my-search-bar').val() != '') $('.live-search-container').show();
    openMySearch();
  }
  if (newUrl == 'homepage') {
    $('.home-page').fadeIn();
    $('.search-page').hide();
    $('.my-search-page').hide();
    $('.my-search-history').hide();
    $('.live-search-container').hide();
    $('.single-page').hide();
    $('.manualShift-page').hide();
  }
  if (newUrl == 'searchpage') {
    $('.home-page').hide();
    $('.search-page').show();
    $('.my-search-page').hide();
    $('.my-search-history').hide();
    $('.live-search-container').hide();
    $('.manualShift-page').hide();
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
});