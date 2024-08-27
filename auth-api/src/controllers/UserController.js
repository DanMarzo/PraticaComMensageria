import UserService from "../application/services/UserService.js";

class UserController {
  async findByEmail(req, res) {
    let user = await UserService.findByEmail(req);

    return res.status(user.status).json(user);
  }

  async getAccessToken(){}
}

export default new UserController();
