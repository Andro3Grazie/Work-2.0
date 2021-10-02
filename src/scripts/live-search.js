$('.my-search-bar').bind('click keyup', function () {
  // live search
  search();

  // recentSearchedTerms = $('.my-search-bar').val()().replace(/\s+/g, ' ').trim();
});

function search() {
  // format files
  fixName(soste);
  fixName(nomi);

  let val;
  $('.my-search-history').hide();
  $('.live-search-container').show().html('');
  let noResult = true;
  let zero = false;

  for (let i = 0; i < soste.length; i++) {
    // Risultati live
    val = $('.my-search-bar').val().toLowerCase().replace(/\s+/g, ' ').trim();

    if (val.length > 1 && val[0] == '0') {
      zero = true;
      val = val.substring(1);
    }

    if (
      (soste[i]['name'].includes(val) ||
        soste[i]['id'].toString().includes(val)) &&
      val != ''
    ) {
      noResult = false;
      let savedElements = checkSavedElements();
      if (!savedElements) { // Se c'è qualcosa nei cookie
        for (let x = 0; x < savedElements.length; x++) {
          $('#' + savedElements[x]).children().removeClass('far').addClass('fas');
        }
      }

      $('.live-search-container').append(`
        <div class="row no-gutters live-search mt-2">
          <div class="col-auto my-auto" onclick='getResult("sosta", ${
            soste[i]['id']
          })'>
            <div class="live-search-id text-center p-2">
            ${('0' + soste[i]['id']).slice(-2)}
            </div>
          </div>
          <div class="col-9 m-auto pl-1" onclick='getResult("sosta", ${
            soste[i]['id']
          })'>
            <h5 class="live-search-title text-capitalize py-1">
            ${soste[i]['name']}
            </h5>
            <p class="live-search-subtitle">Sosta</p>
          </div>
          <div class="col-auto m-auto text-center" id="${"s_" + soste[i]['id']}" onclick='addCookie(${soste[i]['id']}, "s")'>
            <i class="far fa-heart"></i>
          </div>
        </div>
      `);
    }
  }

  for (let i = 0; i < nomi.length; i++) {
    // Risultati live
    val = $('.my-search-bar').val().toLowerCase().replace(/\s+/g, ' ').trim();

    if (val.length > 1 && val[0] == '0') {
      zero = true;
      val = val.substring(1);
    }

    if (
      (nomi[i]['name'].includes(val) ||
        nomi[i]['id'].toString().includes(val)) &&
      val != ''
    ) {
      noResult = false;
      let savedElements = checkSavedElements();
      if (savedElements[0] != '') { // Se c'è qualcosa nei cookie
        for (let x = 0; x < savedElements.length; x++) {
          $('#' + savedElements[x]).children().removeClass('far').addClass('fas');
        }
      }
          
      $('.live-search-container').append(`
        <div class="row no-gutters live-search mt-2">
          <div class="col-auto my-auto" onclick='getResult("nome", ${
            nomi[i]['id']
          })'>
            <div class="live-search-id text-center p-2">
            ${('0' + nomi[i]['id']).slice(-2)}
            </div>
          </div>
          <div class="col-9 m-auto pl-1" onclick='getResult("nome", ${
            nomi[i]['id']
          })'>
            <h5 class="live-search-title text-capitalize py-1">
            ${nomi[i]['name']}
            </h5>
            <p class="live-search-subtitle">Nominativo</p>
          </div>
          <div class="col-auto m-auto text-center" id="${"n_" + nomi[i]['id']}" onclick='addCookie(${nomi[i]['id']}, "n")'>
            <i class="far fa-heart"></i>
          </div>
        </div>
      `);
    }
  }

  if (val == '') {
    let oldSearchedTerms = getCookie('recentSearchedTerms').split(',');
    if (oldSearchedTerms[0] != '') {
      $('.my-search-history').show();
      getRecentSearchItems();
    }
  }

  if (noResult && val != '') {
    val = $('.my-search-bar').val().replace(/\s+/g, ' ').trim();

    const options = {
      isCaseSensitive: false,
      includeScore: true,
      includeMatches: true,
      shouldSort: true,
      threshold: 0.4,
      // ignoreLocation: true,
      ignoreFieldNorm: true,
      keys: [
        "name"
      ]
    };

    const fuseSoste = new Fuse(soste, options);
    const fuseNomi = new Fuse(nomi, options);

    let nomePossibile = {
      name: '',
      score: 0
    };
    
    let sostaPossibile = {
      name: '',
      score: 0
    };


    if (fuseNomi.search(val).length > 0) {
      nomePossibile.name = fuseNomi.search(val)[0].item.name;
      nomePossibile.score = fuseNomi.search(val)[0].score;      
    }

    if (fuseSoste.search(val).length > 0) {
      sostaPossibile.name = fuseSoste.search(val)[0].item.name;
      sostaPossibile.score = fuseSoste.search(val)[0].score;
    }


    let possibleSearched;
    if (sostaPossibile.score < nomePossibile.score) {
      possibleSearched = sostaPossibile.name.split(' ', 2);
    }
    else {
      possibleSearched = nomePossibile.name.split(' ', 2);
    }

    if (possibleSearched[0] != '') {

      $('.live-search-container').append(`
      
        <div class="row no-gutters mt-3" style="overflow-wrap: break-word;">
        
          <p class="m-0 mt-2">Forse cercavi: <strong onclick="repeatOldSearch('${possibleSearched[0]}')">${possibleSearched[0]}</strong>?</p>
        
        </div> 
      `) 
    }
    $('.live-search-container').append(`

      <div class="row no-gutters mt-4" style="overflow-wrap: break-word;">
        <div class="col text-center">
          <h5 class="m-0">Impossibile trovare "${zero ? '0' + val : val}"</h5>
          <p class="m-0 mt-2">Prova a cercare nuovamente inserendo altre parole o in un ordine diverso</p>
        </div>
      </div>
    `);
  }
}

function getSearchedTerm() {
  // Aggiungere ai cookie la parola cercata
  let recentSearchedTerms = $('.my-search-bar').val().replace(/\s\s+|[,;]\s+?|[,;]/gm, ' ').trim();

  let oldSearchedTerms = getCookie('recentSearchedTerms').split(',');
  

  // Se non è vuoto ed è più lungo di 2 caratteri
  if (recentSearchedTerms.length > 2) {
    // Crea un nuovo cookie o aggiungi la ricerca a quello esistente
    createNewSearchedTerms(recentSearchedTerms);
    
    // Se esiste già all'interno mettilo come ultimo nella lista (perché cercato di nuovo)
    if ((oldSearchedTerms.includes(recentSearchedTerms))) {
      updateExistingValue(recentSearchedTerms);
    }
  }
}