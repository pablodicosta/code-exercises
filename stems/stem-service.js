const axios = require("axios");
const express = require("express");

const createService = async () => {
  const app = express();
  const dictionaryURL = "https://raw.githubusercontent.com/qualified/challenge-data/master/words_alpha.txt";

  console.log("Loading dictionary...");
  const { data } = await axios.get(dictionaryURL);
  const dictionary = data.split("\r\n");
  console.log(`${dictionary.length} words loaded.`);

  app.get("/", (req, res) => {
    const { stem } = req.query;
    let result;

    if (!stem || !stem.length)
      result = dictionary;
    else
      result = dictionary.filter(word => word.startsWith(stem));

    if (!result.length)
      return res.sendStatus(404);

    res.send({ data: result })
  });

  return app;
};

module.exports = { createService };