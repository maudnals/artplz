const term = require("terminal-kit").terminal;
const validator = require("validator");
const fetch = require("node-fetch");
// TODO remove
const cheerio = require("cheerio");
// bug: mondrian, gauguin, rubens
// OK: degas, picasso, kahlo, klimt
// TODO add console.log
// TODO display title

function validateString(str) {
  return validator.isAlpha(str) && !validator.isEmpty(str);
}

(async function () {
  term.green("Artist?\n");
  const name = await term.inputField().promise;
  const nameChunks = name.split(" ").map((chunk) => chunk.trim());
  nameChunks.forEach((chunk) => {
    if (!validateString(chunk)) {
      term("\nOh no, that's empty or contains special characters 😳\n");
      term("\nTry again!\n", { delay: 90 });
      process.exit();
    }
  });

  const fullDisplayName = nameChunks
    .map((chunk) => `${chunk.charAt(0).toUpperCase()}${chunk.slice(1)}`)
    .join(" ");

  const urlName = nameChunks.join("_");

  term.green("\nLooking for %s's good stuff\n", fullDisplayName);

  const u = await fetch(`https://en.wikipedia.org/wiki/${urlName}`)
    .then((response) => {
      return response.text();
    })
    .then((html) => {
      const htmlShort = html.substring(0, 20000);
      const artworkListStartIdx = htmlShort.indexOf("Notable work");
      const artworksHtml = htmlShort.substring(
        artworkListStartIdx,
        artworkListStartIdx + 650
      );

      // TODO
      // in case we overflow this table like for degas
      //   const blaaa = artworksHtml.indexOf("</tr>");
      //   console.log(blaaa);

      const artworkWikiPagePaths = artworksHtml
        // split to distinguish artworks
        .split('<a href="')
        // this guarantees that it's likely to be an artwork AND that the link isn't truncated
        .filter((entry) => entry.includes("title"))
        .filter((entry) => entry.startsWith("/wiki/"))
        // clean to keep only the page path (href)
        .map((entry) => entry.substring(0, entry.indexOf(`"`)));
      const randomIdx = Math.floor(Math.random() * artworkWikiPagePaths.length);
      const selectedArtworkWikiPagePath = artworkWikiPagePaths[randomIdx];
      fetch(`https://en.wikipedia.org${selectedArtworkWikiPagePath}`)
        .then((response) => {
          return response.text();
        })
        .then(async (html) => {
          const htmlShort = html.substring(0, 20000);
          const imgStartIdx = htmlShort.indexOf("<img");
          const imgEl = htmlShort.substring(imgStartIdx, imgStartIdx + 400);
          const imgAttributes = imgEl.split(" ");
          const srcStr = imgAttributes.find((attr) => attr.startsWith("src="));
          const imgSrc = srcStr.substring(
            `src="`.length,
            srcStr.length - `"`.length
          );
          const x = await term.drawImage(`https:${imgSrc}`, {
            shrink: { width: term.width * 2, height: term.height * 1.4 },
          });
        });
    });

  await term.slowTyping("¸.·´¯`·.¸\n", { delay: 100 });
  process.exit();
})();
