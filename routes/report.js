const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const sequelize = require("sequelize");

const { Customer, Transaction, Account } = require("../models");

// Report 1: List customers with the number of transactions for a particular month
router.get("/monthly-transactions", async (req, res) => {
  const { month } = req.query;

  try {
    const customers = await Customer.findAll({
      include: [
        {
          model: Account,
          include: {
            model: Transaction,
            where: sequelize.where(
              sequelize.fn(
                "MONTH",
                sequelize.col("Accounts.Transactions.createdAt")
              ),
              month
            ),
          },
        },
      ],
      order: [
        [
          sequelize.fn(
            "COUNT",
            sequelize.col("Accounts.Transactions.transactionId")
          ),
          "DESC",
        ],
      ],
      group: ["Customer.id"],
    });

    res.json(customers);
  } catch (err) {
    res.status(500).send("Error generating report", err);
  }
});

// Report 2: Customers withdrawing money outside city of origin with total > 10000000
router.get("/large-outside-withdrawals", async (req, res) => {
  try {
    const result = await Account.findAll({
      include: [
        {
          model: Customer,
          required: true,
        },
        {
          model: Transaction,
          required: true,
          where: {
            transactionType: "withdrawal",
            amount: { [Op.gt]: 10000000 },
          },
        },
      ],
      where: sequelize.where(sequelize.literal("`Customer`.`city`"), {
        [Op.ne]: sequelize.literal("`Transactions`.`transactionCity`"),
      }),
    });

    res.json(result);
  } catch (err) {
    res.status(500).send("Error generating report", err);
  }
});

module.exports = router;
