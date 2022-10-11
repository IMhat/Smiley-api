
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
    

    //----find all exchange transaction
    router.get("/exchange", transaction.findAllExchange);


    //----find user exchange transaction
    router.get("/exchange/search", transaction.findUserExchange);

    //----find all task transaction
    router.get("/task", transaction.findAllTask);

    //----find user task transaction
    router.get("/task/search", transaction.findUserTask);


    // host at '/api/transaction'
    app.use('/api/transaction', router);
};

//findAllExchange

    // // Retrieve all tasks Approved
    // router.get("/approved", tasks.findAllApproved);

    // // Retrieve user tasks Approved
    // router.get("/approved/search", tasks.findUserApproved);



