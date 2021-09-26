// let params = new URLSearchParams(location.search);
// id = params.get('albumId')

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

  const beginApp = async () => {
    const token = await APICtrl.getToken();
    let album = APIController.getSongsOnAlbumMethod(token, "7CGhx630DIjdJqaBDVKc5j");
  }
  return {
    init() {
      beginApp();
    }
  }

})(APIController);

APPController.init()