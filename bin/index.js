const term = require("terminal-kit").terminal;
const validator = require("validator");

(async function () {
  await term.slowTyping("Artist?\n", { delay: 90 });
  const name = await term.inputField().promise;
  const nameChunks = name.split(" ").map((chunk) => chunk.trim());
  nameChunks.forEach((chunk) => {
    if (!validator.isAlpha(chunk) || validator.isEmpty(chunk)) {
      term("\nOh no, that's empty or contains special characters 😳\n");
      term("\nTry again!\n", { delay: 90 });
      process.exit();
    }
  });

  term.green(
    "\nLooking for %s's good stuff\n",
    nameChunks
      .map((chunk) => `${chunk.charAt(0).toUpperCase()}${chunk.slice(1)}`)
      .join(" ")
  );
  await term.slowTyping("¸.·´¯`·.¸\n", { delay: 90 });
  await term.slowTyping("Monet Impression Sunrise \n", { delay: 90 });
  await term.drawImage(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Monet_-_Impression%2C_Sunrise.jpg/400px-Monet_-_Impression%2C_Sunrise.jpg",
    { shrink: { width: term.width, height: term.height } }
  );
  process.exit();
})();
