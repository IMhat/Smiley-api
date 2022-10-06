
// controllers/transactions.js
const Transactions = require('../models/transaction.model');
// const db = require("../models");
// const Transactions = db.transactions;

const mongoose = require('mongoose');
const { v4 } = require('uuid');
const { creditAccount, debitAccount } = require( '../utils/transactions');

const transfer = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction()
    try {
        const { toUsername, fromUsername, amount, summary} = req.body;
        const reference = v4();
        if (!toUsername && !fromUsername && !amount && !summary) {
            return res.status(400).json({
                status: false,
                message: 'Please provide the following details: toUsername, fromUsername, amount, summary'
            })
        }

      const transferResult = await Promise.all([
        debitAccount(
          {amount, username:fromUsername, purpose:"transfer", reference, summary,
          trnxSummary: `TRFR TO: ${toUsername}`, session}),
        creditAccount(
          {amount, username:toUsername, purpose:"transfer", reference, summary,
          trnxSummary:`TRFR FROM: ${fromUsername}`, session})

          //. TRNX REF:${reference}
      ]);

      const failedTxns = transferResult.filter((result) => result.status !== true);
      if (failedTxns.length) {
        const errors = failedTxns.map(a => a.message);
        await session.abortTransaction();
        return res.status(400).json({
            status: false,
            message: errors
        })
      }

      await session.commitTransaction();
      session.endSession();

      return res.status(201).json({
        status: true,
        message: 'Transfer successful'
    })
    } catch (err) {
        await session.abortTransaction();
        session.endSession();

        return res.status(500).json({
            status: false,
            message: `Unable to find perform transfer. Please try again. \n Error: ${err}`
        })
    }
}



const findAll = (req, res) => {
    const username = req.query.toUsername;
    // var condition = toUsername ? { toUsername: { $regex: new RegExp(toUsername), $options: "i" } } : {};

    Transactions.find(username)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "ERROR finding all transactions"
            });
        });
};


// const getTransactionBySearch = async (req, res) => {
//     // tried req.query and req.query.search
// const { searchQuery } = req.query;
// try {
// // make the search query not case sensitive
// const user = new RegExp(searchQuery, `i`);

// //find the user's name using the name field
// const userFound = await Transactions.find({trnxSummary: user})

// res.json({data: userFound})

// } catch (error) {
// res.status(404).json({message: error.message})
// }
// }
const getTransactionBySearch = async (req, res) => {
    // tried req.query and req.query.search
const { searchQuery } = req.query;

// make the search query not case sensitive
const user = new RegExp(searchQuery, `i`);

//find the user's name using the name field
await Transactions.find({trnxSummary: user})
.then(data => {
  res.send(data);
})
.catch(err => {
res.status(500).send({
    message:
        err.message || `ERROR finding transaction ${user}`
    });
});


}


const addTask = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction()
    try {
        const { toUsername, amount, summary} = req.body;
        const reference = v4();
        if (!toUsername && !amount && !summary) {
            return res.status(400).json({
                status: false,
                message: 'Please provide the following details: toUsername, fromUsername, amount, summary'
            })
        }

      const transferResult = await Promise.all([
        // debitAccount(
        //   {amount, username:fromUsername, purpose:"transfer", reference, summary,
        //   trnxSummary: `TRFR TO: ${toUsername}`, session}),
        creditAccount(
          {amount, username:toUsername, purpose:"transfer", reference, summary,
          trnxSummary:`TRFR FROM: ${toUsername}`, session})

          //. TRNX REF:${reference}
      ]);

      const failedTxns = transferResult.filter((result) => result.status !== true);
      if (failedTxns.length) {
        const errors = failedTxns.map(a => a.message);
        await session.abortTransaction();
        return res.status(400).json({
            status: false,
            message: errors
        })
      }

      await session.commitTransaction();
      session.endSession();

      return res.status(201).json({
        status: true,
        message: 'Transfer successful'
    })
    } catch (err) {
        await session.abortTransaction();
        session.endSession();

        return res.status(500).json({
            status: false,
            message: `Unable to find perform transfer. Please try again. \n Error: ${err}`
        })
    }
}


//products

const buyProduct = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction()
    try {
        const { fromUsername, amount, summary} = req.body;
        const reference = v4();
        if (!fromUsername && !amount && !summary) {
            return res.status(400).json({
                status: false,
                message: 'Please provide the following details: toUsername, fromUsername, amount, summary'
            })
        }

      const transferResult = await Promise.all([
        debitAccount(
          {amount, username:fromUsername, purpose:"transfer", reference, summary,
          trnxSummary: `TRFR TO: ${fromUsername}`, session}),
          //. TRNX REF:${reference}
      ]);

      const failedTxns = transferResult.filter((result) => result.status !== true);
      if (failedTxns.length) {
        const errors = failedTxns.map(a => a.message);
        await session.abortTransaction();
        return res.status(400).json({
            status: false,
            message: errors
        })
      }

      await session.commitTransaction();
      session.endSession();

      return res.status(201).json({
        status: true,
        message: 'Transfer successful'
    })
    } catch (err) {
        await session.abortTransaction();
        session.endSession();

        return res.status(500).json({
            status: false,
            message: `Unable to find perform transfer. Please try again. \n Error: ${err}`
        })
    }
}




module.exports = { transfer, findAll, getTransactionBySearch, addTask, buyProduct };

