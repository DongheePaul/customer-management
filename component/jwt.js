const jwt = require("jsonwebtoken");
const conf = require("../config/config.json");

function generateToken(id, username) {
  const token = jwt.sign(
    {
      type: "JWT",
      iss: "Donghee",
      sub: "authentication",
      id: id,
      username: username,
    },
    conf.jwt.secret,
    {
      expiresIn: "15h",
    }
  );
  return token;
}

module.exports = {
  generateToken,
};
