const jwt = require("jsonwebtoken");
const conf = require("../../config/config.json");

function generateToken(id, username) {
  const token = jwt.sign(
    {
      type: "JWT",
      iss: "Donghee",
      sub: "authentication",
      id: id,
      name: username,
    },
    conf.jwt.secret,
    {
      expiresIn: "1h",
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

const verifyForMiddleware = (authToken) => {
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

const verifyMiddleware = async (req, res, next) => {
  const authToken = req.header("Authorization");
  console.log("in verifymiddleware. authToken is: ", authToken);

  if (!authToken) {
    return res.status(401).json({
      code: 401,
      message: "There is no jwt in request header.",
    });
  }

  try {
    const decodedToken = await verifyForMiddleware(authToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    if (error.code === 419) {
      return res.status(419).json({ error: error.message });
    } else {
      return res.status(401).json({ error: error.message });
    }
  }
};

module.exports = {
  generateToken,
  verify,
  verifyMiddleware,
};
