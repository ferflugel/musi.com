// Creating the list
var rate = sessionStorage.getItem('evaluations');
rate = JSON.parse(rate);
let musics = Object.keys(rate);
ratings = Object.values(rate);
const imageURL = sessionStorage.getItem('imageURL');
const albumName = sessionStorage.getItem('albumName');

//Removes parentheses
function shortenName(string) {
  var end = string.indexOf('(');
  var final = string.substr(0, end).trim();
  if(final.length == 0) {
    return string
  } else {
    return final
  }
}

//Cuts song name if bigger than specified size
function trimName(string) {
  var str = shortenName(string);

  if(str.length > 23) {
    str = str.substr(0, 20)+"...";
  }
  return str;
}


// Changing the name
document.getElementById("line3_3").innerHTML = shortenName(albumName);
document.getElementById('coverImage').src = imageURL;

//Resize font-sze
var maxWidth = parseInt(window.getComputedStyle(document.getElementsByClassName('resultsTextFinal')[0]).width.split('px')[0]);
var album = document.getElementById('line3_3');
var state = 1;
const resizeToFit = () => {
  let fontSize = window.getComputedStyle(album).fontSize;
  album.style.fontSize = (parseFloat(fontSize) - 1) + 'px';

  if (album.clientHeight*(1/2)*album.innerText.length >= maxWidth) {
    resizeToFit();
  } else {
    state = 0;
  }
}

while(state) {
  resizeToFit();
}

// Computing the average
const average = list => list.reduce((prev, curr) => prev + curr) / list.length;
let avg = average(ratings)*2;
document.getElementById("rating_text").innerHTML = avg.toFixed(1) + "/10";
document.getElementById("rating").style.marginRight = (50 - 5 * avg) + "vw";
const marginRight = (40 - 5 * avg);
if (marginRight >= -3) {
    document.getElementById("rating_text").style.marginRight = marginRight + "vw";
} else {
    document.getElementById("rating_text").style.marginRight = '-10' + "vw";
}



// Sorting the list
let ratedMusics = ratings.map(function(e, i) {
        return [e, musics[i]];
});


// Editing the best musics and wort musics
ratedMusics.sort()
for(let i = 0; i < 3; i++){
    document.getElementById("bar3_" + (i + 4)).innerHTML = trimName(ratedMusics[i][1]);
}

ratedMusics.reverse()
for(let i = 0; i < 3; i++){
    document.getElementById("bar3_" + (i + 1)).innerHTML = trimName(ratedMusics[i][1]);
}
