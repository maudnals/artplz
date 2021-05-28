const { terminal: term } = require('terminal-kit');
const { exitKey } = require('./config');

async function getArtistName() {
  term.green('\n🎨 Artist?\n');
  term.blue('To pick a random artist: press ENTER\n');
  return await term.inputField().promise;
}

module.exports = {
  getArtistName,
};
