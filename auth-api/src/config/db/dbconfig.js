import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  database: "auth",
  port: 5432,
  host: "localhost",
  dialect: "postgres",
  password: "postgres",
  username: "postgres",
  quoteIdentifiers: false,
  define: {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
  },
});

sequelize
  .authenticate({ logging: true })
  .then(() => {
    console.info("Connection finish");
  })
  .catch((err) => {
    console.error("Error connection");
    console.error(err);
    console.error("--------");
  });

export default sequelize;
