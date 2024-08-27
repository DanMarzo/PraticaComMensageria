import UserRepository from "../../infra/repository/UserRepository.js";
import * as httpStatus from "../../infra/constants/httpStatus.js";
import UserException from "../exceptions/UserException.js";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import * as secrets from "../../infra/constants/secrets.js";

class UserService {
  async findByEmail(req) {
    try {
      const { email } = req.params;
      this.validateRequestEmail(email);
      let user = await UserRepository.findByEmail(email);
      this.validateUserNotFound(user);
      return {
        status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      };
    } catch (error) {
      return {
        status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  validateRequestEmail(email) {
    if (!email) {
      throw new UserException(
        httpStatus.BAD_REQUEST,
        "User email was not found"
      );
    }
  }

  validateUserNotFound(user) {
    if (!user) {
      throw new UserException(httpStatus.NOT_FOUND, "User not found");
    }
  }

  async getAccessToken(req) {
    try {
      const { email, password } = req.body;
      validateAccessTokenData(email, password);
      let user = await UserRepository.findByEmail(email);
      await this.validatePassword(password, user.password);
      let authUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        accessToken: accessToken,
      };
      let accessToken = jwt.sign({ ...authUser }, secrets.apiSecret, {
        expiresIn: "1d",
      });
    } catch (error) {
      return {
        status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async validatePassword(password, hashPassword) {
    let isMatch = await compare(password, hashPassword);
    if (!isMatch) {
      throw new UserException(
        httpStatus.UNAUTHORIZED,
        "Password doesn't match"
      );
    }
  }

  validateAccessTokenData(email, password) {
    if (!email || !password) {
      throw new UserException(
        httpStatus.UNAUTHORIZED,
        "Email and password must be informed"
      );
    }
  }
}

export default new UserService();
