let params = new URLSearchParams(location.search);
albumID = params.get('albumId');
var dt;

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
          mode: 'no-cors',
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
<<<<<<< HEAD:V2_Chung/songs.js
    token = await APICtrl.getToken();

    //store the token onto the page
    UICtrl.storeToken(token);
=======
    const token = await APICtrl.getToken();
    console.log(APIController.getCover(token, albumID));
    let album = APIController.getSongsOnAlbumMethod(token, albumID);
    dt = album;
    dt.then(function(results) {
      Array.prototype.forEach.call(results.items, (elem, i) => {
        if(i == 0) {
          createPage(elem, true)
        } else {
          createPage(elem, false);
        }
      });
    })

      // document.getElementById('albumCover').src = APIController.getCover(token, album).images[0].url;
>>>>>>> 722222054c8feada443a4335978513aa9f6428ec:songs.js
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

  hideElements();
  updateActive();
  //Starts the API call
  return {
    init() {
      beginApp();
    }
  }

})(UIController, APIController);

APPController.init();
