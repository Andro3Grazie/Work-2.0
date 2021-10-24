
function getRecentSearchItems() {

    // $('.no-recent-search').fadeIn('slow');

    $('.history').html('');

    let searchedTerms = getCookie('recentSearchedTerms').split(',');

    if (searchedTerms[0] != ['']) {
        $('.no-recent-search').hide();
    }

    let k = 0;
    
    for (let i = searchedTerms.length - 1; i >= 0 && k < 3; i--) {
        k++;
        $('.history').append(`
        <div class="row no-gutters history-element card mt-2" id='${searchedTerms[i]}'>
        
            <div class="col card-body px-3 d-flex justify-content-between">
                <p class="card-text m-0 p-0" onclick="repeatOldSearch('${searchedTerms[i]}')">${searchedTerms[i]}</p>
                
                <div class="history-element-closingButton" onclick="deleteSearchedTerm('${searchedTerms[i]}');">
                    <i class="fas fa-times"></i>
                </div>
            </div>
        
        </div>
        `);
    }
}

function deleteAllSearchedTerms() {
    deleteCookie('recentSearchedTerms');
    $('.my-search-history').hide();
    $('.no-recent-search').fadeIn('slow');
}

function deleteSearchedTerm(val) {
    let searchedTerms = getCookie('recentSearchedTerms').split(',');
    deleteCookie('recentSearchedTerms');

    for (let i = 0; i < searchedTerms.length; i++) {
        if (val != searchedTerms[i]) {
            updateCookie('recentSearchedTerms', searchedTerms[i], 30); 
        }
    }

    // $('[id=' + val + ']').html('');
    $(replaceSpecialChar(val)).html('');

    searchedTerms = getCookie('recentSearchedTerms').split(',');

    getRecentSearchItems();
    if (searchedTerms[0] == ['']) {
        $('.my-search-history').hide();
        $('.no-recent-search').fadeIn('slow');
    }
}

function repeatOldSearch(val) {
    
    $('.my-search-bar').val(val);
    openMySearch();
    search();
}

function updateExistingValue(val) {

    deleteSearchedTerm(val);
    createNewSearchedTerms(val);
}

function createNewSearchedTerms(val) {
    if (getCookie('recentSearchedTerms') == false) {
        setCookie('recentSearchedTerms', val, 30);
    }
    else {
        updateCookie('recentSearchedTerms', val, 30);
    }
}