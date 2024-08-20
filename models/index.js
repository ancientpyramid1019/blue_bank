const Customer = require("./Customer");
const Account = require("./Account");
const Transaction = require("./Transaction");

Customer.hasMany(Account, { foreignKey: "customerId" });
Account.belongsTo(Customer, { foreignKey: "customerId" });

Account.hasMany(Transaction, { foreignKey: "accountId" });
Transaction.belongsTo(Account, { foreignKey: "accountId" });

module.exports = { Customer, Account, Transaction };
