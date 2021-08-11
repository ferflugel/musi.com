const params = new URLSearchParams(window.location.search);
const albumName = params.get('album');
document.getElementById('text').innerHTML = '<h3>' + 'Rate musics from ' + albumName +'</h3>';
