$('#todayShift').click(function () {

  setAnchor('manualshift');

  openManualShiftSearch();

  $('.manualShift-bar').bind('click keyup', function () {
    // live search
    searchManualPlace();
  });
});

function openManualShiftSearch() {
  $('.home-page').hide();
  $('.manualShift-page').show();
  $('.manualShift-bar').val() == ''
    ? $('.manualShift-typed-container').show()
    : $('.manualShift-typed-container').hide();
  $('.manualShift-bar').hasClass('manualShift-live-search-title text-capitalize') == false ? $('.manualShift-bar').focus() : null;
  $('.manualShift-container').show();
}

function searchManualPlace() {
  // format files
  fixName(soste);
  fixName(nomi);

  let val;
  $('.manualShift-typed-container').hide();
  $('.manualShift-container').show().html('');

  let noResult = true;
  let zero = false;

  for (let i = 0; i < soste.length; i++) {
    // Risultati live
    val = $('.manualShift-bar').val().toLowerCase().replace(/\s+/g, ' ').trim();

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
      $('.manualShift-container').append(`
      <div class="row no-gutters manualShift-live-search mt-2" onclick='setManualPlace("${soste[i].id
        }")'>
        <div class="col-auto my-auto" >
          <div class="manualShift-live-search-id text-center p-2">
          ${('0' + soste[i]['id']).slice(-2)}
          </div>
        </div>
        <div class="col-9 m-auto pl-1" >
          <h5 class="manualShift-live-search-title text-capitalize py-1">
          ${soste[i]['name']}
          </h5>
        </div>
      </div>
    `);
    }
  }
  if (val == '') {
    $('.manualShift-typed-container').show();
  }

  if (noResult && val != '') {

    val = $('.manualShift-bar').val().replace(/\s+/g, ' ').trim();

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

    const fuseSosteM = new Fuse(soste, options);

    let sostaPossibile = {
      name: '',
      score: 0
    };

    if (fuseSosteM.search(val).length > 0) {

      let possibleSearched = fuseSosteM.search(val)[0].item.name.split(' ', 2);

      if (possibleSearched[0] != '') {

        $('.manualShift-container').append(`
        
        <div class="row no-gutters mt-3" style="overflow-wrap: break-word;">
        
        <p class="m-0 mt-2">Forse cercavi: <strong onclick="secondAttemptManSearch('${possibleSearched[0]}')">${possibleSearched[0]}</strong>?</p>
        
        </div> 
        `)
      }
    }
    $('.manualShift-container').append(`
      <div class="row no-gutters mt-4" style="overflow-wrap: break-word;">
        <div class="col text-center">
          <h5 class="m-0">Impossibile trovare "${zero ? '0' + val : val}"</h5>
          <p class="m-0 mt-2">Prova a cercare nuovamente inserendo altre parole o in un ordine diverso</p>
        </div>
      </div>
    `);
  }
}
function secondAttemptManSearch(val) {
  $('.manualShift-bar').val(val);
  openManualShiftSearch();
  searchManualPlace();
}

function setManualPlace(placeId) {
  // $('.result').hide(); // Is some previous searched I made

  let place = soste[placeId - 1].name;

  // FE
  $('.manualShift-bar').val(place).css({'text-align': 'center', 'font-weight': "500"}).addClass('manualShift-live-search-title text-capitalize');
  $('.manualShift-history').show();
  $('.manualShift-container').html(`
    <div class="pt-2"></div>
  `);;
  // ./FE

  // Dove sono domani
  var tomorrow = new Date();
  today.setDate(tomorrow.getDate() + 1);
  let idTomorrowShift = soste[getTodayShift() - 1].id - 1;

  // Data di domani
  let dayLong = new Date(today);

  // Reset today var
  today = new Date();
  today.setDate(today.getDate());

  // format files
  fixName(soste);
  fixName(nomi);


  // var place = nome della sosta :)
  // let k = idTomorrowShift; // k = scroll from today's place to the chosen one

  // FARE UN CONTROLLO A MONTE SE LA DATA CERCATA È QUELLA ATTUALE E SALTARE UN TURNO 

  for (let i = 0, k = idTomorrowShift; i < 3; k++) {

    let checkDate = ('0' + dayLong.getDate()).slice(-2) + '/' + ('0' + (dayLong.getMonth() + 1)).slice(-2) + '/' + dayLong.getFullYear();
    // Calculate the easter with the searched year
    getEaster(checkDate.split('/').pop());


    // Se non è domenica/festa
    if (dayLong.getDay() != 0 && !feste.includes(checkDate.substring(0, 5)) && checkDate.substring(0, 5) != pasqua && checkDate.substring(0, 5) != pasquetta) {
      // visto che non è festa controlla se quella sosta l'hai di turno questo giorno
      if (soste[k].name == place) {
        // console.log('Prossima turno a ' + place + ' il ' + dayLong);

        // FE
        $('.manualShift-container').append(`
            <div class="card mx-auto mt-3 when-card">
              <div class="card-body when-cardBody p-0 text-center">
                <p class="card-title when-cardTitle mb-0 text-uppercase p-1">
                ${monthName[dayLong.getMonth()]}
                </p>
                <p class="display-4 m-0" style="font-weight: 400">${dayLong.getDate()}</p>
                <p class="mb-2" style="font-weight: 300">${dayName[dayLong.getDay()]}</p>
              </div>
            </div>
        `);
        // ./FE

        i++;
      }
    } else {
      k--;
    }
    dayLong.setDate(dayLong.getDate() + 1);
    if (k == soste.length - 1) {
      k = -1; // Così appena ricomincia il ciclo torna a 0
    }
  }
  $('.manualShift-container').append(`
      <div class="my-5 py-1"></div>
    `);
  getEaster(today.getFullYear());
}

