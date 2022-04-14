chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ words: [{ word: 'persistent', success: 0, fail: 0}]})
})