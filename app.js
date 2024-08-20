const express = require("express");
const sequelize = require("./config/database");
const accountRoutes = require("./routes/account");
const reportRoutes = require("./routes/report");

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/accounts", accountRoutes);
app.use("/api/reports", reportRoutes);

sequelize.sync({ force: false }).then(() => console.log("Tables synced"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
