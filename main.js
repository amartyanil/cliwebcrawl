const { crawlPage } = require('./crawl.js')

async function main()
{
    const args = process.argv
    let baseURLmain = process.argv[2]

    if ((baseURLmain.slice(0,7) !== "http://") or (baseURLmain.slice(0,8) !== "https://"))
    {
        baseURLmain = `http://` + baseURLmain
    }

    if (args.length < 3)
    {
        console.log("No website provided")
        process.exit(1)
    }
    else if (args.length > 3)
    {
        console.log("Too many commands")
        process.exit(1)
    }
     
    
    console.log(`Starting to crawl ${baseURLmain}`)
    const pages = await crawlPage(baseURLmain,baseURLmain, {})

    for (const page of Object.entries(pages))
    {
        console.log(page)
    }
}

main()