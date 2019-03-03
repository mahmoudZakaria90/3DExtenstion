chrome.runtime.onInstalled.addListener(function() {
   chrome.tabs.onCreated.addListener(function(){
     chrome.tabs.update({
     	url: "https://mahmoudzakaria90.github.io/HelloZeka/public/"
     })
   })
   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher()
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
 });