document.getElementsByClassName('musicPage')[0].children[0].addEventListener('loadedmetadata', function() {
  this.currentTime = 57;
}, false);



function updateVal(id) {
  let arr = [ 0,   0,   0,   0,   0];
  for(let i = 0; i <= parseInt(id); i++) {
    arr[i] = 1
  }

  for(let i = 0; i < arr.length; i++) {
    let elem = document.getElementById(String(i));
    if(arr[i] == 1) {
      // Changes style if element is clicked (or below the last clicked one)
      elem.style.backgroundColor = "rgba(0,204,125,"+(i+3)*(0.8/arr.length)+")";  //The (i+3) controls the shift in transparency, while the n/arr.length controls the overall transparency
    } else {
      elem.style.backgroundColor = "rgba(200,200,200,0.3)";
    }
  }
  console.log(arr);


}
