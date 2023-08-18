const jwt = require("jsonwebtoken");
const conf = require("../../config/config.json");
const { validation } = require("../format");

function generateToken(id, username) {
  const token = jwt.sign(
    {
      type: "JWT",
      iss: "Donghee",
      sub: "authentication",
      name: username,
    },
    conf.jwt.secret,
    {
      expiresIn: "1h",
    }
  );
  return token;
}

const tokenVerify = (authToken) => {
  return new Promise((resolve, reject) => {
    console.log("in tokenVerify");
    const tokenValue = authToken ? authToken.replace("Bearer ", "") : null;
    try {
      const decodedToken = jwt.verify(tokenValue, conf.jwt.secret);
      validation.tokenFormatCheck(decodedToken);
      resolve(decodedToken);
    } catch (error) {
      console.log("in verify => " + error.name.name);
      if (error.name === "TokenExpiredError") {
        return res.status(419).json({
          code: 419,
          message: "토큰이 만료되었습니다.",
        });
      }
      // 토큰의 비밀키가 일치하지 않는 경우
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          code: 401,
          message: "유효하지 않은 토큰입니다.",
        });
      }
      reject(error);
    }
  });
};

const verifyMiddleware = async (req, res, next) => {
  const authToken = req.header("Authorization");
  if (!authToken) {
    return res.status(401).json({
      code: 401,
      message: "There is no jwt in request header.",
    });
  }

  try {
    console.log("before verify");
    const decodedToken = await tokenVerify(authToken);
    console.log("after verify");

    req.user = decodedToken;
    next();
  } catch (error) {
    console.log("error => " + error.message);
    res.status(419).json({ error: error.message });
  }
};

module.exports = {
  generateToken,
  verifyMiddleware,
};
