const { getRandomArrayElement } = require('./utils');

const DEFAULT_ARTISTS = [
  'vincent van gogh',
  'henri rousseau',
  'piet mondrian',
  'edward hopper',
  'gustav klimt',
  // Germany
  'caspar-david-friedrich',
  // France
  'seraphine-louis',
  'claude monet',
  // NO 'robert-doisneau',
  // Holland
  'hieronymus-bosch',
  // America
  'corita-kent',
  'andy-warhol',
  'robert-swain',
  // Azerbaidjan
  'sattar-bahlulzadeh',
  // Belgium
  'katrien-de-blauwer',
  // Australia
  'sally-gabori',
  'clifford-possum-tjapaltjarri',
  // Norway
  'frits-thaulow',
  'theodor-severin-kittelsen',
  // England
  'banksy',
  // Switzerland
  'arnold bocklin',
  // American (indigenous)
  'norval morrisseau',
  // China
  'victo ngai',
  // Japan
  'takashi murakami',
  'tadanori yokoo',
];

function getRandomArtist() {
  return getRandomArrayElement(DEFAULT_ARTISTS);
}

module.exports = {
  getRandomArtist,
};
