import UserRepository from "../../infra/repository/UserRepository.js";
import * as httpStatus from "../constants/httpStatus.js";
import UserException from "../exceptions/UserException.js";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import * as secrets from "../constants/secrets.js";
import { formatJson } from "../utils.js";

class UserService {
  async findByEmail(req) {
    try {
      const { email } = req.params;
      const { authUser } = req;
      this.validateRequestEmail(email);
      let user = await UserRepository.findByEmail(email);
      this.validateUserNotFound(user);
      this.validateAuthenticatedUser(user, authUser);
      return {
        status: httpStatus.SUCCESS,
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
  validateAuthenticatedUser(user, authUser) {
    if (!authUser || user.id !== authUser.id) {
      throw new UserException(
        httpStatus.FORBIDDEN,
        "You cannot see this user data."
      );
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
  validAccessTokenData(email, password) {
    if (!email || !password) {
      throw new UserException(
        httpStatus.UNAUTHORIZED,
        "Email and password must be informed"
      );
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
  validateUser(user) {
    if (!user) {
      throw new UserException(httpStatus.UNAUTHORIZED, "User not found!");
    }
  }

  async getAccessToken(req) {
    try {
      const { email, password } = req.body;
      const { transactionid, serviceid } = req.headers;
      console.info(`Request to POST login with data:
        ${formatJson(req.body)} | [Transactionid: ${transactionid} | ServiceId: ${serviceid}]`);
      this.validAccessTokenData(email, password);
      let user = await UserRepository.findByEmail(email);

      await this.validatePassword(password, user.password);
      const authUser = { id: user.id, email: user.email, name: user.name };
      let accessToken = jwt.sign({ authUser }, secrets.apiSecret, {
        expiresIn: "1d",
      });
      const userResponse = {
        status: httpStatus.SUCCESS,
        data: {
          ...authUser,
          accessToken: accessToken,
        },
      };
      console.info(`Response to POST login with data:
        ${formatJson(userResponse)} | [Transactionid: ${transactionid} | ServiceId: ${serviceid}]`);
      return userResponse;
    } catch (error) {
      return {
        status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }
}

export default new UserService();
