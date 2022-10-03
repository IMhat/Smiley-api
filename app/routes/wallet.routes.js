module.exports = app => {
    const wallet = require("../controllers/wallet.controller.js");
    // create router
    var router = require("express").Router();

    // Create a new wallet
    router.post('/', wallet.createWallet);

    // Retrieve all wallet
    router.get('/', wallet.findAll);

    // Retrieve wallet of user
    // router.get("/:username", wallet.findUserWallet);


    // Retrieve wallet of user

    ///api/wallet/search?searchQuery=${ username }
    router.get("/search", wallet.getUserBySearch);




    // host at '/api/wallet'
    app.use('/api/wallet', router);
};