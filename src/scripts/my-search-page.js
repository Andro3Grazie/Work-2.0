$('.my-search-bar').focusout(function () {
  // If input is empty
  if (!$(this).val()) {
    $('.my-search-logo-text').hide();
    $('.my-search-placeholder').parent().parent().show();

    $(this).hide();
  }
  getSearchedTerm();
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
  if ($('.my-search-bar').val() == '') {
    let oldSearchedTerms = getCookie('recentSearchedTerms').split(',');
    if (oldSearchedTerms[0] != '') {
      $('.my-search-history').show();
      getRecentSearchItems();
    } else {
      $('.no-recent-search').fadeIn('slow');
    }
  }
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
  let oldSearchedTerms = getCookie('recentSearchedTerms').split(',');
  if (oldSearchedTerms[0] != '') {
    $('.my-search-history').show();
    getRecentSearchItems();
  } else {
    $('.no-recent-search').fadeIn('slow');
  }
});
$('#my-search-arrow').click(function () {
  $('.my-search-bar').val('').focusout();
  let oldSearchedTerms = getCookie('recentSearchedTerms').split(',');
  if (oldSearchedTerms[0] != '') {
    $('.my-search-history').show();
    getRecentSearchItems();
  } else {
    $('.no-recent-search').fadeIn('slow');
  }
  $('.live-search-container').html('').hide();
});



function addCookie(id, type) {


  let itm = type + "_" + id;

  if ($('#' + itm).children().hasClass('far')) { // No saved yet
    $('#' + itm).children().removeClass('far').addClass('fas');
    
    // Check if the cookie has been already saved
    let savedList = getCookie('savedElements').split(',');
    let alrSaved = false;

    savedList.forEach(element => {
      if (itm == element) {
        alrSaved = true;
      }
    });

    if (!alrSaved) {
      updateCookie('savedElements', itm, 365)
    }  
  }
  else { // Already saved

    // Color heart change is not working as it should :(
    $('#' + itm).children().removeClass('fas').addClass('far');

    // Remove the cookie from the list
    let savedList = getCookie('savedElements').split(',');

    savedList = jQuery.grep(savedList, function(value) {
      return value != itm;
    });

    deleteCookie('savedElements');
    savedList.forEach(element => {
      updateCookie('savedElements', element, 365);
    });
  }  
}

function checkSavedElements() {
  let savedList = getCookie('savedElements').split(',');

  return savedList;
}