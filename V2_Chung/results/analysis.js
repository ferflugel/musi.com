// Creating the list
let musics = ["Stronger", "Drunk and Hot Girls", "Big Brother", "I Wonder", "Flashing Lights", "The Glory", "Champion"]
let ratings = [9, 5, 8, 9, 9.5, 6, 7]
let albumName = "graduation"


// Changing the name
document.getElementById("line3_3").innerHTML = albumName;


// Computing the average
const average = list => list.reduce((prev, curr) => prev + curr) / list.length;
let avg = average(ratings)
document.getElementById("rating").innerHTML = avg.toFixed(1) + "/10";
document.getElementById("rating").style.marginLeft = (60 - 6 * avg) + "vw";


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
