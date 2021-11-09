let params = new URLSearchParams(location.search);
albumID = params.get('albumId');
var dt, btn, active, position;
var albumCoverURL;

function shortenName(string) {
  var end = string.indexOf('(');
  var final = string.substr(0, end).trim();
  if(final.length == 0) {
    return string
  } else {
    return final
  }
}

//Iteratively create music pages with album songs and data
function createPage(musicRef, active) {
  const cln = document.getElementById('clone').cloneNode(true);
  //Appends the modified div to body

  //Gets data from the music reference
  const artist = musicRef.artists[0].name;
  const musicName = musicRef.name;
  const audioPrev = musicRef.preview_url;
  // const coverImage = musicRef;

  document.body.insertBefore(cln, document.body.children[1]);

  //Modify div with gathered data
  cln.querySelectorAll('audio')[0].src = audioPrev;
  cln.querySelectorAll('div.colorBar')[0].querySelectorAll('.musicName')[0].innerHTML = shortenName(musicName);
  cln.querySelectorAll('div.colorBar')[0].querySelectorAll('.musicArtist')[0].innerHTML = artist;
  cln.querySelectorAll('div.colorBar')[0].querySelectorAll('.rateButton').forEach((item, i) => {
    item.id = musicName + item.id.split('Clone')[1];
    document.getElementById(item.id).setAttribute('onmouseover', 'hoveringEffect("' + item.id + '")');
    document.getElementById(item.id).setAttribute('onclick', "updateVal('" + item.id + "')");
  });
  cln.id = musicName;
  cln.className = "musicPage";
  // console.log("1");
  if(active == true) {
    cln.classList.add("Active");
  }
}


const APIController = (function() {

  const clientId = '669454fb03a44aac8f034f1e774e8c9d';
  const clientSecret = '47c09f7daf5040c6ad79fb1c88ee08af';

  // private methods
  const _getToken = async () => {
      const result = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
              'Content-Type' : 'application/x-www-form-urlencoded',
              'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
          },
          body: 'grant_type=client_credentials'
      });
      const data = await result.json();
      return data.access_token;
  }

  const _getSongsInAlbum = async (token, albumId) => {

      const result = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
          method: 'GET',
          headers: { 'Authorization' : 'Bearer ' + token}
      });

      const data = await result.json();
      return data;
  }

  const _getAlbumCover = async (token, albumId) => {

      const result = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
          method: 'GET',
          headers: {'Authorization' : 'Bearer ' + token}
      });
      return await result.json();
  }

  return {
    getToken() {
      return _getToken();
    },
    getSongsOnAlbumMethod(token, albumId) {
  	  console.log(albumId);
      return _getSongsInAlbum(token, albumId);
    },

    getCover(token, albumId) {
        return _getAlbumCover(token, albumId);
    }
  }
})();

//Change UI elements programatically
const UIController = (function() {

  //object to hold references to html selectors
  const DOMElements = {
    hfToken: '#hidden_token'
  }

  return {
    storeToken(value) {
      // document.querySelector(DOMElements.hfToken).value = value;
      document.getElementById('hidden_token').value = value;
    },

    getStoredToken() {
      return {
          token: document.getElementById('hidden_token').value
      }
    }

}
})();


const APPController = (function(UICtrl, APICtrl) {

  //Defines the init function
  const beginApp = async () => {
    token = await APICtrl.getToken();

    //store the token onto the page
    UICtrl.storeToken(token);
  }

  token = UICtrl.getStoredToken().token;
  var album = APICtrl.getSongsOnAlbumMethod(token, albumID);
  dt = album;

  dt.then(function(results) {
    Array.prototype.forEach.call(results.items, (element, i) => {
      musics.push(element.name);
      if(i == 0) {
        createPage(element, true);

        //Adds play/pause on musics
        btn = document.getElementById('playPause');
        position = 0;
        let volSlider = document.getElementById('volRange');

        btn.addEventListener('click', function() {
          active = document.getElementsByClassName('Active')[0];
          if (!(btn.classList.contains("paused"))) {
            active.getElementsByTagName('audio')[0].currentTime = position;
            active.getElementsByTagName('audio')[0].volume = ((parseInt(volSlider.value)-1)/100);
            btn.classList.add("paused");
          } else {
            position = active.getElementsByTagName('audio')[0].currentTime;
            active.getElementsByTagName('audio')[0].volume = 0;
            btn.classList.remove("paused");
          }
        });
      } else {
        createPage(element, false);
      }
    });
  });

  //Hides other pages
  hideElements();

  setVolume();


  albumCoverURL = APICtrl.getCover();

    //Starts the API call
  return {
    init() {
      beginApp();
    }
  }

})(UIController, APIController);

APPController.init();

/*
// On first file (not sure which one)
const resultsJSON = JSON.stringify(ratings);
localStorage.setItem("ratings", resultsJSON);

// On other file (analysis.js)
const resultsJSON = localStorage.getItem("ratings");
var obj = JSON.parse(resultsJSON);
let musics = [];
let ratings = [];
Object.entries(obj).forEach(itm=>musics.push(itm[0]));
Object.entries(obj).forEach(itm=>ratings.push(itm[1]));

*/
