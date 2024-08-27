import { INTEGER, STRING } from "sequelize";
import sequelize from "../infra/db/dbconfig.js";

const UserEntity = sequelize.define(
  "user",
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    email: { type: STRING, allowNull: false },
    password: { type: STRING, allowNull: false },
  },
  {}
);

export default UserEntity;
