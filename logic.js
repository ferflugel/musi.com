const params = new URLSearchParams(window.location.search);
const albumName = params.get('album');
document.getElementById('text').innerHTML = '<h3>' + 'Rate musics from ' + albumName +'</h3>';

var counts = ['1','2','3','4'];
var container = document.getElementById('container');
var original = document.getElementById('rateForm');
counts.forEach(function(count) {
    var node = original.cloneNode(true);                 // Create a clone of original node; 'true' refers to copy the child elements
    node.style.display = "inline";
    node.querySelectorAll(".formRate")[0].querySelectorAll('input').forEach(function(elem) {
        elem.setAttribute("name", count);
        var s = "updateVal('" + count + "')";
        elem.setAttribute("onclick", s);
    });

    container.appendChild(node);         //Appends element to container element
});

function updateVal(i) {
    const val = document.querySelector("input[name='"+ i + "']:checked").value;
    console.log("Input - " + i + " : " + val);
}
