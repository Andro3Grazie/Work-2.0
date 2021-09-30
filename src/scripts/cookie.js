function setCookie(cname, cvalue, cexpires) {
  var d = new Date();
  d.setTime(d.getTime() + cexpires * 24 * 60 * 60 * 1000);
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';';
}

function getCookie(cname) {
  var name = cname + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}


// Saving new elements on an existing cookie (commasepareted)
function updateCookie(cname, cvalue, cexpires) {

  // Check if the cookie already exist
  if (getCookie(cname) == '') 
    setCookie(cname, cvalue, cexpires);
  else { 
    var d = new Date();
    d.setTime(d.getTime() + cexpires * 24 * 60 * 60 * 1000);
    var expires = 'expires=' + d.toUTCString();
    var newElements = getCookie(cname);
    document.cookie = cname + '=' + newElements + "," + cvalue + ';' + expires + ';';
  }
}

function deleteCookie(cname) {
  document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
}