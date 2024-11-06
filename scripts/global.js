window.onscroll = function () {
  var navbar = document.getElementById("navbar-scroll");

  if (window.innerWidth > 768) {
    if (window.pageYOffset > 100) {
      navbar.classList.add("show");
    } else {
      navbar.classList.remove("show");
    }
  } else {
    navbar.classList.add("show");
  }
};

window.onresize = function () {
  var navbar = document.getElementById("navbar-scroll");

  if (window.innerWidth > 768) {
    navbar.classList.remove("show");
    dropdownMenu.classList.remove("show"); 
  } else {
    navbar.classList.add("show");
  }
};
