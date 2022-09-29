require('dotenv').config(); // load env

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.DB_URL;

db.tasks = require("./task.model.js")(mongoose);
db.products = require("./product.model.js")(mongoose);
db.users = require("./user.model.js")(mongoose);
//wallet
db.wallet = require("./wallet.model.js")(mongoose);
db.transactions = require("./transaction.model.js")(mongoose);

module.exports = db; // send to be used by controller