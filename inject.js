(function() {
  const collection = [];
  chrome.bookmarks.getTree(function(bookmarks) {
    bookmarks[0].children.forEach(data => {
      let bookmark = {};
      bookmark["title"] = data.title;
      bookmark["children"] = data.children;
      collection.push(bookmark);
    });

    function mapIt(target) {
      return target
        .map(item => {
          if (item.children) {
            return mapIt(item.children);
          }
          return item;
        })
        .flat();
    }

    const merged = collection
      .map(item => item.children)
      .reduce((total, next) => total.concat(next));

    let bookmarksFinal = merged.map(bookmark => {
      if (bookmark.children) {
        return mapIt(bookmark.children);
      }
      return bookmark;
    });

    bookmarksFinal = bookmarksFinal.flat().sort((a, b) => {
      return b.dateAdded - a.dateAdded;
    });

    function render(target) {
      app.innerHTML = "";
      target.forEach(item => {
        const template = `<div class="card-wrap">
    						<a target="_blank" href=${item.url} class="card">
    							<h2>${item.title}</h2>         
    						</a>
    					</div>`;
        app.innerHTML += template;
      });
    }

    function handleInput(e) {
      const value = e.target.value;
      let inputFiltered = bookmarksFinal.filter(bookmark =>
        bookmark.title.match(new RegExp(value, "gi"))
      );
      render(inputFiltered);
    }

    render(bookmarksFinal);
    searchInput.removeAttribute("disabled");
    searchInput.addEventListener("input", handleInput);
  });
})();
