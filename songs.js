let params = new URLSearchParams(location.search);
albumID = params.get('albumId')
var dt;

//Iteratively create music pages with album songs and data
function createPage(musicRef, active) {
  const cln = document.getElementById('clone').cloneNode(true);
  //Appends the modified div to body
  // document.body.appendChild(cln);
  document.body.insertBefore(cln, document.body.children[1]);
  // var cln = document.getElementById('id')
  //Gets data from the music reference
  const artist = musicRef.artists[0].name;
  const musicName = musicRef.name;
  const audioPrev = musicRef.preview_url;
  // const coverImage = musicRef;


  //Modify div with gathered data
  cln.querySelectorAll('audio')[0].src = audioPrev;
  cln.querySelectorAll('div.colorBar')[0].querySelectorAll('.musicName')[0].innerHTML = musicName;
  cln.querySelectorAll('div.colorBar')[0].querySelectorAll('.musicArtist')[0].innerHTML = artist;
  cln.querySelectorAll('div.colorBar')[0].querySelectorAll('.rateButton').forEach((item, i) => {
    item.id = musicName + item.id.split('Clone')[1];
    document.getElementById(item.id).setAttribute('onmouseover', "hoveringEffect('" + item.id + "')");
    document.getElementById(item.id).setAttribute('onclick', 'updateVal("' + item.id + '")');
  });
  cln.id = musicName;
  cln.className = "musicPage";
  if(active) {
    cln.setAttribute('name', "Active");
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
      console.log(data.items);
      return data;
  }

  return {
    getToken() {
      return _getToken();
    },
    getSongsOnAlbumMethod(token, albumId) {
  	  console.log(albumId);
      return _getSongsInAlbum(token, albumId);
    }
  }
})();

const APPController = (function(APICtrl) {

  //Defines the init function
  const beginApp = async () => {
    const token = await APICtrl.getToken();
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
  }

  // album

  //Starts the API call
  return {
    init() {
      beginApp();
    }
  }

})(APIController);

APPController.init()
