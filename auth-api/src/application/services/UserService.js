import UserRepository from "../../infra/repository/UserRepository.js";
import * as httpStatus from "../../infra/constants/httpStatus.js";
import UserException from "../exceptions/UserException.js";

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
}

export default new UserService();
