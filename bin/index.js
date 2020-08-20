const term = require("terminal-kit").terminal;
const validator = require("validator");
const fetch = require("node-fetch");

function validateString(str) {
  return validator.isAlpha(str) && !validator.isEmpty(str);
}

function getImgSrcFromArtworkPageHtml(html) {
  let htmlShort = html.substring(0, 20000);
  let imgStartIdx = htmlShort.indexOf("<img");
  if (imgStartIdx === -1) {
    console.log("\n👀 No image found on the artwork page.");
    process.exit();
  }
  let imgEl = htmlShort.substring(imgStartIdx, imgStartIdx + 400);
  // (picasso bugfix): wikipedia may have small utility images on top of the page
  // to check if it's a painting: check if SVG
  if (imgEl.includes("svg")) {
    htmlShort = htmlShort.substring(imgStartIdx + 1, 20000);
    imgStartIdx = htmlShort.indexOf("<img");
    imgEl = htmlShort.substring(imgStartIdx, imgStartIdx + 400);
  }
  const imgAttributes = imgEl.split(" ");
  const srcStr = imgAttributes.find((attr) => attr.startsWith("src="));
  const imgSrc = srcStr.substring(`src="`.length, srcStr.length - `"`.length);
  return imgSrc;
}

function getArtworkWikiPagePathFromArtistPageHtml(html) {
  const htmlShort = html.substring(0, 20000);
  const artworkListStartIdx = htmlShort.indexOf("Notable work");
  const artworksHtml = htmlShort.substring(
    artworkListStartIdx,
    artworkListStartIdx + 1100
  );

  // (chagall bugfix): "List of artworks" is yet another link
  if (artworkListStartIdx === -1 || artworksHtml.includes("List of")) {
    console.log("\n👀 No artwork list found on the artist's page.");
    process.exit();
  }

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

  const fullDisplayName = nameChunks
    .map((chunk) => `${chunk.charAt(0).toUpperCase()}${chunk.slice(1)}`)
    .join(" ");
  term.green("\n\nLooking");
  await term.slowTyping("...", { delay: 100 });

  const nameUrlChunk = nameChunks
    // (edward hopper bugfix:) wikipedia capitalizes url path chunks
    .map((chunk) => `${chunk.charAt(0).toUpperCase()}${chunk.slice(1)}`)
    .join("_");

  const artworkWikiPagePath = await fetch(
    `https://en.wikipedia.org/wiki/${nameUrlChunk}`
  )
    .then((response) => {
      return response.text();
    })
    .then((html) => getArtworkWikiPagePathFromArtistPageHtml(html));

  // /wiki/The_Scream -> The_Scream
  const artworkTitleChunks = artworkWikiPagePath.split("/");
  // The_Scream -> The Scream
  const artworkTitle = artworkTitleChunks[artworkTitleChunks.length - 1]
    .split("_")
    .join(" ");

  const imgSrc = await fetch(`https://en.wikipedia.org${artworkWikiPagePath}`)
    .then((response) => {
      return response.text();
    })
    .then(async (html) => getImgSrcFromArtworkPageHtml(html));

  try {
    term.green("\n\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
    await term.drawImage(`https:${imgSrc}`, {
      shrink: { width: term.width * 2.2, height: term.height * 1.4 },
    });
    term.green("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    term.green("\n%s", artworkTitle);
    term.green(" — %s \n", fullDisplayName);
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
