const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./Customer");

const Account = sequelize.define(
  "Account",
  {
    accountNumber: { type: DataTypes.STRING, unique: true },
    balance: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    accountType: { type: DataTypes.ENUM("savings", "current") },
    customerId: {
      type: DataTypes.INTEGER,
      references: {
        model: Customer,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Account;
