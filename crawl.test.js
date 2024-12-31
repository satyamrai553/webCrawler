const {normalizeURL, getURLsFromHTML} = require("./crawl.js")
const {test, expect} = require("@jest/globals") 


test("normalizeURL", ()=>{
    const input= "http://satyamcodes.online/home/"
    const actual = normalizeURL(input)
    const expected = "satyamcodes.online/home"
    expect(actual).toEqual(expected)
})



test("getURLsFromHTML abosolute", ()=>{
    const inputHTMLBody= `
    <html>
    <body>
    <a href="http://satyamcodes.online">
    Satyam </a>
    </body>
    </html>
    `
    const inputBaseURL = "http://satyamcodes.online/"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["http://satyamcodes.online/"]
    expect(actual).toEqual(expected)
})



test("getURLsFromHTML relative", ()=>{
    const inputHTMLBody= `
    <html>
    <body>
    <a href="/path/">
    Satyam </a>
    </body>
    </html>
    `
    const inputBaseURL = "http://satyamcodes.online"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["http://satyamcodes.online/path/"]
    expect(actual).toEqual(expected)
})
test("getURLsFromHTML invalid url", ()=>{
    const inputHTMLBody= `
    <html>
    <body>
    <a href="invalid">
    invalid url</a>
    </body>
    </html>
    `
    const inputBaseURL = "http://satyamcodes.online"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})