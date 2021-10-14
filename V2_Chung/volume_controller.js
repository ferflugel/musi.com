let  volSlider = document.getElementById('volRange');
let audioElements = document.getElementsByTagName('audio');

function setVolume() {
  Array.prototype.forEach.call(audioElements, aud => {
    aud.volume = ((parseInt(volSlider.value)-1)/100);
  })
}
