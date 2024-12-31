const {normalizeURL} = require("./crawl.js")
const {test, expect} = require("@jest/globals") 


test("normalizeURL", ()=>{
    const input= "http://satyamcodes.online/home/"
    const actual = normalizeURL(input)
    const expected = "satyamcodes.online/home"
    expect(actual).toEqual(expected)
})