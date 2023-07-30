// Print that the report is starting
// Sort the pages so that pages with the largest number of inbound internal links are first
// Print each page in a nice, formatted way. Something like: Found ${count} internal links to ${url}

function printReport(pages)
{
    console.log(`Generating report...`)
    for (const page of pages)
    {
        page[0] = url
        page[1] = counts
        console.log(`Found ${count} internal links to ${url}`)
    }

}



module.exports = 
{
    printReport
}