// variables
let article = null
let readable = null
let openBankButton = document.getElementById("openBankButton")
let simplifyButton = document.getElementById("simplfyButton")

// 1. Check if active tab is readable
const checkReadable = async () => {
  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      docString = request.doc
      let doc = new DOMParser().parseFromString(docString, 'text/xml');
      if (isProbablyReaderable(doc)) {
        readable = true
        let mArticle = new Readability(doc).parse();
        article = mArticle
        // alert(`TextContent: ${article.title}`)
        if (article.textContent) {
          simplifyButton.disabled = false
          simplifyButton.classList.remove("disabled")
        }
      } else {
        readable = false
      }
    }
  )
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: cloneDoc
  })
}

function cloneDoc() {
  let doc = document.cloneNode(true)
  let stringdoc = new XMLSerializer().serializeToString(doc)
  chrome.runtime.sendMessage({ doc: stringdoc });
}

checkReadable()

// 2. add on click listener
openBankButton.addEventListener("click", async () => {
  chrome.tabs.create({ url: '../html/wordbank.html' });
})

POST_PAGEDATA_URL = 'https://www.google.com'
GET_RESULT_URL = 'http://localhost:3000/'

simplifyButton.addEventListener("click", async () => {
  await chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
    console.log(tab)
    chrome.tabs.create({ url: GET_RESULT_URL + '?url=' + tab[0].url })
  })
})