// making an button which will make you go to top
document.addEventListener('DOMContentLoaded', function () {
  var mybutton = document.getElementById('myBtn');

  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = 'block';
    } else {
      mybutton.style.display = 'none';
    }
  }
});
