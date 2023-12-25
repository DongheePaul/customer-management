import jwt from "jsonwebtoken";
import conf from "../../config/config.json";
import { validation } from "../format";
import { Request, Response, NextFunction } from "express";
import { UserRequest } from "./userRequest"; //
import { UserPayload } from "./userPayload";

function generateToken(id: number, username: string): string {
  const token = jwt.sign(
    {
      type: "JWT",
      iss: "Donghee",
      sub: "authentication",
      name: username,
      id: id,
    },
    conf.jwt.secret,
    {
      expiresIn: "1h",
    }
  );
  return token;
}

const tokenVerify = (authToken: string): Promise<UserPayload> => {
  return new Promise((resolve, reject) => {
    console.log("in tokenVerify");
    const tokenValue = authToken ? authToken.replace("Bearer ", "") : null;
    try {
      const decodedToken = jwt.verify(tokenValue, conf.jwt.secret);
      validation.tokenFormatCheck(decodedToken);
      resolve(decodedToken as UserPayload);
    } catch (error) {
      console.log("in verify => " + error.name.name);
      reject(error);
    }
  });
};

const verifyMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
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

export { generateToken, verifyMiddleware };
