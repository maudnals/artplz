const validator = require('validator');

function validateString(str) {
  return validator.isAlpha(str) && !validator.isEmpty(str);
}

// [ 'van', 'gogh' ], "%" -> "Van%Gogh"
function capitalizeAndJoin(nameChunks, joiningChar = ' ') {
  return (
    nameChunks
      // (edward hopper bugfix) wikipedia capitalizes url path chunks
      .map((chunk) => `${chunk.charAt(0).toUpperCase()}${chunk.slice(1)}`)
      .join(joiningChar)
  );
}

module.exports = {
  capitalizeAndJoin,
  validateString,
};
