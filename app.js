//Inspired by: https://github.com/awicks44/JavaScript-SpotifyAPI

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

  const _searchsongsmethod = async (token, searchstring) => {
  	formattedstr = searchstring;
  	while (formattedstr.includes(" ")){
  		formattedstr = formattedstr.replace(" ", "%20");
  	}
  	const result = await fetch(`https://api.spotify.com/v1/search?q=album:${formattedstr}&type=album`, {
              method: 'GET',
              headers: { 'Authorization' : 'Bearer ' + token}
    });

    const data = await result.json();
    return data.albums;
  }

  const _getsongsinalbum = async (token, albumId) => {

      const limit = 10;
      // console.log(`https://api.spotify.com/v1/albums/${albumId}/tracks`);
      const result = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
          method: 'GET',
          headers: { 'Authorization' : 'Bearer ' + token}
      });

      const data = await result.json();
      // console.log(data);
      // console.log(token);

      //Sends album id through url
      document.getElementById('albumIdTAG').value = albumId;
      return data;
  }


  return {
    getToken() {
      return _getToken();
    },
    getSongsOnAlbumMethod(token, albumId) {
  	  // console.log(albumId);
      return _getsongsinalbum(token, albumId);
    },
    searchforalbumsmethod(token, searchstring){
  		return _searchsongsmethod(token, searchstring);
  	}
  }

})();

//Change UI elements programatically
const UIController = (function() {

  //object to hold references to html selectors
  const DOMElements = {
    buttonSubmit: '#btn_submit',
    hfToken: '#hidden_token'
  }

  return {
    inputField() {
      return {
          submit: document.querySelector(DOMElements.buttonSubmit),
      }
    },
    storeToken(value) {
      document.querySelector(DOMElements.hfToken).value = value;
    },

    getStoredToken() {
      return {
          token: document.querySelector(DOMElements.hfToken).value
      }
    }

}
})();

//Control the App's functions
const APPController = (function(UICtrl, APICtrl) {

  // get input field object ref
  const DOMInputs = UICtrl.inputField();

  const beginapp = async () => {
    //get the token
    const token = await APICtrl.getToken();
    //store the token onto the page
    UICtrl.storeToken(token);
  }
  var chosenIndex = 0;
  //Checks if search button was clicked to load data
  document.getElementById('btn_submit').addEventListener('click', async (e) => {

  	e.preventDefault();
  	const token = UICtrl.getStoredToken().token;
  	console.log(token);

  	var searchTerms = document.getElementById('searchBox').value;
  	console.log(searchTerms);

  	const searchresults = await APICtrl.searchforalbumsmethod(token, searchTerms);

    //Sets chosen album
    var redirects = document.getElementById('result').children[0];
    redirects.addEventListener('click', function(e) {
      if (e.target && e.target.matches("li.suggestion")) {
        //Sets album to chosen one from the suggestions dropdown
        chosenIndex = e.target.id;
        document.getElementById('image_display').src = searchresults.items[chosenIndex].images[0].url;

      	albumID = searchresults.items[chosenIndex].id;
      }
    });

  	document.getElementById('image_display').src = searchresults.items[chosenIndex].images[0].url;

  	albumID = searchresults.items[chosenIndex].id;
  	songsinalbum = await APICtrl.getSongsOnAlbumMethod(token, albumID);


  	console.log(">>>>>>>>>>>>>>>>>>>SEARCHED FOR:");
  	console.log(searchTerms);




    document.getElementById('SubmitForm').click();
    });

  //Automatically updates search results dropdown...
  document.getElementById('searchBox').addEventListener('keyup', async (e) => {
    e.preventDefault();
  	const token = UICtrl.getStoredToken().token;

  	var searchTerms = document.getElementById('searchBox').value;

  	const searchresults = await APICtrl.searchforalbumsmethod(token, searchTerms);

  	var searchItems = searchresults.items;

    //If there are more than plenty of search results, show only the first five
  	let i = 0;
    let names = '';
    var res = document.getElementById('result');


    let maxLength = (l) => {
      if(l >= 5) {
        return 5;
      } else {
        return l;
      }
    };

    //Creates suggestions list
    res.innerHTML = "";
    res.appendChild( document.createElement('ul') );
    while (i < maxLength(Object.keys(searchItems).length)){
       //Avoids repeating names on the list
       if(names.includes(searchresults.items[i].name) == false) {
         var element = document.createElement('li');
         element.className = 'suggestion';
         element.id = i;
         element.appendChild( document.createTextNode( searchresults.items[i].name ) );
         names += '<li>' + searchresults.items[i].name + '</li>';
         res.children[0].appendChild( element );
       }

  	   i++;
  	}


    //Shows or hides suggestions according to written input
    if(document.getElementById('searchBox').value == "") {
      res.style.display = 'none';
    } else {
      res.style.display = 'block';
    }


    var redirects = document.getElementById('result').children[0];
    redirects.addEventListener('click', function(e) {
      if (e.target && e.target.matches("li.suggestion")) {
        //Sets album to chosen one from the suggestions dropdown
        chosenIndex = e.target.id;
        document.getElementById('image_display').src = searchresults.items[chosenIndex].images[0].url;
      	albumID = searchresults.items[chosenIndex].id;
      }
    });


    //Gets first or chosen album to be displayed
    document.getElementById('image_display').src = searchresults.items[chosenIndex].images[0].url;

  	albumID = searchresults.items[chosenIndex].id;
  	songsinalbum = await APICtrl.getSongsOnAlbumMethod(token, albumID);

  });

  return {
    init() {
      console.log('App is starting');
      beginapp();
    }
  }

})(UIController, APIController);

// will need to call a method to load the genres on page load
APPController.init();
