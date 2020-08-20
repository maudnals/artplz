const term = require("terminal-kit").terminal;
term.green.bold("Artist?\n");

term.drawImage(
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Monet_-_Impression%2C_Sunrise.jpg/400px-Monet_-_Impression%2C_Sunrise.jpg",
  { shrink: { width: term.width, height: term.height } }
);
// term.inputField(function (error, input) {
//   term.green("\nYour name is '%s'\n", input);
// });
// term.red("Artist?\n");
