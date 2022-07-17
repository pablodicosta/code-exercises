const cheerio = require("cheerio");
const axios = require("axios");
const { load } = require("cheerio");

const BASE_URL = "http://quotes.toscrape.com";

const scrapeQuotePage = async page => {
    const pageContent = await axios.get(`${BASE_URL}/page/${page}/`);
    const $ = cheerio.load(pageContent.data);
    return $("div.quote").map((_, quote) => ({
        text: $(quote).find("span.text").text().trim().slice(0, 50),
        author: $(quote).find("small.author").text(),
        authorUrl: $(quote).find("small.author + a").attr('href'),
        tags: $(quote).find("a.tag").map((_, tag) => $(tag).text()).get()
    })).get();
}

const scrapeAuthorPage = async authorUrl => {
    const pageContent = await axios.get(`${BASE_URL}${authorUrl}/`);
    const $ = cheerio.load(pageContent.data);
    return $("div.author-details").map((_, author) => ({
        name: $(author).find("h3.author-title").text(),
        biography: $(author).find("div.author-description").text().trim().slice(0, 50),
        birthdate: $(author).find("span.author-born-date").text(),
        location: $(author).find("span.author-born-location").text()
    })).get()[0];
}

async function* scrapeQuotePages() {
    let page = 1;
    do {
        pageQuotes = await scrapeQuotePage(page++);
        yield pageQuotes;
    } while (pageQuotes.length);
}

const scrapeSite = async () => {
    console.log("Scraping quotes site...");
    
    let quotes = [];
    for await (let pageQuotes of scrapeQuotePages()) {
        quotes.push(...pageQuotes);
    }
    
    const authors = await Promise.all(
        [...new Set(quotes.map(quote => quote.authorUrl))]
            .map(async url => await scrapeAuthorPage(url))
    );

    console.log(`${quotes.length} quotes loaded.`);
    console.log(`${authors.length} authors loaded.`);
        
    return {
        quotes,
        authors
    }
}

module.exports = { scrapeSite };