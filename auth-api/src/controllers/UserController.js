import UserService from "../application/services/UserService.js";

class UserController {
  async findByEmail(req, res) {
    let user = await UserService.findByEmail(req);

    return req.status(user.status).json(user);
  }
}

export default new UserController();