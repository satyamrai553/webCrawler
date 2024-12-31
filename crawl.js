const {JSDOM} = require("jsdom")
function getURLsFromHTML(htmlBody, baseURL){
    const urls =[]
    const dom = new JSDOM(htmlBody)
    const linkELements = dom.window.document.querySelectorAll('a')
    for(const linkELement of linkELements){
        if(linkELement.href.slice(0,1)==='/'){
            //relative
           try {
            const urlObj = new URL(`${baseURL}${linkELement.href}`)
            urls.push(urlObj.href)
           } catch (error) {
            console.log(`Error with relative url: ${error.message}`)
           }
        }
        else{
            try {
                const urlObj = new URL(`${linkELement.href}`)
            urls.push(urlObj.href)
            } catch (error) {
                console.log(`Error with absolute url: ${error.message}`)
            }
        }
      
    }
    return urls
}

async function crawlPage(currentURL){
    console.log(`actively crawling: ${currentURL}`)
    try {
        const resp = await fetch(currentURL)
        if(resp.status > 399){
            console.log(`Error in fetch with status code: ${resp.status} on page: ${currentURL}`)
            return
        }
        const contentType = resp.headers.get("content-type")
        if(!contentType.includes("text/html")){
            console.log(`non html response, content type: ${contentType}, on page: ${currentURL}`)
            return
        }
        console.log(await resp.text())
    } catch (error) {
        console.log(`Error in fetch: ${error.message} on page: ${currentURL}`)
    }
    
}


function normalizeURL(urlString){
    const urlObj = new URL(urlString)
    const hostPath =`${urlObj.hostname}${urlObj.pathname}`
    if(hostPath.length > 0 && hostPath.slice(-1) === '/'){
        return hostPath.slice(0, -1)
    }
    else{
        return hostPath
    }
}

module.exports={
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}