function getword(info,tab) {
    console.log("Word " + info.selectionText + " was clicked.");
    chrome.tabs.create({  
      url:"https://translate.google.co.in/?sl=auto&tl=hi&text="+info.selectionText+"&op=translate"
    });
  }
  chrome.contextMenus.create({
    title: "Translate to Hindi: %s", 
    contexts:["selection"], 
    onclick: getword
  });
