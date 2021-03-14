const term = require('terminal-kit').terminal;

async function logArtwork(imgSrc) {
  term.yellow('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n');
  await term.drawImage(`https:${imgSrc}`, {
    shrink: { width: term.width * 2.2, height: term.height * 1.4 },
  });
  term.yellow('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n');
}

function logCaption(artworkTitle, artistName) {
  term.yellow('\n%s', artworkTitle);
  term.yellow(' — %s \n', artistName);
  term.yellow('Source: Wikipedia \n');
}

async function logArtworkAndCaption(imgSrc, artworkTitle, artistName) {
  // must await here otherwise ptint oder is messed up
  await logArtwork(imgSrc);
  logCaption(artworkTitle, artistName);
}

async function logWait() {
  term.green('\n\nLooking');
  await term.slowTyping('...\n\n', { delay: 100 });
}

async function logBye() {
  await term.slowTyping('\n\nOK Bye! ✨\n', { delay: 90 });
}

function logError(error) {
  term.red(`💥 Error: ${error}.\n\n`);
  term.green('Uuuhh pretend nothing happened and try again plz 💜\n');
}

async function getArtistName() {
  term.green('\n🎨 Artist? (press ENTER for random artist)\n');
  // user input
  return await term.inputField().promise;
}

module.exports = {
  logArtworkAndCaption,
  logWait,
  logBye,
  logError,
  getArtistName,
};
