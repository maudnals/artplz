const term = require("terminal-kit").terminal;
const validator = require("validator");
const fetch = require("node-fetch");
// bug: mondrian, gauguin, rubens, dali (crash)
// bug: vermeer (displays a small image)
// bug: "wharol" (typo)
// bug: edward hopper
// OK: degas, picasso, kahlo, klimt, edward hopper
// TODO add console.log
// TODO display title
// TODO add link to wikipedia
// TODO different divider types
// TODO display anmation while img load
// TODO manage errors: what if the page is not an artist page? or not found?

function validateString(str) {
  return validator.isAlpha(str) && !validator.isEmpty(str);
}

function getArtworkWikiPagePathFromArtistPageHtml(html) {
  const htmlShort = html.substring(0, 20000);
  const artworkListStartIdx = htmlShort.indexOf("Notable work");
  console.log(artworkListStartIdx);
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
  const artworkWikiPagePath = artworkWikiPagePaths[randomIdx];
  return artworkWikiPagePath;
}

function getImgSrcFromArtworkPageHtml(html) {
  const htmlShort = html.substring(0, 20000);
  const imgStartIdx = htmlShort.indexOf("<img");
  const imgEl = htmlShort.substring(imgStartIdx, imgStartIdx + 400);
  const imgAttributes = imgEl.split(" ");
  const srcStr = imgAttributes.find((attr) => attr.startsWith("src="));
  const imgSrc = srcStr.substring(`src="`.length, srcStr.length - `"`.length);
  return imgSrc;
}

(async function () {
  term.green("Artist?\n");
  const name = await term.inputField().promise;
  const nameChunks = name.split(" ").map((chunk) => chunk.trim());
  nameChunks.forEach((chunk) => {
    if (!validateString(chunk)) {
      term.red("\nOh no, that's empty or contains special characters 😳\n");
      term.red("\nTry again!\n");
      process.exit();
    }
  });

  const fullDisplayName = nameChunks
    .map((chunk) => `${chunk.charAt(0).toUpperCase()}${chunk.slice(1)}`)
    .join(" ");
  term.green("\nLooking for %s's good stuff", fullDisplayName);
  await term.slowTyping(".....", { delay: 90 });
  term.green("\n\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");

  const nameUrlChunk = nameChunks
    // wikipedia capitalizes this
    .map((chunk) => `${chunk.charAt(0).toUpperCase()}${chunk.slice(1)}`)
    .join("_");

  const artworkWikiPagePath = await fetch(
    `https://en.wikipedia.org/wiki/${nameUrlChunk}`
  )
    .then((response) => {
      return response.text();
    })
    .then((html) => getArtworkWikiPagePathFromArtistPageHtml(html));

  const imgSrc = await fetch(`https://en.wikipedia.org${artworkWikiPagePath}`)
    .then((response) => {
      return response.text();
    })
    .then(async (html) => getImgSrcFromArtworkPageHtml(html));

  await term.drawImage(`https:${imgSrc}`, {
    shrink: { width: term.width * 2.2, height: term.height * 1.4 },
  });
  term.green("~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  await term.slowTyping("\n\nOK Bye! ✨\n", { delay: 90 });

  process.exit();
})();
