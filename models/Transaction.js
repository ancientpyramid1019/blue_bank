const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Account = require("./Account");

const Transaction = sequelize.define(
  "Transaction",
  {
    transactionId: { type: DataTypes.STRING, primaryKey: true },
    amount: { type: DataTypes.DECIMAL(10, 2) },
    transactionType: { type: DataTypes.ENUM("deposit", "withdrawal") },
    transactionCity: { type: DataTypes.STRING },
    accountId: {
      type: DataTypes.INTEGER,
      references: {
        model: Account,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Transaction;
