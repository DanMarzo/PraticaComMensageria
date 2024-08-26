import UserRepository from "../Infra/repository/UserRepository.js";
import * as httpStatus from "../Infra/constants/httpStatus.js";

class UserService {
  async findByEmail(req) {
    try {
      const { email } = req.params;
      this.validarDadosRequisicao(email);
      let user = await UserRepository.findByEmail(email);
      if (!user) {
      }
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

  validarDadosRequisicao(email) {
    if (!email) {
      throw new Error();
    }
  }
}

export default new UserService();
