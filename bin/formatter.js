const utils = require('./utils');

//  /wiki/The_Scream -> The Scream
function urlPathToArtworkTitle(artworkWikiPagePath) {
  // /wiki/The_Scream -> The_Scream
  const artworkTitleChunks = artworkWikiPagePath.split('/');
  // The_Scream -> The Scream
  return artworkTitleChunks[artworkTitleChunks.length - 1].split('_').join(' ');
}

// [ 'van', 'gogh' ] -> "Van Gogh"
function artistNameChunksToFullDisplayName(nameChunks) {
  return utils.capitalizeAndJoin(nameChunks);
}

// [ 'van', 'gogh' ] -> "Van_Gogh"
function artistNameChunksToUrlPath(nameChunks) {
  // (edward hopper bugfix) wikipedia capitalizes url path chunks
  return utils.capitalizeAndJoin(nameChunks, '_');
}

module.exports = {
  artistNameChunksToFullDisplayName,
  artistNameChunksToUrlPath,
  urlPathToArtworkTitle,
};
