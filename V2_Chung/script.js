// Sets the start time of the video
document.getElementsByClassName('musicPage')[0].children[0].addEventListener('loadedmetadata', function() {
  this.currentTime = 57;
}, false);

// Hover effect on rating buttons
function hoveringEffect(id) {
  let temp = [ 0,   0,   0,   0,   0];
  for(let i = 0; i <= parseInt(id); i++) {
    temp[i] = 1
  }

  for(let i = 0; i < temp.length; i++) {
    let elem = document.getElementById(String(i));
    if(temp[i] == 1) {
      // Changes style if element is clicked (or below the last clicked one)
      elem.style.backgroundColor = "rgba(0,204,125,"+(i+3)*(0.8/temp.length)+")";  //The (i+3) controls the shift in transparency, while the n/arr.length controls the overall transparency
    } else {
      elem.style.backgroundColor = "rgba(200,200,200,0.3)";
    }
  }
}


function resetCSS() {
  for(let i = 0; i < arr.length; i++) {
    let elem = document.getElementById(String(i));
    if(arr[i] == 1) {
      // Changes style if element is clicked (or below the last clicked one)
      elem.style.backgroundColor = "rgba(0,204,125,"+(i+3)*(0.8/arr.length)+")";  //The (i+3) controls the shift in transparency, while the n/arr.length controls the overall transparency
    } else {
      elem.style.backgroundColor = "rgba(200,200,200,0.3)";
    }
  }
}

// Updates the colors of rating buttons whenever one of them is clicked
let arr = [ 0,   0,   0,   0,   0];
function updateVal(id) {
  arr = [0, 0, 0, 0, 0];
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
};
