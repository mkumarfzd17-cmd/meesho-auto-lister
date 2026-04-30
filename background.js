chrome.runtime.onInstalled.addListener(() => {
    console.log('Meesho Auto Lister installed!');
    chrome.storage.local.set({ delay: 1000, retries: 3 });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getSettings') {
        chrome.storage.local.get(['delay', 'retries'], sendResponse);
    }
});
