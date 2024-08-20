const express = require("express");
const router = express.Router();
const Account = require("../models/Account");
const Transaction = require("../models/Transaction");

// Deposit
router.post("/:accountId/deposit", async (req, res) => {
  const { accountId } = req.params;
  const { amount, transactionCity } = req.body;

  try {
    const account = await Account.findByPk(accountId);
    if (!account) return res.status(404).send("Account not found");

    account.balance = parseFloat(account.balance) + parseFloat(amount);
    await account.save();

    await Transaction.create({
      transactionId: new Date().getTime().toString(),
      amount,
      accountId: accountId,
      transactionType: "deposit",
      transactionCity,
    });

    res.json({ balance: account.balance });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Withdraw
router.post("/:accountId/withdraw", async (req, res) => {
  const { accountId } = req.params;
  const { amount } = req.body;

  try {
    const account = await Account.findByPk(accountId);
    if (!account) return res.status(404).send("Account not found");

    if (parseFloat(account.balance) < parseFloat(amount))
      return res.status(400).send("Insufficient funds");

    account.balance = parseFloat(account.balance) - parseFloat(amount);
    await account.save();

    await Transaction.create({
      transactionId: new Date().getTime().toString(),
      amount,
      accountId: accountId,
      transactionType: "withdrawal",
      transactionCity,
    });

    res.json({ balance: account.balance });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
