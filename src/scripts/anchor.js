function setAnchor(pageName) {

  let url = window.location.href.split('?=', 2)[1];

  if (pageName != url) {
    history.pushState(null, '', '?=' + pageName);
  }
}
window.addEventListener('popstate', function (event) {
  let newUrl = window.location.href.split('?=', 2)[1];
  // console.log(event);

  if (newUrl == 'livesearchpage') {
    // hide keyboard
    // openMySearch();

    // Open keyboard
    $('.my-search-bar').focus();

    showList();

    openMySearch();
    if ($('.my-search-bar').val() != '') {
       $('.live-search-container').show();
    }
    
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

    showList();
  }
  if (newUrl == 'preferiti') {
    // hide keyboard
    document.activeElement.blur();

    showList();
    getList('preferiti');
  }
  if (newUrl == 'soste') {
    // hide keyboard
    document.activeElement.blur();

    showList();
    getList('sosta');
  }
  if (newUrl == 'nominativi') {
    // hide keyboard
    document.activeElement.blur();

    showList();    
    getList('nome');
  }
  if (newUrl == 'manualshift') {
    // Open keyboard
    openManualShiftSearch(); // Comprende: home-page.hide e manualShift-page.show :)

    $('.search-page').hide();
    $('.my-search-page').hide();
    $('.my-search-history').hide();
    $('.no-recent-search').hide();
    $('.live-search-container').hide();    
    $('.single-page').hide();
  }
});

function searchPageHide() {
  $('.home-page').hide();
  $('.search-page').show();
  $('.my-search-page').hide();
  $('.my-search-history').hide();
  $('.no-recent-search').hide();
  $('.live-search-container').hide();
  $('.manualShift-page').hide();
  $('.single-page').hide();
}