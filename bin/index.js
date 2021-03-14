#! /usr/bin/env node

const term = require('terminal-kit').terminal;
const fetch = require('node-fetch');
const utils = require('./utils');
const scraper = require('./scraper');

(async function () {
  try {
    term.green('\n🎨 Artist?\n');
    const artistName = await term.inputField().promise;
    const artistNameChunks = artistName.split(' ').map((chunk) => chunk.trim());
    artistNameChunks.forEach((chunk) => {
      if (!utils.validateString(chunk)) {
        term.red("\nOh no, that's empty or contains special characters 😳\n");
        term.red('\nTry again!\n');
        process.exit();
      }
    });

    term.green('\n\nLooking');
    await term.slowTyping('...', { delay: 100 });

    const artworkWikiPagePath = await fetch(
      `https://en.wikipedia.org/wiki/${utils.artistNameChunksToUrlPath(
        artistNameChunks
      )}`
    )
      .then((response) => {
        return response.text();
      })
      .then((html) => scraper.getArtworkWikiPagePathFromArtistPageHtml(html));

    const imgSrc = await fetch(`https://en.wikipedia.org${artworkWikiPagePath}`)
      .then((response) => {
        return response.text();
      })
      .then(async (html) => scraper.getImgSrcFromArtworkPageHtml(html));
    term.green('\n\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n');
    await term.drawImage(`https:${imgSrc}`, {
      shrink: { width: term.width * 2.2, height: term.height * 1.4 },
    });
    term.green('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    term.green('\n%s', utils.urlPathToArtworkTitle(artworkWikiPagePath));
    term.green(
      ' — %s \n',
      utils.artistNameChunksToFullDisplayName(artistNameChunks)
    );
    term.green('Wikipedia');

    await term.slowTyping('\n\nOK Bye! ✨\n', { delay: 90 });
    process.exit();
  } catch (error) {
    term.red(error);
    term.red(
      '💥 Uuh crashed while painting, look away and pretend nothing happened!'
    );
    process.exit();
  }
})();
