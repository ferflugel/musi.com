//Hides other musics from the screen
var musics = new Array();
var p = [];
var activeMusic = "";
var ratings = {};

//Hides all but the first music of the album to be shown on the screen
function hideElements() {
  p = document.getElementsByClassName("musicPage");
  Array.prototype.forEach.call(p, elem => {

    if(elem.classList.contains("Active")) {
      elem.style.display = 'block';

      try {
        elem.querySelectorAll('audio')[0].play();
      } finally {}

    } else {
      elem.style.display = 'none';

      try {
        elem.querySelectorAll('audio')[0].pause();
        console.log('pause');
      } finally {}

    }
  });
};

//Updates the active music page
function updateActive() {
  Array.prototype.forEach.call(p, elem => {
    if(!(elem.classList.contains("Active"))) {
      elem.style.display = 'none';
      try {
        elem.querySelectorAll('audio')[0].pause();
      } finally {}
    } else if (elem.classList.contains("Active")) {
      elem.style.display = 'block';
      try {
        elem.querySelectorAll('audio')[0].play();
      } finally {}
      activeMusic = elem.getAttribute('id');
    }
  });
};

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
    arr[i] = 1;
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

  //Sums 1's in the arr to get rating
  const sum = arr.reduce(add,0); // with initial value to avoid when the array is empty
  function add(accumulator, a) {
    return accumulator + a;
  }
  //Stores rating on dictionary
  ratings[activeMusic] = sum;

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
function PrevMusic() {
  elem = document.getElementById(activeMusic);
  elem.className = "musicPage";
  var index = musics.indexOf(elem.getAttribute('id'))-1;
  document.getElementById(proxy[index]).classList.add("Active");
  updateActive();

  //Retrieves stored ratings
  let grade = ratings[proxy[index]];
  let el = document.getElementById(proxy[index] + String(grade-1));
  el.click();

}

function NextMusic() {
  elem = document.getElementById(activeMusic);
  elem.className = "musicPage";
  var index = musics.indexOf(elem.getAttribute('id'))+1;
  document.getElementById(proxy[index]).classList.add("Active");
  updateActive();

  //Retrieves stored ratings
  let grade = ratings[proxy[index]];
  let el = document.getElementById(proxy[index] + String(grade-1));
  el.click();


}

//Sends data to the next page
function SubmitEval() {
  sessionStorage.setItem('evaluations', JSON.stringify(ratings));
  setTimeout(function() {
    window.location.href = "results/results_3.html";
  }, 1000);
}


//Attempts to solve the white-screen issue when loading
window.addEventListener('click', function() {
  updateActive();
  APIController.getCover(token, albumID).then(function(result) {
    document.getElementById('albumCover').src = result.images[0].url;
  })
})

//Sets album cover
window.addEventListener('load', function() {
  APIController.getCover(token, albumID).then(function(result) {
    document.getElementById('albumCover').src = result.images[0].url;
  });
});
