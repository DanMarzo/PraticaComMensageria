import UserEntity from "../../domain/UserEntity.js";

class UserRepository {
  async findByEmail(email) {
    try {
      return await UserEntity.findOne({ where: { email } });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findById(id) {
    try {
      return await UserEntity.findOne({ where: { id } });
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default new UserRepository();
