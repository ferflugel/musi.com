let params = new URLSearchParams(location.search);
albumID = params.get('albumId');
var dt;
var albumCoverURL;


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
  cln.querySelectorAll('div.colorBar')[0].querySelectorAll('.musicName')[0].innerHTML = musicName;
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
      } else {
        createPage(element, false);
      }
    });
  });

  //Hides other pages
  hideElements();

  setVolume();

  //Not working
  //  Fades audio in and out
  // var audioElements = document.getElementsByClassName("audioPreview");
  // console.log(audioElements);
  // for(var i = 0;  i < audioElements.length; i++) {
  //   elem = audioElements[i];
  //   console.log(i);
  //   elem.addEventListener('timeupdate', function() {
  //     var fadeOut = elem.duration-2;
  //     setInterval(function () {
  //
  //         // Only fade if past the fade out point or not at zero already
  //         if ((elem.currentTime >= fadeOut) && (elem.volume != 0.0)) {
  //             elem.volume -= 0.1;
  //         }
  //         // When volume at zero stop all the intervalling
  //         if (elem.volume === 0.0) {
  //             clearInterval(fadeAudio);
  //         }
  //     }, 200);
  //   });
  //
  //   elem.addEventListener('ended', function() {
  //     elem.currentTime = 0;
  //
  //     setInterval(function () {
  //
  //         // Only fade if past the fade in point
  //         if ((elem.currentTime >= 0) && (elem.volume <= 1.0)) {
  //             elem.volume += 0.1;
  //         }
  //         // When volume at 1 stop all the intervalling
  //         if (elem.volume === 1.0) {
  //             clearInterval(fadeAudio);
  //         }
  //     }, 200);
  //   });
  // };

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
