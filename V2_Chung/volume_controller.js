let volSlider = document.getElementById('volRange');
let volAnim = document.getElementById('volumeSlider').getElementsByTagName('i')[0];
let audioElements = document.getElementsByTagName('audio');

function setVolume() {
  Array.prototype.forEach.call(audioElements, aud => {
    aud.volume = ((parseInt(volSlider.value)-1)/100);
  })
}

window.addEventListener('load', function() {
  setTimeout(function() {
    volSlider.style.visibility = 'visible';
    volSlider.style.opacity = '0.8';
    volSlider.style.marginTop = '64px';

    volAnim.style.visibility = 'visible';
    volAnim.style.opacity = '1';
    volAnim.style.marginTop = '80px';
  }, 200);

  setTimeout(function() {
    volSlider.attributeStyleMap.clear();
    volAnim.attributeStyleMap.clear();
  }, 2500);
})
