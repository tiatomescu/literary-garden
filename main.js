let plotButtons = document.querySelectorAll('#plot-btn');
let clickedPlot = 0;

export let getClickedPlot = () => {
  return clickedPlot;
}

export let setClickedPlot = (input) => {
  clickedPlot = input;
}

plotButtons.forEach((btn, index) => {
  btn.addEventListener('click', (event) => {
    setClickedPlot(index);
    window.location = 'search.html';
  })
});