$('.manualShift-bar').bind('click keyup', function () {
  // If input is not empty
  if ($(this).val()) {
    $('.manualShift-delete').show();
  } else {
    $('.manualShift-delete').hide();
  }
});

$('.manualShift-delete').click(function () {
  $('.manualShift-bar').val('').focus().css({'text-align': 'left', 'font-weight': "400"}).removeClass('manualShift-live-search-title text-capitalize');
  $('.manualShift-container').html('').hide();
  $('.manualShift-history').show();
  $('.manualShift-typed-container').show()
});
$('#manualShift-arrow').click(function () {
  $('#home-icon').click();
});

$('.manualShift-bar').focusin(function () {
  $(this).css({'text-align': 'left', 'font-weight': "400"}).removeClass('manualShift-live-search-title text-capitalize');
  // If input is not empty
  if ($(this).val()) $('.manualShift-delete').show();
  else $('.manualShift-delete').hide();
});

var typed = new Typed('.manualShift-typed', {
  strings: [
    'Gimma  2',
    'Viale Pasteur  61/63',
    'Montagnola  8',
    'Torrevecchia',
    'Scarpanto  4',
    'Barletta',
    'Gentile Da Mogliano',
    'S.g.di D. Piazzista',
    'Satrico',
    'Marconi  2',
    'Colli  Albani  Metro',
    'Piazzale  Degli  Eroi',
    'Nobiliore',
    'Giureconsulti',
    'Montagnola  13',
    'Spartaco ',
    'Germanico',
    'Primavere',
    'Cardano',
    'Labieno  5',
    'Sagrato',
    'Tito  Speri  Vecchia',
    'Mammolo',
    'Orvieto',
    'Pzza.  Cina  Post. 5',
    'Via  Sansotta  Post. 1',
    'Via  Igea',
    'Gimma 1',
    'Quadraro  3°',
    'Balbo',
    'Enea',
    'Sabotino',
    'Sbirro Stallo 15',
    'Osci',
    'Scipioni',
    'Ponte  Milvio ',
    'Gorgona 3',
    'Chiana',
    'Trastevere Surropago',
    'Pavia',
    'Metauro ',
    'Quadraro 2°',
    'Paolo  Emilio',
    'Sbirro  Stallo  12',
    'Somalia  Farmacia',
    'Montebello',
    'Sacco  E  Vanzetti',
    'Piramide  Vecchia',
    'Quadraro  Vecchia ',
    'Casilina',
    'Cherso',
    'Trastevere  Frontoni',
    'Piramide Nuova',
    'Filippo  Meda  Stallo  9',
    'Ferrari',
    'Rappini',
    'Rialto',
    'Franklin',
    'Anagnina',
    'S. Maria  Maggiore',
    'Pino  1',
    'Via  Napoli  Civ. 2',
    'San Silverio',
    'Ovidio',
    'Montagnola  2',
    'Torpignattara',
    'Casalbertone',
    'Boccea  C.e.m.',
    'Valmelaina  Nuova',
    'Primati  Sportivi  P. 6',
    'Ionio',
    'Capo  Passero',
    'Via  Napoli  St.  4',
    'Valdossola',
    'Tito  Speri  Cessi',
    'Magliana',
    'Sbirro  Stallo 10',
    'Somalia  Banca',
    'Silla',
    'Quadraro  4°',
    'Montagnola  5',
    'Ostiense  313 ',
    'Cipro',
    'Pigneto',
    'M.to  Spinaceto  P. 8',
    'Galvani ',
    'Pino  2',
    'Trionfale  57',
    'Marconi  11-12',
    'Sbirro  Stallo  7',
    'Labieno  12',
    'Nicolini',
    'Primati  Sportivi  P. 9',
    'Urbano  2°',
    'Via  Napoli  St.  5',
  ],
  loop: true,
  typeSpeed: 75,
  backSpeed: 40,
  backDelay: 1500,
  loopCount: Infinity,
  shuffle: true,
});
