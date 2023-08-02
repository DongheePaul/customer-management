const jwt = require("jsonwebtoken");
const conf = require("../../config/config.json");

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

const verify = (authToken) => {
  return new Promise((resolve, reject) => {
    const tokenValue = authToken ? authToken.replace("Bearer ", "") : null;
    try {
      const decodedToken = jwt.verify(tokenValue, conf.jwt.secret);
      resolve(decodedToken);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  generateToken,
  verify,
};
