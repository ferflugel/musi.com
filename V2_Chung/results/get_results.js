// This file contains two functions which will be used to pass information from page to page

let l = 5;
// let l = results.items.length

let data = '';
for(let i = 0; i < l; i++){
    let name = 'test';
    // let name = results.items[i].name
    let review = 2;
    // let review = document.getElementById('name').querySelectorAll('colorBar')[0].name
    data += '|' + name + '_' + review;
}

// window.localStorage.setItem('ratingsData', data);

// -----------------------

// let data = window.localStorage.getItem('ratingsData');

let data_array = data.split('|');
let musics = [];
let ratings = [];
for(let i = 0; i < data_array.length; i++){
    let tuple = data_array[i].split('_');
    musics.append(tuple[0]);
    ratings.append(tuple[1]);
}