$('.my-search-bar').bind('click keyup', function () {
  // live search
  search();
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
    $('.my-search-history').show();
  }

  if (noResult && val != '') {
    $('.live-search-container').append(`
      <div class="row no-gutters mt-5" style="overflow-wrap: break-word;">
        <div class="col text-center">
          <h5 class="m-0">Impossibile trovare "${zero ? '0' + val : val}"</h5>
          <p class="m-0 mt-2">Prova a cercare nuovamente inserendo altre parole o in un ordine diverso</p>
        </div>
      </div>
    `);
  }
}
