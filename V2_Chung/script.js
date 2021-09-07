//Hides other musics from the screen
const p = document.getElementsByClassName('musicPage');
const musics = []
var activeMusic = "Starboy";
Array.prototype.forEach.call(p, elem => {
  musics.push(elem.getAttribute('id'));
  if(elem.getAttribute('name') != "Active") {
    elem.style.display = 'none';
  }
});

//Updates the active tab
function updateActive() {
  Array.prototype.forEach.call(p, elem => {
    if(elem.getAttribute('name') != "Active") {
      elem.style.display = 'none';
    } else if ( elem.getAttribute('name') == "Active" ) {
      elem.style.display = 'block';
      activeMusic = elem.getAttribute('id');
    }
  });
}

// Sets the start time of the video
document.getElementsByClassName('musicPage')[0].children[0].addEventListener('loadedmetadata', function() {
  this.currentTime = 57;
}, false);

// Hover effect on rating buttons
function hoveringEffect(id) {
  let temp = [ 0,   0,   0,   0,   0];
  for(let i = 0; i <= parseInt(id.split(activeMusic)[1]); i++) {
    temp[i] = 1
  }

  for(let i = 0; i < temp.length; i++) {
    let elem = document.getElementById(activeMusic + String(i));
    if(temp[i] == 1) {
      // Changes style if element is clicked (or below the last clicked one)
      elem.style.backgroundColor = "rgba(0,204,125,"+(i+3)*(0.8/temp.length)+")";  //The (i+3) controls the shift in transparency, while the n/arr.length controls the overall transparency
    } else {
      elem.style.backgroundColor = "rgba(200,200,200,0.3)";
    }
  }
}

//Resets score-bar css state
function resetCSS() {
  for(let i = 0; i < arr.length; i++) {
    let elem = document.getElementById(activeMusic + String(i));
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
  for(let i = 0; i <= parseInt(id.split(activeMusic)[1]); i++) {
    arr[i] = 1
  }

  for(let i = 0; i < arr.length; i++) {
    let elem = document.getElementById(activeMusic + String(i));
    if(arr[i] == 1) {
      // Changes style if element is clicked (or below the last clicked one)
      elem.style.backgroundColor = "rgba(0,204,125,"+(i+3)*(0.8/arr.length)+")";  //The (i+3) controls the shift in transparency, while the n/arr.length controls the overall transparency
    } else {
      elem.style.backgroundColor = "rgba(200,200,200,0.3)";
    }
  }
  console.log(arr);
};

//Handles negative indexes on arrays
const proxy = new Proxy(musics, {
    get(target, prop) {
        if (!isNaN(prop)) {
            prop = parseInt(prop, 10);
            if (prop < 0) {
                prop += target.length;
            }
        }
        return target[prop%target.length];
    }
});

//Changes current active music

// function PrevMusic() {
//   arr = [ 0,   0,   0,   0,   0];
//   for (var i = 0; i < musics.length; i++) {
//     elem = document.getElementById(proxy[i]);
//     if (elem.getAttribute('name') == "Active") {
//       elem.setAttribute('name', " ");
//       activate = i - 1;
//     } else if (elem == document.getElementById(proxy[activate])) {
//       elem.setAttribute('name', "Active");
//     }
//   }
//   updateActive();
// }

function PrevMusic() {
  arr = [ 0,   0,   0,   0,   0];
  elem = document.getElementById(activeMusic);
  elem.setAttribute('name', " ");
  var index = musics.indexOf(elem.getAttribute('id'))-1;
  document.getElementById(proxy[index]).setAttribute('name', "Active");
  updateActive();
}

function NextMusic() {
  arr = [ 0,   0,   0,   0,   0];
  elem = document.getElementById(activeMusic);
  elem.setAttribute('name', " ");
  var index = musics.indexOf(elem.getAttribute('id'))+1;
  document.getElementById(proxy[index]).setAttribute('name', "Active");
  updateActive();
}
