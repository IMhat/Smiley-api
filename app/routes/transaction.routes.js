
module.exports = app => {
    const transaction = require("../controllers/transaction.controller.js");
    // create router
    var router = require("express").Router();

    // Create a new transaction
    
    router.post('/transfer', transaction.transfer);
    

    // Retrieve all transaction
    
    router.get('/', transaction.findAll);



    // host at '/api/transaction'
    app.use('/api/transaction', router);
};





