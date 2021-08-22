var counts = ['musica1','musica2','musica3','musica4'];

var container = document.getElementById('container');
var originalForm = document.getElementById('rateForm');
var originalText = document.getElementById('musicID');

counts.forEach(function(count) {
    var node = originalForm.cloneNode(true);                 // Create a clone of original node; 'true' refers to copy the child elements
    var text = originalText.cloneNode(true);
    text.style.display = "inline";
    node.style.display = "flex";
    text.setAttribute("id", count);
    text.innerHTML = "<p>" + count + "</p>";
    node.querySelectorAll('input').forEach(function(elem, i) {
        elem.setAttribute("name", count);
        elem.setAttribute("id", count + i);
        elem.nextSibling.nextSibling.setAttribute("for", count + i);
        var s = "updateVal('" + count + "')";
        elem.setAttribute("onclick", s);
    });


    container.appendChild(text);         //Appends element to container element
    container.appendChild(node);         //Appends element to container element
});


function updateVal(i) {
    const val = document.querySelector("input[name='"+ i + "']:checked").value;
    console.log("Input - " + i + " : " + val);
}
