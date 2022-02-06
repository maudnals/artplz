const { terminal: term } = require('terminal-kit');

function logBorderTop() {
  term.white('\n✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧\n');
}

function logBorderBottom() {
  term.white('✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧\n');
}

async function logArtwork(imgSrc) {
  logBorderTop();
  await term.drawImage(imgSrc.toString(), {
    shrink: { width: term.width * 2, height: term.height * 1.2 },
  });
  logBorderBottom();
}

function logCaption(artworkTitle, artistName) {
  term.table([[`      ${artworkTitle}     `]], {
    hasBorder: true,
    contentHasMarkup: false,
    width: artworkTitle.length + 15,
    fit: true, // Activate all expand/shrink + wordWrap
  });
  if (artistName) {
    term.white(' — %s \n', artistName);
  }
  term.blue('Source: WikiArt.org \n');
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
