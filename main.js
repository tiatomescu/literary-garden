let plotButtons = document.querySelectorAll('#plot-btn');
let clickedButton = 0;

plotButtons.forEach((btn, index) => {
  btn.addEventListener('click', (event) => {
    clickedButton = index;
    window.location = 'search.html';
  })
});
