chrome.runtime.onInstalled.addListener(function() {
   chrome.tabs.onCreated.addListener(function( tab ){
     tab.url = "https://mahmoudzakaria90.github.io/HelloZeka/public/"
     chrome.tabs.executeScript({
     	file: './inject.js'
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