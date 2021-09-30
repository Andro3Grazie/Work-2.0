function getList(val) {
  let title;
  if (val == 'nome') {
    title = "Nominativi";
  }
  else if (val == 'sosta') {
    title = "Soste";
  }
  else {
    title = "Preferiti"
  }
  $('.search-page').hide();
  $('.single-page').show().html(`
    <div class="row">
      <div class="col">
        <h1 class="search-title mb-4 text-capitalize">${title}</h1>
      </div>
    </div>
`);

  let type = val;
  let subtitle, prefix;
  if (val == 'nome') {
    val = nomi; 
    subtitle = 'Nominativo';
    prefix = 'n';
  }
  else if (val == 'sosta') {
    val = soste; 
    subtitle = 'Sosta';
    prefix = 's';
  }

  if (val == 'preferiti') {
    let savedElements = checkSavedElements();
    if (savedElements[0] != '') { // Se c'è qualcosa nei cookie
      for (let x = 0; x < savedElements.length; x++) {

        if (savedElements[x].substring(0,1) == 'n') {
          type = 'nome';
          val = nomi;
          subtitle = 'Nominativo';
          prefix = 'n';
        }
        if (savedElements[x].substring(0,1) == 's') {
          type = 'sosta';
          val = soste;
          subtitle = 'Sosta';
          prefix = 's';
        }
        let i = savedElements[x].substring(2) - 1;

        $('.single-page').append(`
          <div class="row no-gutters live-search mt-2">
            <div class="col-auto my-auto" onclick='getResult("${type}", ${
          val[i]['id']
        })'>
              <div class="live-search-id text-center p-2">
              ${('0' + val[i]['id']).slice(-2)}
              </div>
            </div>
            <div class="col-9 m-auto pl-1" onclick='getResult("${type}", ${
          val[i]['id']
        })'>
              <h5 class="live-search-title text-capitalize py-1">
              ${val[i]['name']}
              </h5>
              <p class="live-search-subtitle">${subtitle}</p>
            </div>
            <div class="col-auto m-auto text-center" id="${prefix + "_" + val[i]['id']}" onclick='addCookie(${val[i]['id']}, "${prefix}")'>
              <i class="fas fa-heart"></i>
            </div>
          </div>
        `);
      }
    }
    else {
      $('.single-page').append(`
        <div class="row no-gutters mt-5 history-noResult" style="overflow-wrap: break-word;">
          <div class="col text-center">
            <h5 class="m-0">Nessun elementi salvato</h5>
            <p class="m-0 mt-2">Clicca sul cuore quando fai una ricerca per salvare quell'elemento e visualizzarlo in questa pagina</p>
          </div>
        </div>
      `);
    }       
  }
  else {    
    for (let i = 0; i < val.length; i++) {
      $('.single-page').append(`
        <div class="row no-gutters live-search mt-2">
          <div class="col-auto my-auto" onclick='getResult("${type}", ${
        val[i]['id']
      })'>
            <div class="live-search-id text-center p-2">
            ${('0' + val[i]['id']).slice(-2)}
            </div>
          </div>
          <div class="col-9 m-auto pl-1" onclick='getResult("${type}", ${
        val[i]['id']
      })'>
            <h5 class="live-search-title text-capitalize py-1">
            ${val[i]['name']}
            </h5>
            <p class="live-search-subtitle">${subtitle}</p>
          </div>
          <div class="col-auto m-auto text-center" id="${prefix + "_" + val[i]['id']}" onclick='addCookie(${val[i]['id']}, "${prefix}")'>
            <i class="far fa-heart"></i>
          </div>
        </div>
      `);
    }
    
    let savedElements = checkSavedElements();
    if (savedElements[0] != '') { // Se c'è qualcosa nei cookie
      for (let x = 0; x < savedElements.length; x++) {
        $('#' + savedElements[x]).children().removeClass('far').addClass('fas');
      }
    }
  }
}
