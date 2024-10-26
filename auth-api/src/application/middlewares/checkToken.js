import jwt from "jsonwebtoken";
import * as secrets from "./../constants/secrets.js";
import * as httpStatus from "./../constants/httpStatus.js";
import AuthTokenException from "../exceptions/AuthTokenException.js";

const bearer = "Bearer ";

export default async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new AuthTokenException(
        httpStatus.UNAUTHORIZED,
        "Access token was not informed!"
      );
    }
    let accessToken = authorization;

    if (accessToken.includes(bearer)) {
      accessToken = accessToken.replace(bearer, "");
    }
    var payload = await validateAuthUser(accessToken, secrets.apiSecret);

    req.authUser = payload.authUser;
    return next();
  } catch (error) {
    let status = error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR;
    return res.status(status).json( {
      status,
      message: error.message,
    });
  }
};

function validateAuthUser(accessToken, secretApi) {
  return new Promise((resolve, reject) => {
    jwt.verify(accessToken, secretApi, undefined, (err, payload) => {
      if (err) {
        throw new AuthTokenException(
          httpStatus.UNAUTHORIZED,
          "Access token was not informed!"
        );
      } else {
        return resolve(payload);
      }
    });
  });
}
