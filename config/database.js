const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "bluesoft_db",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

module.exports = sequelize;
