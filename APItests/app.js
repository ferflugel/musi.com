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
    

    const _getsongsinalbum = async (token, albumId) => {

        const limit = 10;
        console.log(`https://api.spotify.com/v1/albums/${albumId}/tracks`);
        const result = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
	console.log(data);
        return data;
    }



    return {
        getSongsOnAlbumMethod(token, albumId) {
	    console.log(albumId);
            return _getsongsinalbum(token, albumId);
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
	songsinalbum = APICtrl.getSongsOnAlbumMethod(token, '4LH4d3cOWNNsVw41Gqt2kv');
        console.log(songsinalbum);
	
    });
  

    return {
        init() {
            console.log('App is starting');
        }
    }

})(UIController, APIController);

// will need to call a method to load the genres on page load
APPController.init();




