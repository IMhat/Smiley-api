
module.exports = app => {
    const transaction = require("../controllers/transaction.controller.js");
    // create router
    var router = require("express").Router();

    // Create a new transaction
    
    router.post('/transfer', transaction.transfer);

    router.post('/addTask', transaction.addTask);


    //buy product

    router.post('/buyProduct', transaction.buyProduct);
    

    // Retrieve all transaction
    
    router.get('/', transaction.findAll);

    //find transaction user
    ///api/transaction/search?searchQuery= ${username}

    router.get("/search", transaction.getTransactionBySearch);


    // host at '/api/transaction'
    app.use('/api/transaction', router);
};





