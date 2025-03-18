
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "openAutoCorrect",
        title: "Pro-Grammer",
        contexts: ["selection", "editable"]
    });
});


chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "openAutoCorrect") {
        chrome.storage.local.set({ selectedText: info.selectionText });
        chrome.windows.create({
            url: "popup.html",
            type: "popup",
            width: 400,
            height: 300,
            
        });
        

    }
});



