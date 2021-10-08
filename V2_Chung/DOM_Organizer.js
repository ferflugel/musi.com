dt.then(function(results) {
  Array.prototype.forEach.call(results.items, (elem, i) => {
    if(i == 0) {
      createPage(elem, true);
    } else {
      createPage(elem, false);
    }
  });
});
