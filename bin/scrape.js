const { artistNameChunksToUrlPath } = require('./utils');
const fetch = require('node-fetch');

const WIKI_BASE_URL = 'https://en.wikipedia.org';

function getImgSrcFromArtworkPageHtml(html) {
  let htmlShort = html.substring(0, 20000);
  let imgStartIdx = htmlShort.indexOf('<img');
  if (imgStartIdx === -1) {
    // TEST THIS: "yyt"
    throw 'No image found on the artwork page';
  }
  let imgEl = htmlShort.substring(imgStartIdx, imgStartIdx + 400);
  // (picasso bugfix): wikipedia may have small utility images on top of the page
  // to check if it's not a painting: check if SVG
  if (imgEl.includes('svg')) {
    htmlShort = htmlShort.substring(imgStartIdx + 1, 20000);
    imgStartIdx = htmlShort.indexOf('<img');
    imgEl = htmlShort.substring(imgStartIdx, imgStartIdx + 400);
  }
  const imgAttributes = imgEl.split(' ');
  const srcStr = imgAttributes.find((attr) => attr.startsWith('src='));
  const imgSrc = srcStr.substring(`src="`.length, srcStr.length - `"`.length);
  return imgSrc;
}

function getArtworkWikiPagePathFromArtistPageHtml(html) {
  // htmlShort and htmlShorter save time on parsing
  const htmlShort = html.substring(0, 20000);

  // on a painter's page, their work is listed under
  // either 'Notable work' or 'Works'
  let artworkListStartIdx = htmlShort.indexOf('Notable work');
  if (artworkListStartIdx === -1) {
    artworkListStartIdx = htmlShort.indexOf('Works');
  }

  // if (artworkListStartIdx === -1) {
  // example: derain++++ beautiful, botero
  // + chagall (list)
  //   console.log('no artwork list');
  //   // throw "No artwork list found on the artist's page";
  //   return '/wiki/File:Derain_CharingCrossBridge.png';
  // }

  const htmlShorter = htmlShort.substring(
    artworkListStartIdx,
    artworkListStartIdx + 6000
  );
  const artworkListEndIdx = htmlShorter.indexOf('</td>');
  const artworksHtml = htmlShorter.substring(0, artworkListEndIdx);

  const artworkWikiPagePaths = artworksHtml
    // split to distinguish artworks
    .split('<a href="')
    // this guarantees that it's likely to be an artwork AND that the link isn't truncated
    .filter((entry) => entry.includes('title'))
    .filter((entry) => entry.startsWith('/wiki/'))
    // clean to keep only the page path (href)
    .map((entry) => entry.substring(0, entry.indexOf(`"`)));
  const randomIdx = Math.floor(Math.random() * artworkWikiPagePaths.length);
  const artworkWikiPagePath = artworkWikiPagePaths[randomIdx];
  return artworkWikiPagePath;
}

async function getArtworkWikiPagePath(artistNameChunks) {
  const artworkWikiPagePath = await fetch(
    `${WIKI_BASE_URL}/wiki/${artistNameChunksToUrlPath(artistNameChunks)}`
  )
    .then((response) => {
      return response.text();
    })
    .then((html) => getArtworkWikiPagePathFromArtistPageHtml(html));
  return artworkWikiPagePath;
}

async function getImgSrc(artworkWikiPagePath) {
  const imgSrc = await fetch(`${WIKI_BASE_URL}${artworkWikiPagePath}`)
    .then((response) => {
      return response.text();
    })
    .then(async (html) => getImgSrcFromArtworkPageHtml(html));
  return imgSrc;
}

module.exports = {
  getArtworkWikiPagePath,
  getImgSrc,
};
