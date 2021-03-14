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
    if (!artistName) {
      artistName = config.defaultArtist;
      logArtistDefault();
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
