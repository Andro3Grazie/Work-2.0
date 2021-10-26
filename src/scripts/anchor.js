function setAnchor(pageName) {

  let url = window.location.href.split('?=', 2)[1];

  if (pageName != url) {
    history.pushState(null, '', '?=' + pageName);
  }
//   console.log('page name: ', pageName + '\nurl: ', url);
}
window.addEventListener('popstate', function (event) {
  let newUrl = window.location.href.split('?=', 2)[1];

  // console.log(event);

  if (newUrl == 'livesearchpage') {
    $('.home-page').hide();
    $('.search-page').show();
    $('.my-search-page').hide();
    $('.my-search-history').hide();
    $('.no-recent-search').hide();
    $('.live-search-container').hide();
    $('.manualShift-page').hide();
    $('.single-page').hide();

    $('.single-page').hide();
    if ($('.my-search-bar').val() != '') $('.live-search-container').show();
    openMySearch();
  }
  if (newUrl == 'homepage') {
      // hide keyboard
    document.activeElement.blur();

    $('.home-page').fadeIn();
    $('.search-page').hide();
    $('.my-search-page').hide();
    $('.my-search-history').hide();
    $('.no-recent-search').hide();
    $('.live-search-container').hide();
    $('.manualShift-page').hide();
    $('.single-page').hide();
  }
  if (newUrl == 'searchpage') {
      // hide keyboard
    document.activeElement.blur();

    $('.home-page').hide();
    $('.search-page').show();
    $('.my-search-page').hide();
    $('.my-search-history').hide();
    $('.no-recent-search').hide();
    $('.live-search-container').hide();
    $('.manualShift-page').hide();
    $('.single-page').hide();

  }
  if (newUrl == 'preferiti') {
      // hide keyboard
    document.activeElement.blur();

    getList('preferiti');

  }
  if (newUrl == 'soste') {
      // hide keyboard
    document.activeElement.blur();

    getList('sosta');
  }
  if (newUrl == 'nominativi') {
      // hide keyboard
    document.activeElement.blur();

    getList('nome');
  }
  if (newUrl == 'manualshift') {
      
    openManualShiftSearch(); // Comprende: home-page.hide e manualShift-page.show :)
    $('.search-page').hide();
    $('.my-search-page').hide();
    $('.my-search-history').hide();
    $('.no-recent-search').hide();
    $('.live-search-container').hide();    
    $('.single-page').hide();
  }
});