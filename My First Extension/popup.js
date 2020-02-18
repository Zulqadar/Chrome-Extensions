document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('checkPage');
    checkPageButton.addEventListener('click', function() {
      chrome.tabs.getSelected(null, function(tab) {
        d = document;
        window.open('https://www.google.com/search?q=Zulqadar Idrishi','blank');
      });
    }, false);

    var findButton=document.getElementById('btnFind');
    findButton.addEventListener('click',function(){
      chrome.tabs.getSelected(null,function(tab){
        console.log('Find')
        onWindowLoad();
      });
    },false);
  }, false);

  chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
        //message.innerText = request.source;
        var htmlString=request.source;
        var extractedEmails=extractEmailsFromString(htmlString);
        message.innerText=extractedEmails.join('\n');
    }
  });

  function onWindowLoad() {

    var message = document.querySelector('#message');
  
    chrome.tabs.executeScript(null, {
      file: "getPagesSource.js"
    }, function() {
      // If you try and inject into an extensions page or the webstore/NTP you'll get an error
      if (chrome.runtime.lastError) {
        message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
      }
    });
  
  }

  function extractEmailsFromString(text){
    return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
  }
  
  //window.onload = onWindowLoad;
