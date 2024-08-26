import { hash } from "bcrypt";
import UserEntity from "../../domain/User.js";

async function createInitialData() {
  await UserEntity.sync({ force: true });
  let password = await hash("1q2w3e4r", 10);
  await UserEntity.create({
    name: "Dan Marzo",
    email: "marzogildan@gmail.com",
    password: password,
  });
}
export { createInitialData };
