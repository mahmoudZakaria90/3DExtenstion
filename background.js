   const fetchy = function(){
       fetch('https://zekas-51feb.firebaseio.com/structuredBookmarks.json', {
               method: 'DELETE'
           })
           .then(e => {
               chrome.bookmarks.getTree(function(bookmarks) {
                       const collection = [];
                       bookmarks[0].children.forEach(data => {
                           let bookmark = {};
                           bookmark["title"] = data.title;
                           bookmark["children"] = data.children;
                           collection.push(bookmark)
                       })
                       fetch('https://zekas-51feb.firebaseio.com/structuredBookmarks.json', {
                           method: 'POST',
                           body: JSON.stringify(collection)
                       })
                   })
           })
           .catch(e => console.log(e))
   }
   chrome.bookmarks.onCreated.addListener(fetchy);
   chrome.bookmarks.onRemoved.addListener(fetchy);

   chrome.runtime.onInstalled.addListener(function() {
       chrome.tabs.onCreated.addListener(function(tab) {
           if (tab.url === "chrome://newtab/") {
               chrome.tabs.update({
                   url: "https://mahmoudzakaria90.github.io/chrome-bookmarks-client/"
               })
           }
       })
       chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
           chrome.declarativeContent.onPageChanged.addRules([{
               conditions: [new chrome.declarativeContent.PageStateMatcher()],
               actions: [new chrome.declarativeContent.ShowPageAction()]
           }]);
       });
   });