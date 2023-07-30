const { JSDOM } = require('jsdom')

function getURLsFromHTML(baseURL, htmlBody)
{
    let finalURLArray = []
    const htmlObj = new JSDOM(htmlBody)
    const aObjects = htmlObj.window.document.querySelectorAll('a')
    for (url of aObjects)
    {
        if (url.href.slice(0,1) === '/')
        {
            try
            {
                finalURLArray.push((new URL(`${baseURL}${url.href}`)).href)
            }
            catch
            {
                console.log(`${err.message}: ${aElement.href}`)
            }
        }
        else
        {
            try
            {
                finalURLArray.push(url.href)
            }
            catch
            {
                console.log(`${err.message}: ${aElement.href}`)
            }
        }
    }
    return finalURLArray

}

function normalizeURL(inputtedURL)
{
    let urlObj = new URL(inputtedURL)
    let standardURL = `${urlObj.host}${urlObj.pathname}`
    if (standardURL.length > 0 && standardURL.slice(-1) == '/')
    {
        standardURL = standardURL.slice(0,-1)
    }
    return standardURL
}

async function crawlPage(baseURL, currentURL, pages)
{
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)
 
    if (baseURLObj.hostname !== currentURLObj.hostname)
    {
        return pages
    }

    const normalizedCurrentURL = normalizeURL(currentURL)
    const normalizedBaseURL = normalizeURL(baseURL)

    if (pages[normalizedCurrentURL] > 0)
    {
        pages[normalizedCurrentURL] ++ 
        return pages
    }
    
    
    if (currentURL === baseURL)
    {
        pages[normalizedCurrentURL] = 0
    }
    else
    {
        pages[normalizedCurrentURL] = 1
    }

    console.log(`Actively crawling: ${currentURL}`)
    
    try
    {
        const resp = await fetch(currentURL)
        

        let currentURLBody = await resp.text()
        let nextURLs = getURLsFromHTML(baseURL,currentURLBody)

        for (const nextURL of nextURLs)
        {
            pages = await crawlPage(baseURL,nextURL,pages)
        }

        if (resp.status > 399)
        {
            console.log(`Error in fetch with status code ${resp.status} on page: ${currentURL}`)
            return pages
        }

        const contentType = resp.headers.get("content-type")
        if (!contentType.includes("text/html"))
        {
            console.log(`Error in fetch with content type ${contentType} on page: ${currentURL}`)
            return pages
        }
    
    }
    catch (err)
    {
        console.log(`Error in fetch: ${err.message}, on page ${currentURL}`)
    }

    return pages
}

module.exports = 
{
    crawlPage,
    normalizeURL,
    getURLsFromHTML
}