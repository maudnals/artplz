#! /usr/bin/env node

const {
  urlPathToArtworkTitle,
  artistNameChunksToDisplayName,
} = require('./utils');
const { getImagesArray } = require('./scrape');
const { logArtworkAndCaption, logWait, logBye, logError } = require('./log');
const { getArtistName } = require('./input');
const { exitKey } = require('./config');
const { getRandomArtist } = require('./data');
const { getRandomArrayElement } = require('./utils');

async function main() {
  const artistNameInput = await getArtistName();
  if (artistNameInput && artistNameInput.toLowerCase() === exitKey) {
    await logBye();
    process.exit();
  }
  let artistName = artistNameInput.trim() || getRandomArtist();

  await logWait();
  const artistNameFormatted = artistName
    .trim()
    .split(' ')
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk)
    .join('-');
  const imagesArr = await getImagesArray(artistNameFormatted);
  const randomImg = getRandomArrayElement(imagesArr);
  await logArtworkAndCaption(randomImg.imgSrc, randomImg.imgTitle);
}

(async function () {
  while (true) {
    try {
      await main();
    } catch (error) {
      logError(error);
    }
  }
})();
