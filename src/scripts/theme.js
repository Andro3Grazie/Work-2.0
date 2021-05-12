function toggleTheme() {
  $('body').toggleClass('dark-theme');
  $('#theme-icon').toggleClass('fa-moon');
  $('#theme-icon').toggleClass('fa-sun');
  if ($('body').hasClass('dark-theme')) {
    setCookie('theme', 'dark', 365);
    // Change tab color on dark-mode
    $('meta[name=theme-color]').attr('content', 'rgba(18, 18, 18)');
  } else {
    // Change tab color on light-mode
    $('meta[name=theme-color]').attr('content', 'rgba(19, 52, 76)');
    setCookie('theme', 'light', 365);
  }
}
