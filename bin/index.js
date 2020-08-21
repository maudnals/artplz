const term = require("terminal-kit").terminal;
const validator = require("validator");
const fetch = require("node-fetch");
const scraper = require("./scraper");
const formatter = require("./formatter");

function validateString(str) {
  return validator.isAlpha(str) && !validator.isEmpty(str);
}

(async function () {
  term.green("\n🎨 Artist?\n");
  const name = await term.inputField().promise;
  const nameChunks = name.split(" ").map((chunk) => chunk.trim());
  nameChunks.forEach((chunk) => {
    if (!validateString(chunk)) {
      term.red("\nOh no, that's empty or contains special characters 😳\n");
      term.red("\nTry again!\n");
      process.exit();
    }
  });

  term.green("\n\nLooking");
  await term.slowTyping("...", { delay: 100 });

  const artworkWikiPagePath = await fetch(
    `https://en.wikipedia.org/wiki/${formatter.nameChunksToUrlPath(nameChunks)}`
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

  try {
    term.green("\n\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
    await term.drawImage(`https:${imgSrc}`, {
      shrink: { width: term.width * 2.2, height: term.height * 1.4 },
    });
    term.green("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    term.green("\n%s", formatter.urlPathToArtworkTitle(artworkWikiPagePath));
    term.green(" — %s \n", formatter.nameChunksToFullDisplayName(nameChunks));
    term.green("Wikipedia");

    await term.slowTyping("\n\nOK Bye! ✨\n", { delay: 90 });
    process.exit();
  } catch {
    console.log(
      "💥 Uuh crashed while painting, look away and pretend nothing happened!"
    );
    process.exit();
  }
})();
