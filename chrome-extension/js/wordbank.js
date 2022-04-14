let words = document.getElementById("words")

chrome.storage.sync.get("words", (savedWords) => {
  words.innerText = JSON.stringify(savedWords)
})