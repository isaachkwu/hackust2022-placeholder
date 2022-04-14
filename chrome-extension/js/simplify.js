// chrome.runtime.sendMessage({ doc: document.cloneNode(true) });

// if (isProbablyReaderable(document.cloneNode(document))) {
//   console.log("This article is readable.")

//   let article = new Readability(document.cloneNode(document)).parse();
//   console.log(article)
//   console.log(`Title: ${article.title}`)
//   console.log(`Excerpt: ${article.excerpt}`)
//   console.log(`TextContent: ${article.textContent}`)
//   chrome.runtime.sendMessage({
//     readable: true, 
//     title: article.title, 
//     excerpt: article.excerpt, 
//     textContent: article.textContent
//   });
// } else {
//   console.warn("not readable")
//   chrome.runtime.sendMessage({ readable: false });
// }
