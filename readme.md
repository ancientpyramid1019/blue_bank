# Bluesoft Bank Project

This project is a Node.js-based implementation for Bluesoft Bank, which supports savings and current accounts, deposits, withdrawals, and real-time reporting.

## Technologies

Node, Express, MySQL

## Setup and Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/bluesoft-bank.git
   cd bluesoft-bank

   ```

2. **Install dependencies**

   npm install

   # or

   yarn install

3. **Setup your database**

   -Make sure you have MySQL/PostgreSQL running.
   -Create a new database for the project. **_(name: bluesoft_db, Character set: utf8, Collation: utf8_general_ci)_**

4. **Configure environment variables**

   - Create a .env file in the root directory of your project.
   - Add the variables just like .env.sample (replace with your actual values):

5. **Running the Project**

   - In developement Mode

     npm run dev

     # or

     yarn dev

   - In Production Mode

     npm start

     # or

     yarn start

## API Endpoints

Account

    Deposit: POST api/accounts/:accountId/deposit

    Withdraw: POST api/accounts/:accountId/withdraw

Report

    List customers with the number of transactions for a particular month
        GET api/reports/monthly-transactions    ex:api/reports/monthly-transactions?month=7

    Customers withdrawing money outside city of origin with total > 10000000
        GET api/reports/large-outside-withdrawals
