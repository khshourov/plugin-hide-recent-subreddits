browser.runtime.onInstalled.addListener(async () => {
    try {
        await browser.storage.local.set({ 'visibility': 'hidden' });
    } catch(err) {
        console.log('Error occurred when setting `visibility` property in local-storage: ', err.message);
    }
});

browser.pageAction.onClicked.addListener(async (tab) => {
    try {
        const storage = await browser.storage.local.get('visibility');
        const updatedVisibility = storage.visibility === 'hidden' ? 'visible' : 'hidden';
        await browser.storage.local.set({ 'visibility': updatedVisibility });
        await browser.pageAction.setIcon({
            tabId: tab.id,
            path: {
                16: `icons/toolbar/${updatedVisibility}/hrs-16.png`,
                32: `icons/toolbar/${updatedVisibility}/hrs-32.png`,
                64: `icons/toolbar/${updatedVisibility}/hrs-64.png`,
            },
        });
    } catch(err) {
        console.log('Error occurred when updating `visibility` property in local-storage: ', err.message);
    }
});