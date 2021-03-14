#! /usr/bin/env node

const term = require('terminal-kit').terminal;
const {
  urlPathToArtworkTitle,
  artistNameChunksToDisplayName,
} = require('./utils');
const { getArtworkWikiPagePath, getImgSrc } = require('./scraper');
const {
  logArtworkAndCaption,
  logWait,
  logBye,
  logError,
  getArtistName,
  logArtistDefault,
} = require('./logger');
const config = require('./config');

(async function () {
  try {
    const artistNameInput = await getArtistName();
    let artistName = artistNameInput.trim();
    term.green('\n🎨 Artist?\n');
    const artistName = await term.inputField().promise;
    const artistNameChunks = artistName.split(' ').map((chunk) => chunk.trim());
    artistNameChunks.forEach((chunk) => {
      if (!utils.validateString(chunk)) {
        term.red("\nOh no, that's empty or contains special characters 😳\n");
        term.red('\nTry again!\n');
        process.exit();
    }
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
    await logBye();
    process.exit();
  } catch (error) {
    logError(error);
    process.exit();
  }
})();
