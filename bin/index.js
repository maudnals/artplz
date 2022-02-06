#! /usr/bin/env node

const {
  urlPathToArtworkTitle,
  artistNameChunksToDisplayName,
} = require('./utils');
const { getArtworkWikiPagePath, getImgSrc } = require('./scrape');
const { logArtworkAndCaption, logWait, logBye, logError } = require('./log');
const { getArtistName } = require('./input');
const { exitKey } = require('./config');
const { getRandomArtist } = require('./data');

async function main() {
  const artistNameInput = await getArtistName();
  if (artistNameInput && artistNameInput.toLowerCase() === exitKey) {
    await logBye();
    process.exit();
  }
  let artistName = artistNameInput.trim() || getRandomArtist();
  const artistNameChunks = artistName
    .trim()
    .split(' ')
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk);
  await logWait();
  const artworkWikiPagePath = await getArtworkWikiPagePath(artistNameChunks);
  const artworkTitle = await urlPathToArtworkTitle(artworkWikiPagePath);
  const imgSrc = await getImgSrc(artworkWikiPagePath);
  const artistDisplayName = artistNameChunksToDisplayName(artistNameChunks);
  await logArtworkAndCaption(imgSrc, artworkTitle, artistDisplayName);
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
