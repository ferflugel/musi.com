let musics = ["M1", "M2", "M3", "M4"]
let ratings = [1, 5, 3, 2]

let ratedMusics = ratings.map(function(e, i) {
        return [e, musics[i]];
    });

ratedMusics.sort()
console.log(ratedMusics)
