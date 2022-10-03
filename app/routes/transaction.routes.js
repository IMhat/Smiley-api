
module.exports = app => {
    const transaction = require("../controllers/transaction.controller.js");
    // create router
    var router = require("express").Router();

    // Create a new transaction
    
    router.post('/transfer', transaction.transfer);
    

    // Retrieve all transaction
    
    router.get('/', transaction.findAll);

    //find transaction user
    ///api/transaction/search?searchQuery= ${username}

    router.get("/search", transaction.getTransactionBySearch);



    // host at '/api/transaction'
    app.use('/api/transaction', router);
};





