// Creating the list
var rate = sessionStorage.getItem('evaluations');
rate = JSON.parse(rate);
let musics = Object.keys(rate);
ratings = Object.values(rate);
const imageURL = sessionStorage.getItem('imageURL');
const albumName = sessionStorage.getItem('albumName');

// Changing the name
document.getElementById("line3_3").innerHTML = albumName;
document.getElementById('coverImage').src = imageURL;


// Computing the average
const average = list => list.reduce((prev, curr) => prev + curr) / list.length;
let avg = average(ratings)*2;
document.getElementById("rating").innerHTML = avg.toFixed(1) + "/10";
document.getElementById("rating").style.marginRight = (50 - 5 * avg) + "vw";



// Sorting the list
let ratedMusics = ratings.map(function(e, i) {
        return [e, musics[i]];
});


// Editing the best musics and wort musics
ratedMusics.sort()
for(let i = 0; i < 3; i++){
    document.getElementById("bar3_" + (i + 4)).innerHTML = ratedMusics[i][1];
}

ratedMusics.reverse()
for(let i = 0; i < 3; i++){
    document.getElementById("bar3_" + (i + 1)).innerHTML = ratedMusics[i][1];
}

