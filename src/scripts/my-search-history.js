
function getRecentSearchItems() {


    $('.history').html('');

    let searchedTerms = getCookie('recentSearchedTerms').split(',');

    let k = 0;
    
    for (let i = searchedTerms.length - 1; i >= 0 && k < 3; i--) {
        k++;
        $('.history').append(`
        <div class="row no-gutters history-element card mt-2" id='${searchedTerms[i]}'>
        
            <div class="col card-body px-3 d-flex justify-content-between">
                <p class="card-text m-0 p-0">${searchedTerms[i]}</p>
                
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
}

function deleteSearchedTerm(val) {
    let searchedTerms = getCookie('recentSearchedTerms').split(',');
    deleteCookie('recentSearchedTerms');

    for (let i = 0; i < searchedTerms.length; i++) {
        if (val != searchedTerms[i]) {
            updateCookie('recentSearchedTerms', searchedTerms[i], 30); 
        }
    }
    $('#' + val).html('');

    searchedTerms = getCookie('recentSearchedTerms').split(',');

    getRecentSearchItems();
    if (searchedTerms[0] == ['']) {
        $('.my-search-history').hide();
    }
}

