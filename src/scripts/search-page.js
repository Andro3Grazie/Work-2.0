function getList(val) {
  $('.search-page').hide();
  $('.single-page').show().html(`
    <div class="row">
      <div class="col">
        <h1 class="search-title mb-4 text-capitalize">${val}</h1>
      </div>
    </div>
`);

  let preferiti = 'da fare';

  let type = val;
  if (val == 'nome') val = nomi;
  else if (val == 'sosta') val = soste;
  else if (val == 'preferiti') val = preferiti;

  for (let i = 0; i < val.length; i++) {
    $('.single-page').append(`
      <div class="row no-gutters live-search mt-2" id="${val[i]['name']}">
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
          <p class="live-search-subtitle">Nominativo</p>
        </div>
        <div class="col-auto m-auto text-center" onclick>
          <i class="far fa-heart"></i>
        </div>
      </div>
    `);
  }
}
