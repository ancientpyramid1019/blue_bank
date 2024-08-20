const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Customer = sequelize.define(
  "Customer",
  {
    name: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    phoneNumber: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
  },
  {
    timestamps: true,
  }
);

module.exports = Customer;
