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
	console.log(formattedstr);
	const result = await fetch(`https://api.spotify.com/v1/search?q=album:${formattedstr}&type=album`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
	//console.log(data);
        return data.albums;
    }

    const _getsongsinalbum = async (token, albumId) => {

        const limit = 10;
        console.log(`https://api.spotify.com/v1/albums/${albumId}/tracks`);
        const result = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        console.log(data);
        console.log(token);

        let musics = '';
        // HOW TO GET MUSICS INTO HTML:
        for(let i = 0; i < data['items'].length; i++){
            //document.getElementById('dummyDiv').innerHTML += data['items'][i]['name'];
            musics += '|' + data['items'][i]['name'];
        }

        localStorage.setItem('musics', musics);
        return data;
    }


    return {
        getToken() {
            return _getToken();
        },
        getSongsOnAlbumMethod(token, albumId) {
	    console.log(albumId);
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
	
    DOMInputs.submit.addEventListener('click', async (e) => {

	e.preventDefault();
	const token = UICtrl.getStoredToken().token;
	console.log(token);

	var searchTerms = document.getElementById('searchBox').value;
	console.log(searchTerms);

	const searchresults = await APICtrl.searchforalbumsmethod(token, searchTerms);
	console.log("ALBUMS POSSIBLE");	
	console.log(searchresults.items);
	console.log(searchresults.items[0]);
	console.log(searchresults.items[0].images[0].url);
	console.log(searchresults.items[0].name);
	document.getElementById('image_display').src = searchresults.items[0].images[0].url;


	albumID = searchresults.items[0].id;
	songsinalbum = await APICtrl.getSongsOnAlbumMethod(token, albumID);
        console.log(songsinalbum);


	console.log(">>>>>>>>>>>>>>>>>>>OUTPUT AREA<<<<<<<<<<<<<<<<<<");


	console.log(">>>>>>>>>>>>>>>>>>>SEARCHED FOR:");
	console.log(searchTerms);

	console.log(">>>>>>>>>>>>>>>>>>>POSSIBLE ALBUMS:");
	var searchItems = searchresults.items;
	let i = 0;
	while (i < Object.keys(searchItems).length){
	console.log(searchresults.items[i].name);
	i++;
	}
	console.log(">>>>>>>>>>>>>>>>>>>ZEROETH ALBUM SELECTED, ALBUM NAME:");
	console.log(searchresults.items[0].name);

	console.log(">>>>>>>>>>>>>>>>>>>ZEROETH ALBUM SONGS");
	i = 0;
	while (i < Object.keys(songsinalbum.items).length){
	console.log(songsinalbum.items[i].name);
	i++;
	}	


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




