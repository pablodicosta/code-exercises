const express = require("express");
const { scrapeSite } = require("./site-scraper");
const { find } = require("lodash");
const { response } = require("express");

const createService = () => {
  const app = express();
  let siteData = {};
  
  app.get('/quotes', async (req, res) => {
    if (!siteData.quotes)
      siteData = await scrapeSite();

    const { tag, author } = req.query;
    let response;

    if (author)
      response = siteData.quotes.filter(quote => quote.author === author);
    else if (tag)
      response = siteData.quotes.filter(quote => quote.tags.some(quoteTag => quoteTag === tag));
    else
      response = siteData.quotes;

    res.send({
      data: response.map(({text, author, tags}) => ({ text, author, tags }))
    });
  });

  app.get('/authors', async (req, res) => {
    if (!siteData.authors)
      siteData = await scrapeSite();

    const { name } = req.query;
    let response;

    if (name)
      response = [find(siteData.authors, { name })];
    else
      response = siteData.authors;

    res.send({
      data: response.filter(el => el)
    });
  });

  return app;
};

module.exports = { createService }; 