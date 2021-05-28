const validator = require('validator');

function validateString(str) {
  return validator.isAlpha(str) && !validator.isEmpty(str);
}

// [ 'van', 'gogh' ], '%' -> 'Van%Gogh'
function capitalizeAndJoin(nameChunks, joiningChar = ' ') {
  return (
    nameChunks
      // (edward hopper bugfix) wikipedia capitalizes url path chunks
      .map((chunk) => `${chunk.charAt(0).toUpperCase()}${chunk.slice(1)}`)
      .join(joiningChar)
  );
}

//  '/wiki/The_Scream' -> 'The Scream'
function urlPathToArtworkTitle(artworkWikiPagePath) {
  // /wiki/The_Scream -> The_Scream
  const artworkTitleChunks = artworkWikiPagePath.split('/');
  // The_Scream -> The Scream
  return artworkTitleChunks[artworkTitleChunks.length - 1].split('_').join(' ');
}

// [ 'van', 'gogh' ] -> 'Van Gogh'
function artistNameChunksToDisplayName(nameChunks) {
  return capitalizeAndJoin(nameChunks);
}

// [ 'van', 'gogh' ] -> 'Van_Gogh'
function artistNameChunksToUrlPath(nameChunks) {
  // (edward hopper bugfix) wikipedia capitalizes url path chunks
  // so we need to do it, too
  return capitalizeAndJoin(nameChunks, '_');
}

function getRandomArtist(randomArtists) {
  const randomInt = getRandomInt(randomArtists.length);
  return randomArtists[randomInt];
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

module.exports = {
  capitalizeAndJoin,
  validateString,
  artistNameChunksToDisplayName,
  artistNameChunksToUrlPath,
  urlPathToArtworkTitle,
  getRandomArtist,
};
