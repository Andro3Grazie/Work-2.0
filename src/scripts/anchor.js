function setAnchor() {
  history.pushState(null, '', '?=' + Math.floor(Math.random() * 100000000 + 1));
}
