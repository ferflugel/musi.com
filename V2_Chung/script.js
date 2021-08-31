document.getElementsByClassName('musicPage')[0].children[0].addEventListener('loadedmetadata', function() {
  this.currentTime = 57;
}, false);

function updateVal(i) {
    const val = document.querySelector("input:checked").value;
    console.log("Input - " + i + " : " + val);
    document.querySelector("input:checked").parentElement.setAttribute("name", val);
}
