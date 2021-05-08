function toggleTheme() {
  $('body').toggleClass('dark-theme');
  $('#theme-icon').toggleClass('fa-moon');
  $('#theme-icon').toggleClass('fa-sun');
  if ($('body').hasClass('dark-theme')) setCookie('theme', 'dark', 365);
  else setCookie('theme', 'light', 365);
}
