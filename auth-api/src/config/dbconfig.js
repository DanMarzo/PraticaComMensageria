import { Sequelize } from "sequelize";

const sequelize = new Sequelize("auth", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
  quoteIdentifiers: false,
  define: {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.info("Connection finish");
  })
  .catch((err) => {
    console.error("Error connection");
    console.error(err);
  });

export default sequelize;