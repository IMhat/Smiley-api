module.exports = app => {
    const wallet = require("../controllers/wallet.controller.js");
    // create router
    var router = require("express").Router();

    // Create a new wallet
    router.post('/', wallet.createWallet);

    // Retrieve all wallet
    router.get('/', wallet.findAll);




    // host at '/api/wallet'
    app.use('/api/wallet', router);
};