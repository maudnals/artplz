const { getRandomArrayElement } = require('./utils');

const DEFAULT_ARTISTS = [
  'van gogh',
  'matisse',
  'monet',
  'klimt',
  'magritte',
  'jacob lawrence',
  'mondrian',
  'kahlo',
  'edward hopper',
];

function getRandomArtist() {
  return getRandomArrayElement(DEFAULT_ARTISTS);
}

module.exports = {
  getRandomArtist,
};
