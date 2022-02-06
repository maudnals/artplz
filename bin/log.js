const { terminal: term } = require('terminal-kit');

function logBorder() {
  term.yellow('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n');
}

async function logArtwork(imgSrc) {
  logBorder();
  await term.drawImage(`https:${imgSrc}`, {
    shrink: { width: term.width * 2.2, height: term.height * 1.4 },
  });
  logBorder();
}

function logCaption(artworkTitle, artistName) {
  term.yellow('\n%s', artworkTitle);
  term.yellow(' — %s \n', artistName);
  term.yellow('Source: Wikipedia \n');
}

async function logArtworkAndCaption(imgSrc, artworkTitle, artistName) {
  // `await` is needed to maintain the print oder between artwork and caption
  await logArtwork(imgSrc);
  logCaption(artworkTitle, artistName);
}

async function logWait() {
  term.green('\n\nLooking');
  await term.slowTyping('...\n\n', { delay: 40 });
}

async function logBye() {
  await term.slowTyping('\n\nOK Bye! ✨\n', { delay: 40 });
}

function logError(error) {
  term.red(`💥 Error: ${error}.\n\n`);
  term.green('Uhh. Pretend nothing happened and try again plz 💜\n');
}

module.exports = {
  logArtworkAndCaption,
  logWait,
  logBye,
  logError,
};
